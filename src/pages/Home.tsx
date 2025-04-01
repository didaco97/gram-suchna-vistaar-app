
import React from 'react';
import { Link } from 'react-router-dom';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Button } from '@/components/ui/button';
import SchemeCard from '@/components/SchemeCard';
import NewsCard from '@/components/NewsCard';
import { ArrowRight, Tractor, Stethoscope, GraduationCap, Newspaper } from 'lucide-react';

const Home = () => {
  const featuredSchemes = [
    {
      title: "Pradhan Mantri Kisan Samman Nidhi",
      description: "Income support of ₹6,000 per year in three equal installments to small and marginal farmer families.",
      category: "Agriculture",
      deadline: "31 Dec 2023",
      icon: <Tractor className="h-5 w-5" />,
      link: "/agriculture/pm-kisan"
    },
    {
      title: "Ayushman Bharat Yojana",
      description: "Health insurance coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
      category: "Healthcare",
      deadline: "No deadline",
      icon: <Stethoscope className="h-5 w-5" />,
      link: "/healthcare/ayushman-bharat"
    },
    {
      title: "PM POSHAN Scheme",
      description: "Provides mid-day meals to improve nutritional levels among school children.",
      category: "Education",
      deadline: "No deadline",
      icon: <GraduationCap className="h-5 w-5" />,
      link: "/education/pm-poshan"
    }
  ];

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
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-brown">Welcome to ग्राम सूचना (Gram Suchna)</h1>
        <p className="mx-auto max-w-2xl text-muted-foreground">
          Your one-stop platform for government schemes, programs, and local news updates for rural development.
        </p>
      </section>

      <div className="mb-12 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Link to="/agriculture" className="group relative overflow-hidden rounded-lg bg-gramsuchna-green/10 p-6 transition-all hover:bg-gramsuchna-green/20">
          <Tractor className="mb-3 h-8 w-8 text-gramsuchna-green" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-green">Agriculture</h3>
          <p className="mb-3 text-sm text-muted-foreground">Schemes and subsidies for farmers and agricultural development.</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-green transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link to="/healthcare" className="group relative overflow-hidden rounded-lg bg-gramsuchna-orange/10 p-6 transition-all hover:bg-gramsuchna-orange/20">
          <Stethoscope className="mb-3 h-8 w-8 text-gramsuchna-orange" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-orange">Healthcare</h3>
          <p className="mb-3 text-sm text-muted-foreground">Health insurance, medical facilities and wellness programs.</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-orange transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link to="/education" className="group relative overflow-hidden rounded-lg bg-gramsuchna-brown/10 p-6 transition-all hover:bg-gramsuchna-brown/20">
          <GraduationCap className="mb-3 h-8 w-8 text-gramsuchna-brown" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-brown">Education</h3>
          <p className="mb-3 text-sm text-muted-foreground">Scholarships, educational initiatives and skill development.</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-brown transition-transform group-hover:translate-x-1" />
        </Link>
        
        <Link to="/news" className="group relative overflow-hidden rounded-lg bg-gramsuchna-lightBrown/30 p-6 transition-all hover:bg-gramsuchna-lightBrown/50">
          <Newspaper className="mb-3 h-8 w-8 text-gramsuchna-brown" />
          <h3 className="mb-1 text-lg font-semibold text-gramsuchna-brown">Local News</h3>
          <p className="mb-3 text-sm text-muted-foreground">Updates, events and announcements from your area.</p>
          <ArrowRight className="h-5 w-5 text-gramsuchna-brown transition-transform group-hover:translate-x-1" />
        </Link>
      </div>

      <div className="mb-8">
        <Tabs defaultValue="featured">
          <div className="mb-4 flex items-center justify-between">
            <h2 className="text-2xl font-bold text-gramsuchna-brown">Explore Information</h2>
            <TabsList>
              <TabsTrigger value="featured">Featured Schemes</TabsTrigger>
              <TabsTrigger value="news">Recent News</TabsTrigger>
            </TabsList>
          </div>
          
          <TabsContent value="featured" className="animate-fade-in">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              {featuredSchemes.map((scheme, index) => (
                <SchemeCard 
                  key={index}
                  title={scheme.title}
                  description={scheme.description}
                  category={scheme.category}
                  deadline={scheme.deadline}
                  icon={scheme.icon}
                  link={scheme.link}
                />
              ))}
            </div>
            <div className="mt-6 text-center">
              <Button asChild>
                <Link to="/all-schemes">View All Schemes</Link>
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
                <Link to="/news">View All News</Link>
              </Button>
            </div>
          </TabsContent>
        </Tabs>
      </div>
    </div>
  );
};

export default Home;
