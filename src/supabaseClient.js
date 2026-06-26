import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://nhctlsifbliolagxkuod.supabase.co";
const supabaseAnonKey = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6Im5oY3Rsc2lmYmxpb2xhZ3hrdW9kIiwicm9sZSI6ImFub24iLCJpYXQiOjE3ODIwODc3NjMsImV4cCI6MjA5NzY2Mzc2M30.ABiBXbQpjNigadANqoJspV_hH4f3KwDpaSYBgy6rXWs";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);
