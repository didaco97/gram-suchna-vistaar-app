
import React from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import NewsCard from '@/components/NewsCard';

const News = () => {
  const localNews = [
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
    },
    {
      title: "Village Panchayat Election Results Announced",
      summary: "The results of the recently held panchayat elections have been announced. The new members will take office next week.",
      date: "2 days ago",
      source: "Election Commission",
      category: "Governance",
      link: "/news/panchayat-election"
    }
  ];

  const healthNews = [
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
    },
    {
      title: "Vaccination Drive for Children",
      summary: "A vaccination drive for children under 5 years will be conducted in all villages of the district starting next Monday.",
      date: "5 days ago",
      source: "District Administration",
      category: "Healthcare",
      link: "/news/vaccination-drive"
    }
  ];

  const educationNews = [
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
    },
    {
      title: "Teacher Recruitment Drive Announced",
      summary: "The state government has announced a recruitment drive for teachers. Applications will be accepted from next month.",
      date: "2 weeks ago",
      source: "Education Department",
      category: "Education",
      link: "/news/teacher-recruitment"
    }
  ];

  const agricultureNews = [
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
    },
    {
      title: "Organic Farming Workshop",
      summary: "A workshop on organic farming techniques will be conducted at the Krishi Vigyan Kendra next Saturday. Registration is free.",
      date: "10 days ago",
      source: "Agriculture Department",
      category: "Agriculture",
      link: "/news/organic-farming-workshop"
    }
  ];

  return (
    <div className="app-container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-brown">Local News & Updates</h1>
        <p className="text-muted-foreground">
          Stay informed about the latest happenings, events, and announcements in your area.
        </p>
      </div>

      <Tabs defaultValue="all">
        <TabsList className="mb-6 w-full justify-start">
          <TabsTrigger value="all">All News</TabsTrigger>
          <TabsTrigger value="agriculture">Agriculture</TabsTrigger>
          <TabsTrigger value="healthcare">Healthcare</TabsTrigger>
          <TabsTrigger value="education">Education</TabsTrigger>
        </TabsList>
        
        <TabsContent value="all" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {[...localNews, ...healthNews.slice(0, 1), ...educationNews.slice(0, 1), ...agricultureNews.slice(0, 1)].map((news, index) => (
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
        </TabsContent>
        
        <TabsContent value="agriculture" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {agricultureNews.map((news, index) => (
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
        </TabsContent>
        
        <TabsContent value="healthcare" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {healthNews.map((news, index) => (
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
        </TabsContent>
        
        <TabsContent value="education" className="animate-fade-in">
          <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
            {educationNews.map((news, index) => (
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
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default News;
