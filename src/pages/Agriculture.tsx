
import React, { useState } from 'react';
import { Tractor, Leaf, Droplets, Sun, Wind, AlertCircle } from 'lucide-react';
import { useSchemes } from '@/hooks/useSchemes';
import SchemeCard from '@/components/SchemeCard';
import SchemeSearch from '@/components/SchemeSearch';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Agriculture = () => {
  const [searchParams, setSearchParams] = useState({
    category: 'agriculture',
    searchQuery: '',
    sortBy: 'relevance'
  });
  
  const { schemes, isLoading, error } = useSchemes(searchParams);
  
  // Map of icons by scheme title keywords
  const getIconByTitle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('water') || lowerTitle.includes('irrigation') || lowerTitle.includes('drop')) {
      return <Droplets className="h-5 w-5" />;
    } else if (lowerTitle.includes('soil') || lowerTitle.includes('land')) {
      return <Sun className="h-5 w-5" />;
    } else if (lowerTitle.includes('storage') || lowerTitle.includes('bhandaran')) {
      return <Wind className="h-5 w-5" />;
    } else if (lowerTitle.includes('sustainable') || lowerTitle.includes('organic')) {
      return <Leaf className="h-5 w-5" />;
    }
    return <Tractor className="h-5 w-5" />;
  };

  const handleSearch = (query: string, filters: { category: string; sortBy: string }) => {
    setSearchParams({
      category: filters.category === 'all' ? 'agriculture' : filters.category,
      searchQuery: query,
      sortBy: filters.sortBy
    });
  };

  return (
    <div className="app-container py-6">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gramsuchna-green">Agriculture Schemes</h1>
        <p className="text-muted-foreground">
          Government initiatives and programs to support farmers and boost agricultural production.
        </p>
      </div>

      <SchemeSearch onSearch={handleSearch} />

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

      {error && (
        <Alert variant="destructive" className="mb-6">
          <AlertCircle className="h-4 w-4" />
          <AlertDescription>{error}</AlertDescription>
        </Alert>
      )}

      {isLoading ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {[...Array(6)].map((_, index) => (
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
          ))}
        </div>
      ) : schemes.length > 0 ? (
        <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
          {schemes.map((scheme, index) => (
            <SchemeCard 
              key={index}
              title={scheme.title}
              description={scheme.description}
              category={scheme.category}
              deadline={scheme.deadline}
              icon={getIconByTitle(scheme.title)}
              link={scheme.link}
            />
          ))}
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center py-12 text-center">
          <div className="mb-4 rounded-full bg-gray-100 p-3">
            <AlertCircle className="h-6 w-6 text-gray-400" />
          </div>
          <h3 className="mb-1 text-lg font-medium">No schemes found</h3>
          <p className="text-muted-foreground">
            Try adjusting your search or filter criteria to find more results.
          </p>
        </div>
      )}
    </div>
  );
};

export default Agriculture;
