import { createClient } from "@supabase/supabase-js";

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || "https://qfutuisdbyulpiboxxan.supabase.co";
const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || "sb_publishable_3xd0EGy-pgf1CkUvlxToRA_-He2dHOC";

export const supabase = createClient(supabaseUrl, supabaseAnonKey);