
import { serve } from 'https://deno.land/std@0.168.0/http/server.ts'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
}

const API_KEY = Deno.env.get('FIRECRAWL_API_KEY')

interface SchemeData {
  title: string;
  description: string;
  category: string;
  deadline?: string;
  link: string;
}

interface SchemeQueryParams {
  category?: string;
  searchQuery?: string;
  sortBy?: string;
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === 'OPTIONS') {
    return new Response(null, { headers: corsHeaders })
  }

  try {
    // Initialize query parameters
    let params: SchemeQueryParams = {
      category: 'all',
      searchQuery: '',
      sortBy: 'relevance'
    };
    
    // Check if we have URL search params
    const url = new URL(req.url);
    const urlCategory = url.searchParams.get('category');
    const urlSearchQuery = url.searchParams.get('searchQuery');
    const urlSortBy = url.searchParams.get('sortBy');
    
    if (urlCategory) params.category = urlCategory;
    if (urlSearchQuery) params.searchQuery = urlSearchQuery;
    if (urlSortBy) params.sortBy = urlSortBy;
    
    // Also check for body params (used by function.invoke)
    if (req.method === 'POST') {
      try {
        const body = await req.json();
        if (body) {
          if (body.category) params.category = body.category;
          if (body.searchQuery !== undefined) params.searchQuery = body.searchQuery;
          if (body.sortBy) params.sortBy = body.sortBy;
        }
      } catch (e) {
        // If JSON parsing fails, we already have the params from URL or default
        console.log('JSON parsing error:', e);
      }
    }
    
    console.log(`Fetching schemes with params:`, params);

    if (!API_KEY) {
      throw new Error('FIRECRAWL_API_KEY is not set in the environment variables')
    }

    // Initialize the schema data array
    let schemes: SchemeData[] = []

    // Determine the URL to scrape based on category
    let scrapeUrl = 'https://www.myscheme.gov.in/'
    if (params.category !== 'all') {
      // Map categories to specific URLs if needed
      const categoryMap: Record<string, string> = {
        'agriculture': 'https://www.myscheme.gov.in/schemes/domain/agriculture-and-allied',
        'healthcare': 'https://www.myscheme.gov.in/schemes/domain/health-and-wellness',
        'education': 'https://www.myscheme.gov.in/schemes/domain/skill-development-and-employment'
      }
      scrapeUrl = categoryMap[params.category.toLowerCase()] || scrapeUrl
    }

    // Add search query to URL if provided
    if (params.searchQuery) {
      scrapeUrl = `https://www.myscheme.gov.in/schemes/search?keyword=${encodeURIComponent(params.searchQuery)}`
    }

    // Make a request to Firecrawl API
    const response = await fetch('https://api.firecrawl.dev/scrape', {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${API_KEY}`
      },
      body: JSON.stringify({
        url: scrapeUrl,
        selector: '.scheme-card', // Adjust selector based on the actual HTML structure
        maxPages: 3,
        actions: [
          {
            type: 'extractData',
            config: {
              title: '.scheme-title',
              description: '.scheme-description',
              link: { selector: '.scheme-link', attribute: 'href' },
              deadline: '.scheme-deadline',
              category: '.scheme-category'
            }
          }
        ]
      })
    })

    const data = await response.json()
    
    if (!data.success) {
      throw new Error(`Firecrawl API error: ${data.error || 'Unknown error'}`)
    }

    // Process the scraped data
    if (data.data && Array.isArray(data.data)) {
      schemes = data.data.map((item: any) => {
        // Determine category based on the URL or extracted data
        let schemeCategory = item.category || params.category
        
        // Normalize category
        if (typeof schemeCategory === 'string') {
          if (schemeCategory.toLowerCase().includes('agriculture') || 
              schemeCategory.toLowerCase().includes('farming') ||
              schemeCategory.toLowerCase().includes('rural')) {
            schemeCategory = 'Agriculture'
          } else if (schemeCategory.toLowerCase().includes('health') || 
                    schemeCategory.toLowerCase().includes('medical') ||
                    schemeCategory.toLowerCase().includes('wellness')) {
            schemeCategory = 'Healthcare'
          } else if (schemeCategory.toLowerCase().includes('education') || 
                    schemeCategory.toLowerCase().includes('skill') ||
                    schemeCategory.toLowerCase().includes('student')) {
            schemeCategory = 'Education'
          } else {
            schemeCategory = 'Other'
          }
        } else {
          schemeCategory = params.category === 'all' ? 'Other' : params.category
        }

        // Handle links - ensure they are absolute URLs
        let link = item.link || '#'
        if (link && !link.startsWith('http')) {
          link = `https://www.myscheme.gov.in${link.startsWith('/') ? '' : '/'}${link}`
        }

        return {
          title: item.title || 'Untitled Scheme',
          description: item.description || 'No description available',
          category: schemeCategory,
          deadline: item.deadline || 'Ongoing',
          link: link
        }
      }).filter((scheme: SchemeData) => scheme.title !== 'Untitled Scheme')
    }

    // If no schemes were found or there was an issue with scraping,
    // generate fallback data based on the category
    if (schemes.length === 0) {
      console.log('No schemes found from scraping, using fallback data')
      schemes = generateFallbackSchemes(params.category)
      
      // If search query is provided, filter fallback data
      if (params.searchQuery) {
        const searchLower = params.searchQuery.toLowerCase();
        schemes = schemes.filter(scheme => 
          scheme.title.toLowerCase().includes(searchLower) ||
          scheme.description.toLowerCase().includes(searchLower)
        );
      }
    }

    // Sort schemes based on sortBy parameter
    if (params.sortBy === 'latest') {
      // In a real application, you'd sort by date
      // Here we'll just reverse the array as a simple simulation
      schemes = schemes.reverse();
    } else if (params.sortBy === 'deadline') {
      // Sort by deadline (if it's a date)
      schemes = schemes.sort((a, b) => {
        // For this example, we'll just alphabetically sort the deadline strings
        return (a.deadline || '').localeCompare(b.deadline || '');
      });
    }

    console.log(`Returning ${schemes.length} schemes for params:`, params);
    
    return new Response(
      JSON.stringify({ success: true, data: schemes }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  } catch (error) {
    console.error('Error fetching schemes:', error.message)
    
    // Return fallback data on error
    const fallbackSchemes = generateFallbackSchemes('all')
    
    return new Response(
      JSON.stringify({ 
        success: false, 
        error: error.message,
        data: fallbackSchemes
      }),
      { headers: { ...corsHeaders, 'Content-Type': 'application/json' } }
    )
  }
})

