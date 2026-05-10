import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || '';

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

export type Project = {
  id: string;
  title: string;
  description: string;
  image_url: string;
  site_url: string;
  category: 'IA' | 'Web' | 'Consulting' | string;
  created_at: string;
};
