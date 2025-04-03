
import { useState } from 'react';
import { useQuery } from '@tanstack/react-query';
import { supabase } from '@/lib/supabase';

export interface SchemeType {
  title: string;
  description: string;
  category: string;
  deadline?: string;
  link: string;
}

export function useSchemes(category: string = 'all') {
  const [error, setError] = useState<string | null>(null);

  const fetchSchemes = async (): Promise<SchemeType[]> => {
    try {
      console.info(`Fetching schemes for category: ${category}`);
      
      const { data, error } = await supabase.functions.invoke('fetch-schemes', {
        query: { category }
      });
      
      if (error) {
        console.error('Error from edge function:', error);
        setError('Failed to fetch schemes. Please try again later.');
        return [];
      }
      
      if (!data || !data.data || !Array.isArray(data.data)) {
        console.error('Invalid data structure received:', data);
        setError('Received invalid data from server.');
        return [];
      }
      
      console.info(`Received ${data.data.length} schemes for ${category}`);
      return data.data;
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('An unexpected error occurred. Please try again later.');
      return [];
    }
  };

  const { data, isLoading, refetch } = useQuery({
    queryKey: ['schemes', category],
    queryFn: fetchSchemes,
    staleTime: 5 * 60 * 1000, // 5 minutes
  });

  return {
    schemes: data || [],
    isLoading,
    error,
    refetch
  };
}