// Function to generate fallback schemes data when scraping fails
function generateFallbackSchemes(category: string): SchemeData[] {
  const allSchemes = {
    'agriculture': [
      {
        title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
        description: "Income support of ₹6,000 per year in three equal installments to small and marginal farmer families having combined landholding of up to 2 hectares.",
        category: "Agriculture",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/pm-kisan"
      },
      {
        title: "Pradhan Mantri Fasal Bima Yojana",
        description: "Crop insurance scheme that provides comprehensive risk coverage from pre-sowing to post-harvest losses due to natural calamities.",
        category: "Agriculture",
        deadline: "Season-based",
        link: "https://www.myscheme.gov.in/schemes/pmfby"
      },
      {
        title: "Per Drop More Crop",
        description: "Promotes water efficiency through precision irrigation and sustainable water management practices.",
        category: "Agriculture",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/pdmc"
      },
      {
        title: "Soil Health Card Scheme",
        description: "Provides information on soil health to farmers to help them improve productivity through judicious use of inputs.",
        category: "Agriculture",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/shc"
      }
    ],
    'healthcare': [
      {
        title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
        description: "Health insurance coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
        category: "Healthcare",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/ab-pmjay"
      },
      {
        title: "National Health Mission",
        description: "Provides accessible, affordable, and quality healthcare to rural and vulnerable populations.",
        category: "Healthcare",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/nhm"
      },
      {
        title: "Janani Suraksha Yojana",
        description: "Safe motherhood intervention promoting institutional delivery among poor pregnant women.",
        category: "Healthcare",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/jsy"
      },
      {
        title: "National AYUSH Mission",
        description: "Promotes AYUSH medical systems through cost-effective AYUSH services and medicines.",
        category: "Healthcare",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/nam"
      }
    ],
    'education': [
      {
        title: "Samagra Shiksha Abhiyan",
        description: "Integrated scheme for school education extending from pre-school to class 12 to ensure inclusive and equitable quality education.",
        category: "Education",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/samagra-shiksha"
      },
      {
        title: "PM POSHAN Scheme",
        description: "Provides mid-day meals to improve nutritional levels among children and encourage poor children to attend school more regularly.",
        category: "Education",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/pm-poshan"
      },
      {
        title: "Pradhan Mantri Vidya Lakshmi Karyakram",
        description: "Portal for students seeking education loans and scholarships for higher education in India and abroad.",
        category: "Education",
        deadline: "Ongoing",
        link: "https://www.myscheme.gov.in/schemes/vidya-lakshmi"
      },
      {
        title: "National Means-cum-Merit Scholarship Scheme",
        description: "Scholarships for meritorious students from economically weaker sections to reduce dropouts at class VIII.",
        category: "Education",
        deadline: "Annual",
        link: "https://www.myscheme.gov.in/schemes/nmmss"
      }
    ]
  }

  if (category === 'all') {
    return [
      ...allSchemes.agriculture.slice(0, 2),
      ...allSchemes.healthcare.slice(0, 2),
      ...allSchemes.education.slice(0, 2)
    ]
  }
  
  return allSchemes[category.toLowerCase()] || allSchemes.agriculture
}
