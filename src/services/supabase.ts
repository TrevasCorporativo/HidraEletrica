import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL || 'https://ctamabgxqlpeyaisonfx.supabase.co';
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY || '';

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
