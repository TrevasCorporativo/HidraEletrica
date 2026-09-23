import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ctamabgxqlpeyaisonfx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6ImN0YW1hYmd4cWxwZXlhaXNvbmZ4Iiwicm9sZSI6ImFub24iLCJpYXQiOjE3OTAxNDM1MTcsImV4cCI6MjEwNTcxOTUxN30.faEMsCkHWH8ba-K0Riwury0U9O1-9lg9arCx68e-Ytg';

// Validador simples para saber se a anon key real foi fornecida
export const isSupabaseConfigured = Boolean(
  supabaseUrl && 
  supabaseAnonKey && 
  supabaseAnonKey.length > 20 && 
  supabaseAnonKey !== 'your_supabase_anon_key_here'
);

// Cria o cliente Supabase (usando uma chave dummy se ainda não preenchida para não quebrar a compilação)
export const supabase = createClient(
  supabaseUrl,
  isSupabaseConfigured ? supabaseAnonKey : 'placeholder-anon-key'
);
