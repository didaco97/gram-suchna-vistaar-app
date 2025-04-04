import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SchemeCard from '@/components/SchemeCard';
import NewsCard from '@/components/NewsCard';
import { ArrowRight, Tractor, Stethoscope, GraduationCap, Newspaper } from 'lucide-react';
import { useSchemes } from '@/hooks/useSchemes';
import { Skeleton } from '@/components/ui/skeleton';
import { useLanguage } from '@/context/LanguageContext';

const Home = () => {
  const { t } = useLanguage();
  const { schemes: allSchemes, isLoading: schemesLoading } = useSchemes({});

  // Get featured schemes - first 3
  const featuredSchemes = React.useMemo(() => {
    if (schemesLoading || !allSchemes.length) return [];
    
    // Group schemes by category and take 1 from each major category if possible
    const categories = {'Agriculture': [], 'Healthcare': [], 'Education': []};
    const othersSchemes = [];
    
    for (const scheme of allSchemes) {
      if (categories[scheme.category]) {
        categories[scheme.category].push(scheme);
      } else {
        othersSchemes.push(scheme);
      }
    }
    
    // Try to get one from each category first
    let featured = [];
    for (const category in categories) {
      if (categories[category].length > 0) {
        featured.push(categories[category][0]);
      }
    }
    
    // Fill remaining slots with other schemes if needed
    if (featured.length < 3) {
      const remaining = othersSchemes.slice(0, 3 - featured.length);
      featured = [...featured, ...remaining];
    }
    
    // Trim to exactly 3 schemes
    return featured.slice(0, 3);
  }, [allSchemes, schemesLoading]);
  
  // Map icons for schemes
  const getSchemeIcon = (scheme) => {
    const category = scheme.category?.toLowerCase() || '';
    
    if (category.includes('agriculture')) {
      return <Tractor className="h-5 w-5" />;
    } else if (category.includes('healthcare') || category.includes('health')) {
      return <Stethoscope className="h-5 w-5" />;
    } else {
      return <GraduationCap className="h-5 w-5" />;
    }
  };

  const recentNews = [
    {
      title: "New Agricultural Market Opens in District",
      summary: "Farmers can now sell their produce directly at the newly launched market facility.",
      date: "2 hours ago",
      source: "District News",
      category: "Local News",
      link: "/news/new-agricultural-market"
    },
    {
      title: "Health Camp to be Organized Next Week",
      summary: "Free health checkups and consultations will be available at the village center.",
      date: "Yesterday",
      source: "Health Department",
      category: "Healthcare",
      link: "/news/health-camp"
    },
    {
      title: "Scholarship Applications Now Open",
      summary: "Students can apply for merit-based scholarships until the end of the month.",
      date: "3 days ago",
      source: "Education Department",
      category: "Education",
      link: "/news/scholarship-applications"
    }
  ];
  
  return (
    <div className="app-container py-6">
      <section className="mb-8 text-center">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-brown">
          {t('welcome')} {t('nativeAppName')} ({t('appName')})
        </h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          {t('tagline')}
        </p>
      </section>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Link to="/agriculture" className="group relative overflow-hidden rounded-lg bg-gramsuchna-green/10 p-6 transition-all hover:bg-gramsuchna-green/20">
          <Tractor className="mb-3 h-8 w-8 text-gramsuchna-green" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-green">{t('agriculture')}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{t('agricultureDesc')}</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-green transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link to="/healthcare" className="group relative overflow-hidden rounded-lg bg-gramsuchna-orange/10 p-6 transition-all hover:bg-gramsuchna-orange/20">
          <Stethoscope className="mb-3 h-8 w-8 text-gramsuchna-orange" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-orange">{t('healthcare')}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{t('healthcareDesc')}</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-orange transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link to="/education" className="group relative overflow-hidden rounded-lg bg-gramsuchna-brown/10 p-6 transition-all hover:bg-gramsuchna-brown/20">
          <GraduationCap className="mb-3 h-8 w-8 text-gramsuchna-brown" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-brown">{t('education')}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{t('educationDesc')}</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-brown transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link to="/news" className="group relative overflow-hidden rounded-lg bg-gramsuchna-lightBrown/30 p-6 transition-all hover:bg-gramsuchna-lightBrown/50">
          <Newspaper className="mb-3 h-8 w-8 text-gramsuchna-brown" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-brown">{t('localNews')}</h3>
          <p className="mb-3 text-sm text-muted-foreground">{t('newsDesc')}</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-brown transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="featured">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gramsuchna-brown">{t('exploreInfo')}</h2>
            <TabsList>
              <TabsTrigger value="featured">{t('featuredSchemes')}</TabsTrigger>
              <TabsTrigger value="news">{t('recentNews')}</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="featured" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {schemesLoading ? (
                // Loading skeletons for schemes
                [...Array(3)].map((_, index) => (
                  <div key={index} className="rounded-lg border p-6">
                    <div className="flex items-center space-x-2 mb-4">
                      <Skeleton className="h-10 w-10 rounded-full" />
                      <Skeleton className="h-4 w-[100px]" />
                    </div>
                    <Skeleton className="h-6 w-full mb-4" />
                    <Skeleton className="h-4 w-full mb-2" />
                    <Skeleton className="h-4 w-3/4 mb-2" />
                    <Skeleton className="h-4 w-5/6 mb-4" />
                    <Skeleton className="h-10 w-full rounded" />
                  </div>
                ))
              ) : featuredSchemes.length > 0 ? (
                featuredSchemes.map((scheme, index) => (
                  <SchemeCard 
                    key={index}
                    title={scheme.title}
                    description={scheme.description}
                    category={scheme.category}
                    deadline={scheme.deadline}
                    icon={getSchemeIcon(scheme)}
                    link={scheme.link}
                  />
                ))
              ) : (
                <div className="col-span-3 text-center py-8">
                  <p className="text-muted-foreground">No schemes available at the moment.</p>
                </div>
              )}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/agriculture">{t('viewAllSchemes')}</Link>
              </Button>
            </div>
          </TabsContent>
          
          <TabsContent value="news" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {recentNews.map((news, index) => (
                <NewsCard 
                  key={index}
                  title={news.title}
                  summary={news.summary}
                  date={news.date}
                  source={news.source}
                  category={news.category}
                  link={news.link}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/news">{t('viewAllNews')}</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
