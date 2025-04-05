
import React, { useEffect, useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewsCard from '@/components/NewsCard';
import { useAuth } from '@/context/AuthContext';
import { supabase } from '@/lib/supabase';
import { useToast } from '@/components/ui/use-toast';
import { Loader2, AlertCircle, MapPin, RefreshCw } from 'lucide-react';
import { Button } from '@/components/ui/button';

// News item type definition
interface NewsItem {
  title: string;
  summary: string;
  date: string;
  source: string;
  category: string;
  link: string;
}

// SerpAPI News result type
interface SerpNewsItem {
  title: string;
  link: string;
  snippet: string;
  source: string;
  date: string;
}

const News = () => {
  const { user, profile } = useAuth();
  const { toast } = useToast();
  const [loading, setLoading] = useState<Record<string, boolean>>({
    'local': false,
    'agriculture': false,
    'healthcare': false,
    'education': false
  });
  const [refreshing, setRefreshing] = useState<boolean>(false);
  const [error, setError] = useState<string | null>(null);
  const [location, setLocation] = useState<string>('');
  
  // News state for each category
  const [localNews, setLocalNews] = useState<NewsItem[]>([]);
  const [healthNews, setHealthNews] = useState<NewsItem[]>([]);
  const [educationNews, setEducationNews] = useState<NewsItem[]>([]);
  const [agricultureNews, setAgricultureNews] = useState<NewsItem[]>([]);
  
  // Format news data from SerpAPI to our news card format
  const formatNewsData = (news: SerpNewsItem[], category: string): NewsItem[] => {
    if (!Array.isArray(news)) {
      console.error('News data is not an array:', news);
      return [];
    }
    
    return news.map(item => ({
      title: typeof item.title === 'string' ? item.title : 'Untitled News',
      summary: typeof item.snippet === 'string' ? item.snippet : 'No details available',
      date: typeof item.date === 'string' ? item.date : 'Recent',
      source: typeof item.source === 'string' ? item.source : 'News Source',
      category: category,
      link: typeof item.link === 'string' ? item.link : '#'
    }));
  };
  
  // Function to fetch news for a specific category
  const fetchCategoryNews = async (category: string) => {
    // Set category-specific loading state
    setLoading(prev => ({ ...prev, [getCategoryKey(category)]: true }));
    
    try {
      console.log(`Fetching news for category: ${category}`);
      const { data, error } = await supabase.functions.invoke('fetch-news', {
        body: { category, refresh: true }
      });
      
      if (error) throw new Error(error.message);
      
      // Update location from the API response
      if (data.location) {
        setLocation(data.location);
      }
      
      // Check if news property exists in data
      if (!data.news || !Array.isArray(data.news)) {
        console.error(`Invalid news data for ${category}:`, data);
        throw new Error(`Invalid response format for ${category} news`);
      }
      
      // Format and store news based on category
      const formattedNews = formatNewsData(data.news, category);
      console.log(`Received ${formattedNews.length} news items for ${category}`);
      
      // Update the appropriate state based on category
      switch (getCategoryKey(category)) {
        case 'local':
          setLocalNews(formattedNews);
          break;
        case 'agriculture':
          setAgricultureNews(formattedNews);
          break;
        case 'healthcare':
          setHealthNews(formattedNews);
          break;
        case 'education':
          setEducationNews(formattedNews);
          break;
      }
      
    } catch (err) {
      console.error(`Error fetching ${category} news:`, err);
      setError(`Failed to load ${category} news. Please try again later.`);
      toast({
        title: "Error",
        description: `Failed to load ${category} news. Please try again later.`,
        variant: "destructive"
      });
    } finally {
      // Clear category-specific loading state
      setLoading(prev => ({ ...prev, [getCategoryKey(category)]: false }));
    }
  };
  
  // Helper to normalize category names for state keys
  const getCategoryKey = (category: string): string => {
    if (category.toLowerCase().includes('healthcare') || category.toLowerCase().includes('health')) {
      return 'healthcare';
    } else if (category.toLowerCase().includes('education')) {
      return 'education';
    } else if (category.toLowerCase().includes('agriculture') || category.toLowerCase().includes('agri')) {
      return 'agriculture';
    } else {
      return 'local';
    }
  };
  
  // Fetch all categories of news on component load
  useEffect(() => {
    if (user) {
      // Fetch news for each category
      fetchCategoryNews('local news');
      fetchCategoryNews('agriculture');
      fetchCategoryNews('healthcare');
      fetchCategoryNews('education');
    }
  }, [user, profile]);
  
  // Function to refresh all news categories
  const handleRefreshAllNews = async () => {
    if (refreshing) return;
    
    setRefreshing(true);
    setError(null);
    
    try {
      toast({
        title: "Refreshing News",
        description: "Fetching the latest news from all categories...",
      });
      
      // Fetch news for each category with refresh flag
      await Promise.all([
        fetchCategoryNews('local news'),
        fetchCategoryNews('agriculture'),
        fetchCategoryNews('healthcare'),
        fetchCategoryNews('education')
      ]);
      
      toast({
        title: "News Updated",
        description: "Latest news has been loaded successfully!",
      });
    } catch (err) {
      console.error('Error refreshing news:', err);
      toast({
        title: "Error",
        description: "Failed to refresh news. Please try again later.",
        variant: "destructive"
      });
    } finally {
      setRefreshing(false);
    }
  };
  
  // Fallback for when the API doesn't return results or while loading
  const getFallbackNews = (category: string): NewsItem[] => {
    if (category === 'healthcare') {
      return [
        {
          title: "Health Camp to be Organized Next Week",
          summary: "Free health checkups and consultations will be available at the village center. Specialists from various fields will be present.",
          date: "Yesterday",
          source: "Health Department",
          category: "Healthcare",
          link: "/news/health-camp"
        },
        {
          title: "New Primary Health Center Inaugurated",
          summary: "A new health center with modern facilities has been inaugurated in the block. The center will provide 24x7 emergency services.",
          date: "3 days ago",
          source: "Health Department",
          category: "Healthcare",
          link: "/news/new-health-center"
        }
      ];
    } else if (category === 'education') {
      return [
        {
          title: "Scholarship Applications Now Open",
          summary: "Students can apply for merit-based scholarships until the end of the month. The scholarships will cover tuition fees and provide monthly stipends.",
          date: "3 days ago",
          source: "Education Department",
          category: "Education",
          link: "/news/scholarship-applications"
        },
        {
          title: "New School Building Completed",
          summary: "The construction of a new school building with modern facilities has been completed. Classes will begin from the next academic session.",
          date: "1 week ago",
          source: "Education Department",
          category: "Education",
          link: "/news/new-school-building"
        }
      ];
    } else if (category === 'agriculture') {
      return [
        {
          title: "Monsoon Forecast Released",
          summary: "The meteorological department has released the monsoon forecast for the upcoming season. Farmers are advised to plan accordingly.",
          date: "4 days ago",
          source: "Meteorological Department",
          category: "Agriculture",
          link: "/news/monsoon-forecast"
        },
        {
          title: "New Crop Insurance Scheme Launched",
          summary: "A new crop insurance scheme with better coverage and lower premiums has been launched. Farmers can register at the nearest agriculture office.",
          date: "1 week ago",
          source: "Agriculture Department",
          category: "Agriculture",
          link: "/news/crop-insurance"
        }
      ];
    } else {
      return [
        {
          title: "New Agricultural Market Opens in District",
          summary: "Farmers can now sell their produce directly at the newly launched market facility. The market will operate daily from 6 AM to 2 PM.",
          date: "2 hours ago",
          source: "District News",
          category: "Agriculture",
          link: "/news/new-agricultural-market"
        },
        {
          title: "Road Construction Project to Begin Next Month",
          summary: "The construction of a new highway connecting several villages will begin next month. The project is expected to be completed within a year.",
          date: "Yesterday",
          source: "PWD Department",
          category: "Infrastructure",
          link: "/news/road-construction"
        }
      ];
    }
  };
  
  // Display news based on API results or fallback to sample data
  const getNewsToDisplay = (category: string): NewsItem[] => {
    switch (category) {
      case 'healthcare':
        return healthNews.length > 0 ? healthNews : getFallbackNews('healthcare');
      case 'education':
        return educationNews.length > 0 ? educationNews : getFallbackNews('education');
      case 'agriculture':
        return agricultureNews.length > 0 ? agricultureNews : getFallbackNews('agriculture');
      default:
        return localNews.length > 0 ? localNews : getFallbackNews('local');
    }
  };
  
  return (
    <div className="app-container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-brown">Local News & Updates</h1>
        <p className="text-muted-foreground">
          Stay informed about the latest happenings, events, and announcements in your area.
        </p>
        <div className="mt-2 flex items-center justify-between">
          <div className="flex items-center text-sm text-muted-foreground">
            {location && (
              <>
                <MapPin className="mr-1 h-4 w-4" />
                <span>News for: {location}</span>
              </>
            )}
          </div>
          <Button 
            variant="outline" 
            size="sm" 
            className="text-gramsuchna-green hover:bg-gramsuchna-cream"
            onClick={handleRefreshAllNews}
            disabled={refreshing || Object.values(loading).some(isLoading => isLoading)}
          >
            {refreshing ? (
              <>
                <Loader2 className="h-4 w-4 animate-spin" />
                <span>Refreshing...</span>
              </>
            ) : (
              <>
                <RefreshCw className="h-4 w-4" />
                <span>Load Latest News</span>
              </>
            )}
          </Button>
        </div>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        
        {(Object.values(loading).some(isLoading => isLoading) || refreshing) && (
          <div className="flex h-40 w-full items-center justify-center">
            <Loader2 className="h-8 w-8 animate-spin text-gramsuchna-green" />
            <span className="ml-2">Loading news...</span>
          </div>
        )}
        
        {error && !Object.values(loading).some(isLoading => isLoading) && !refreshing && (
          <div className="flex h-40 w-full flex-col items-center justify-center rounded-lg border border-red-200 bg-red-50 p-4">
            <AlertCircle className="h-8 w-8 text-red-500" />
            <p className="mt-2 text-center text-red-600">{error}</p>
            <Button 
              variant="outline" 
              className="mt-4"
              onClick={handleRefreshAllNews}
            >
              Try Again
            </Button>
          </div>
        )}
        
        {!Object.values(loading).some(isLoading => isLoading) && !error && !refreshing && (
          <>
            <TabsContent value="all" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {[
                  ...getNewsToDisplay('local').slice(0, 2),
                  ...getNewsToDisplay('healthcare').slice(0, 1),
                  ...getNewsToDisplay('education').slice(0, 1),
                  ...getNewsToDisplay('agriculture').slice(0, 2)
                ].map((news, index) => (
                  <NewsCard 
                    key={`all-${index}`}
                    title={news.title}
                    summary={news.summary}
                    date={news.date}
                    source={news.source}
                    category={news.category}
                    link={news.link}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="agriculture" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getNewsToDisplay('agriculture').map((news, index) => (
                  <NewsCard 
                    key={`agriculture-${index}`}
                    title={news.title}
                    summary={news.summary}
                    date={news.date}
                    source={news.source}
                    category="Agriculture"
                    link={news.link}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="healthcare" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getNewsToDisplay('healthcare').map((news, index) => (
                  <NewsCard 
                    key={`healthcare-${index}`}
                    title={news.title}
                    summary={news.summary}
                    date={news.date}
                    source={news.source}
                    category="Healthcare"
                    link={news.link}
                  />
                ))}
              </div>
            </TabsContent>
            
            <TabsContent value="education" className="animate-fade-in">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
                {getNewsToDisplay('education').map((news, index) => (
                  <NewsCard 
                    key={`education-${index}`}
                    title={news.title}
                    summary={news.summary}
                    date={news.date}
                    source={news.source}
                    category="Education"
                    link={news.link}
                  />
                ))}
              </div>
            </TabsContent>
          </>
        )}
      </Tabs>
    </div>
  );
};

export default News;
