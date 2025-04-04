
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

export interface SchemeQueryParams {
  category?: string;
  searchQuery?: string;
  sortBy?: string;
}

export function useSchemes(params: SchemeQueryParams = {}) {
  const [error, setError] = useState<string | null>(null);
  const { category = 'all', searchQuery = '', sortBy = 'relevance' } = params;

  const fetchSchemes = async (): Promise<SchemeType[]> => {
    try {
      console.info(`Fetching schemes with params:`, params);
      
      // Use the correct parameter structure for Supabase edge function invocation
      const { data, error } = await supabase.functions.invoke('fetch-schemes', {
        body: { category, searchQuery, sortBy }
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
      
      console.info(`Received ${data.data.length} schemes for query:`, params);
      return data.data;
    } catch (err) {
      console.error('Error fetching schemes:', err);
      setError('An unexpected error occurred. Please try again later.');
      return [];
    }
  };

  const queryKey = ['schemes', category, searchQuery, sortBy];

  const { data, isLoading, refetch } = useQuery({
    queryKey,
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
