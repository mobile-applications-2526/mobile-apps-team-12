import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';
import AsyncStorage from 'expo-sqlite/kv-store';

const supabaseUrl = "https://ccqacjrgnbqfyvkfxjoq.supabase.co";
const supabasePublishableKey = "sb_publishable_er4-JYK258s6fUpzHCd7BA_pP-vDn76";
// starting point for supabase database
export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: AsyncStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
