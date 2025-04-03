
import React from 'react';
import { GraduationCap, BookOpen, Pencil, Code, Award, Backpack, AlertCircle } from 'lucide-react';
import { useSchemes } from '@/hooks/useSchemes';
import SchemeCard from '@/components/SchemeCard';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription } from '@/components/ui/alert';

const Education = () => {
  const { schemes, isLoading, error } = useSchemes('education');
  
  // Map of icons by scheme title keywords
  const getIconByTitle = (title: string) => {
    const lowerTitle = title.toLowerCase();
    if (lowerTitle.includes('scholarship') || lowerTitle.includes('merit')) {
      return <Award className="h-5 w-5" />;
    } else if (lowerTitle.includes('poshan') || lowerTitle.includes('meal')) {
      return <Backpack className="h-5 w-5" />;
    } else if (lowerTitle.includes('skill') || lowerTitle.includes('kaushal')) {
      return <Code className="h-5 w-5" />;
    } else if (lowerTitle.includes('sarva') || lowerTitle.includes('elementary')) {
      return <Pencil className="h-5 w-5" />;
    } else if (lowerTitle.includes('shiksha') || lowerTitle.includes('school')) {
      return <BookOpen className="h-5 w-5" />;
    }
    return <GraduationCap className="h-5 w-5" />;
  };

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

export default Education;
