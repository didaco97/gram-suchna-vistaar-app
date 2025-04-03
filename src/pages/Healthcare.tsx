
import React from 'react';
import { Stethoscope, Heart, Baby, Activity, Pill, Users, AlertCircle } from 'lucide-react';
import { useSchemes } from '@/hooks/useSchemes';
import SchemeCard from '@/components/SchemeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Healthcare = () => {
  const { schemes, isLoading, error } = useSchemes({ category: 'healthcare' });
  
  // Map of icons by scheme title keywords
  const getIconByTitle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('ayushman') || lowerTitle.includes('insurance')) {
      return <Stethoscope className="h-5 w-5" />;
    } else if (lowerTitle.includes('mother') || lowerTitle.includes('child') || lowerTitle.includes('janani')) {
      return <Baby className="h-5 w-5" />;
    } else if (lowerTitle.includes('ayush') || lowerTitle.includes('traditional')) {
      return <Activity className="h-5 w-5" />;
    } else if (lowerTitle.includes('medicine') || lowerTitle.includes('pharma') || lowerTitle.includes('janaushadhi')) {
      return <Pill className="h-5 w-5" />;
    } else if (lowerTitle.includes('bima') || lowerTitle.includes('insurance')) {
      return <Users className="h-5 w-5" />;
    }
    return <Heart className="h-5 w-5" />;
  };

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
      ) : (
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
      )}
    </div>
  );
};

export default Healthcare;
