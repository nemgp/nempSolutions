import { createClient } from '@supabase/supabase-js';

let envUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
if (envUrl && !envUrl.startsWith('http')) {
  envUrl = `https://${envUrl}`;
}

// Validation et nettoyage de l'URL pour éviter les erreurs de path
let finalUrl = 'https://placeholder-url.supabase.co';
try {
  if (envUrl) {
    const urlObj = new URL(envUrl);
    finalUrl = urlObj.origin; // Garde uniquement protocole + domaine (ex: https://xyz.supabase.co)
  }
} catch (e) {
  console.warn('URL Supabase invalide ignorée:', envUrl);
}

const supabaseUrl = finalUrl;
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || 'placeholder-key';

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
