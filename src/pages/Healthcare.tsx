
import React from 'react';
import { Stethoscope, Heart, Baby, Activity, Pill, Users } from 'lucide-react';
import SchemeCard from '@/components/SchemeCard';

const Healthcare = () => {
  const schemes = [
    {
      title: "Ayushman Bharat - Pradhan Mantri Jan Arogya Yojana",
      description: "Health insurance coverage up to ₹5 lakh per family per year for secondary and tertiary care hospitalization.",
      category: "Health Insurance",
      deadline: "Ongoing",
      icon: <Stethoscope className="h-5 w-5" />,
      link: "/healthcare/ayushman-bharat"
    },
    {
      title: "National Health Mission",
      description: "Provides accessible, affordable, and quality healthcare to rural and vulnerable populations.",
      category: "Healthcare Infrastructure",
      deadline: "Ongoing",
      icon: <Heart className="h-5 w-5" />,
      link: "/healthcare/national-health-mission"
    },
    {
      title: "Janani Suraksha Yojana",
      description: "Safe motherhood intervention promoting institutional delivery among poor pregnant women.",
      category: "Maternal Health",
      deadline: "Ongoing",
      icon: <Baby className="h-5 w-5" />,
      link: "/healthcare/janani-suraksha"
    },
    {
      title: "National AYUSH Mission",
      description: "Promotes AYUSH medical systems through cost-effective AYUSH services and medicines.",
      category: "Traditional Medicine",
      deadline: "Ongoing",
      icon: <Activity className="h-5 w-5" />,
      link: "/healthcare/ayush-mission"
    },
    {
      title: "Pradhan Mantri Bhartiya Janaushadhi Pariyojana",
      description: "Makes quality medicines available at affordable prices through dedicated outlets.",
      category: "Affordable Medicines",
      deadline: "Ongoing",
      icon: <Pill className="h-5 w-5" />,
      link: "/healthcare/janaushadhi"
    },
    {
      title: "Rashtriya Swasthya Bima Yojana",
      description: "Health insurance scheme for Below Poverty Line (BPL) families.",
      category: "Health Insurance",
      deadline: "Ongoing",
      icon: <Users className="h-5 w-5" />,
      link: "/healthcare/swasthya-bima"
    }
  ];

  return (
    <div className="app-container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-orange">Healthcare Schemes</h1>
        <p className="text-muted-foreground">
          Government initiatives and programs to ensure quality healthcare for all citizens.
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg bg-gramsuchna-orange/10 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gramsuchna-orange">Why Healthcare Schemes Are Important</h2>
        <p className="mb-4 text-gray-700">
          Healthcare schemes aim to make quality medical services accessible and affordable to all citizens, 
          particularly those from economically weaker sections. These initiatives address various aspects of 
          healthcare from preventive to curative services.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-orange">Universal Coverage</h3>
            <p className="text-sm text-gray-600">Making healthcare accessible to all citizens regardless of income.</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-orange">Financial Protection</h3>
            <p className="text-sm text-gray-600">Reducing catastrophic health expenditures for families.</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-orange">Quality Improvement</h3>
            <p className="text-sm text-gray-600">Enhancing standards and outcomes of healthcare services.</p>
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

export default Healthcare;
