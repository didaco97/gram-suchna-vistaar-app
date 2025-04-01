
import React from 'react';
import { Tractor, Leaf, Droplets, Sun, Wind } from 'lucide-react';
import SchemeCard from '@/components/SchemeCard';

const Agriculture = () => {
  const schemes = [
    {
      title: "Pradhan Mantri Kisan Samman Nidhi (PM-KISAN)",
      description: "Income support of ₹6,000 per year in three equal installments to small and marginal farmer families having combined landholding of up to 2 hectares.",
      category: "Financial Support",
      deadline: "Ongoing",
      icon: <Tractor className="h-5 w-5" />,
      link: "/agriculture/pm-kisan"
    },
    {
      title: "Pradhan Mantri Fasal Bima Yojana",
      description: "Crop insurance scheme that provides comprehensive risk coverage from pre-sowing to post-harvest losses due to natural calamities.",
      category: "Insurance",
      deadline: "Season-based",
      icon: <Leaf className="h-5 w-5" />,
      link: "/agriculture/pm-fasal-bima"
    },
    {
      title: "Per Drop More Crop",
      description: "Promotes water efficiency through precision irrigation and sustainable water management practices.",
      category: "Irrigation",
      deadline: "Ongoing",
      icon: <Droplets className="h-5 w-5" />,
      link: "/agriculture/drop-more-crop"
    },
    {
      title: "Soil Health Card Scheme",
      description: "Provides information on soil health to farmers to help them improve productivity through judicious use of inputs.",
      category: "Soil Health",
      deadline: "Ongoing",
      icon: <Sun className="h-5 w-5" />,
      link: "/agriculture/soil-health-card"
    },
    {
      title: "Gramin Bhandaran Yojana",
      description: "Creates scientific storage capacity with allied facilities in rural areas to reduce post-harvest losses.",
      category: "Storage",
      deadline: "Ongoing",
      icon: <Wind className="h-5 w-5" />,
      link: "/agriculture/gramin-bhandaran"
    },
    {
      title: "National Mission for Sustainable Agriculture",
      description: "Promotes sustainable agriculture through integrated farming, appropriate soil health management, and resource conservation.",
      category: "Sustainability",
      deadline: "Ongoing",
      icon: <Leaf className="h-5 w-5" />,
      link: "/agriculture/sustainable-agriculture"
    }
  ];

  return (
    <div className="app-container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-green">Agriculture Schemes</h1>
        <p className="text-muted-foreground">
          Government initiatives and programs to support farmers and boost agricultural production.
        </p>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg bg-gramsuchna-green/10 p-6">
        <h2 className="mb-4 text-xl font-semibold text-gramsuchna-green">Why These Schemes Matter</h2>
        <p className="mb-4 text-gray-700">
          Agricultural schemes help farmers increase productivity, manage risks, adopt new technologies, and improve their livelihoods. 
          These initiatives aim to address challenges in farming and make agriculture more sustainable and profitable.
        </p>
        <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-green">Financial Support</h3>
            <p className="text-sm text-gray-600">Direct income support, subsidies, and credit facilities.</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-green">Risk Management</h3>
            <p className="text-sm text-gray-600">Crop insurance and disaster relief measures.</p>
          </div>
          <div className="rounded-md bg-white p-4 shadow-sm">
            <h3 className="mb-2 font-semibold text-gramsuchna-green">Resource Conservation</h3>
            <p className="text-sm text-gray-600">Water, soil, and other natural resource management.</p>
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

export default Agriculture;
