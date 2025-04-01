
import React from 'react';
import { GraduationCap, BookOpen, Pencil, Code, Award, Backpack } from 'lucide-react';
import SchemeCard from '@/components/SchemeCard';

const Education = () => {
  const schemes = [
    {
      title: "Samagra Shiksha Abhiyan",
      description: "Integrated scheme for school education extending from pre-school to class 12 to ensure inclusive and equitable quality education.",
      category: "School Education",
      deadline: "Ongoing",
      icon: <BookOpen className="h-5 w-5" />,
      link: "/education/samagra-shiksha"
    },
    {
      title: "PM POSHAN Scheme",
      description: "Provides mid-day meals to improve nutritional levels among children and encourage poor children to attend school more regularly.",
      category: "Nutrition",
      deadline: "Ongoing",
      icon: <Backpack className="h-5 w-5" />,
      link: "/education/pm-poshan"
    },
    {
      title: "Pradhan Mantri Vidya Lakshmi Karyakram",
      description: "Portal for students seeking education loans and scholarships for higher education in India and abroad.",
      category: "Higher Education",
      deadline: "Ongoing",
      icon: <GraduationCap className="h-5 w-5" />,
      link: "/education/vidya-lakshmi"
    },
    {
      title: "National Means-cum-Merit Scholarship Scheme",
      description: "Scholarships for meritorious students from economically weaker sections to reduce dropouts at class VIII.",
      category: "Scholarships",
      deadline: "Annual",
      icon: <Award className="h-5 w-5" />,
      link: "/education/merit-scholarship"
    },
    {
      title: "Sarva Shiksha Abhiyan",
      description: "Program aimed at universalization of elementary education as mandated by the 86th Amendment to the Constitution.",
      category: "Elementary Education",
      deadline: "Ongoing",
      icon: <Pencil className="h-5 w-5" />,
      link: "/education/sarva-shiksha"
    },
    {
      title: "Pradhan Mantri Kaushal Vikas Yojana",
      description: "Skill development initiative scheme for recognition and standardization of skills.",
      category: "Skill Development",
      deadline: "Ongoing",
      icon: <Code className="h-5 w-5" />,
      link: "/education/kaushal-vikas"
    }
  ];

  return (
    <div className="app-container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-brown">Education Schemes</h1>
        <p className="text-muted-foreground">
          Government initiatives and programs to promote quality education and skill development.
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg bg-gramsuchna-brown/10 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gramsuchna-brown">Why Education Schemes Matter</h2>
        <p className="mb-4 text-gray-700">
          Education schemes ensure that quality learning opportunities are available to all sections of society. 
          These initiatives aim to reduce educational inequality, enhance literacy rates, and develop skills 
          necessary for employment and economic growth.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-brown">Access & Equity</h3>
            <p className="text-sm text-gray-600">Ensuring education reaches all sections of society, especially disadvantaged groups.</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-brown">Quality Enhancement</h3>
            <p className="text-sm text-gray-600">Improving teaching methods, curriculum, and learning outcomes.</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-brown">Skill Development</h3>
            <p className="text-sm text-gray-600">Preparing students for employment and entrepreneurship opportunities.</p>
          </div>
        </div>
      </div>

      <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
        {schemes.map((scheme, index) => (
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
    </div>
  );
};

export default Education;
