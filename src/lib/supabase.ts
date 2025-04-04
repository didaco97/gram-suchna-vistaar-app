
import { createClient } from '@supabase/supabase-js';
import { Database } from '@/integrations/supabase/types';

const supabaseUrl = 'https://ephxvnoufczdeewpeydn.supabase.co';
const supabaseAnonKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImVwaHh2bm91ZmN6ZGVld3BleWRuIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NDMzODYzMzEsImV4cCI6MjA1ODk2MjMzMX0.Ng9J9xjuuro_9IZJJTzynArqzt_OuSyCuS08woyfZUk';

export const supabase = createClient<Database>(supabaseUrl, supabaseAnonKey, {
  auth: {
    storage: localStorage,
    persistSession: true,
    autoRefreshToken: true,
  }
});

// Types for profile data
export type ProfileType = {
  id: string;
  full_name: string | null;
  age: number | null;
  category: string | null;
  village: string | null;
  district: string | null;
  state: string | null;
  created_at: string;
  updated_at: string;
};
