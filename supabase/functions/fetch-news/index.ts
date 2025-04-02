
import { serve } from "https://deno.land/std@0.168.0/http/server.ts";
import { createClient } from "https://esm.sh/@supabase/supabase-js@2.21.0";

// CORS headers for browser requests
const corsHeaders = {
  "Access-Control-Allow-Origin": "*",
  "Access-Control-Allow-Headers": "authorization, x-client-info, apikey, content-type",
};

// SerpAPI Google News endpoint
const SERPAPI_BASE_URL = "https://serpapi.com/search.json";

// Create a Supabase client for the function
const supabaseUrl = Deno.env.get("SUPABASE_URL") || "";
const supabaseKey = Deno.env.get("SUPABASE_SERVICE_ROLE_KEY") || "";
const supabase = createClient(supabaseUrl, supabaseKey);

interface NewsParams {
  query: string;
  location?: string;
}

async function fetchNews(params: NewsParams) {
  const { query, location } = params;
  
  // Build the search query with location if available
  let searchQuery = query;
  if (location) {
    searchQuery += ` ${location}`;
  }
  
  const apiKey = Deno.env.get("SERPAPI_API_KEY");
  if (!apiKey) {
    throw new Error("SERPAPI_API_KEY is not defined");
  }
  
  const url = new URL(SERPAPI_BASE_URL);
  url.searchParams.append("api_key", apiKey);
  url.searchParams.append("engine", "google_news");
  url.searchParams.append("q", searchQuery);
  url.searchParams.append("num", "10"); // Increased to 10 news articles
  
  try {
    console.log(`Fetching news for query: "${searchQuery}"`);
    const response = await fetch(url.toString());
    
    if (!response.ok) {
      const errorText = await response.text();
      console.error(`API error (${response.status}):`, errorText);
      throw new Error(`API request failed with status ${response.status}: ${errorText}`);
    }
    
    const data = await response.json();
    
    // Check if we have news_results, otherwise try to extract news from organic_results
    let newsResults = data.news_results || [];
    
    if (newsResults.length === 0 && data.organic_results) {
      // Try to extract news-like items from organic results
      newsResults = data.organic_results
        .filter((item: any) => item.title && item.link && (item.snippet || item.description))
        .map((item: any) => ({
          title: item.title || "Untitled",
          link: item.link || "#",
          snippet: item.snippet || item.description || "",
          source: item.source || "News Source",
          date: item.date || "Recent"
        }))
        .slice(0, 10);
    }
    
    // Ensure each news item has valid properties
    const validatedResults = newsResults.map((item: any) => ({
      title: typeof item.title === 'string' ? item.title : "Untitled",
      link: typeof item.link === 'string' ? item.link : "#",
      snippet: typeof item.snippet === 'string' ? item.snippet : "",
      source: typeof item.source === 'string' ? item.source : "News Source",
      date: typeof item.date === 'string' ? item.date : "Recent"
    }));
    
    console.log(`Extracted ${validatedResults.length} news results for "${searchQuery}"`);
    return validatedResults;
  } catch (error) {
    console.error("Error fetching news:", error);
    throw error;
  }
}

serve(async (req) => {
  // Handle CORS preflight requests
  if (req.method === "OPTIONS") {
    return new Response(null, {
      status: 204,
      headers: corsHeaders,
    });
  }
  
  try {
    // Check if request is authenticated
    const authHeader = req.headers.get("Authorization");
    if (!authHeader) {
      return new Response(
        JSON.stringify({ error: "No authorization header" }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get user ID from JWT
    const token = authHeader.replace("Bearer ", "");
    const { data: { user }, error } = await supabase.auth.getUser(token);
    
    if (error || !user) {
      return new Response(
        JSON.stringify({ error: "Authentication failed", details: error?.message }),
        { status: 401, headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    }
    
    // Get profile info for location context
    const { data: profile } = await supabase
      .from("profiles")
      .select("district, state, village")
      .eq("id", user.id)
      .single();
    
    // Get request parameters
    const requestData = await req.json();
    const { category } = requestData;
    
    // Build location string from profile
    let location = "";
    if (profile) {
      const locationParts = [];
      if (profile.village) locationParts.push(profile.village);
      if (profile.district) locationParts.push(profile.district);
      if (profile.state) locationParts.push(profile.state);
      location = locationParts.join(", ");
    }
    
    console.log(`User location: ${location || "Unknown"}`);
    console.log(`Requested category: ${category || "news"}`);
    
    try {
      // Fetch news based on category and location
      const newsResults = await fetchNews({
        query: category || "news",
        location: location || undefined
      });
      
      return new Response(
        JSON.stringify({ 
          news: newsResults,
          location: location || "Unknown"
        }),
        { headers: { ...corsHeaders, "Content-Type": "application/json" } }
      );
    } catch (fetchError) {
      console.error(`Error fetching ${category} news:`, fetchError);
      
      // Return a more specific error for debugging
      return new Response(
        JSON.stringify({ 
          error: `Failed to fetch ${category} news`, 
          details: fetchError.message,
          fallback: true 
        }),
        { 
          status: 500, 
          headers: { ...corsHeaders, "Content-Type": "application/json" } 
        }
      );
    }
  } catch (error) {
    console.error("Error in fetch-news function:", error);
    return new Response(
      JSON.stringify({ error: error.message }),
      { status: 500, headers: { ...corsHeaders, "Content-Type": "application/json" } }
    );
  }
});
