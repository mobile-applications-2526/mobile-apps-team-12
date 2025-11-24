import 'expo-sqlite/localStorage/install';
import { createClient } from '@supabase/supabase-js';

const supabaseUrl = "https://ccqacjrgnbqfyvkfxjoq.supabase.co";
const supabasePublishableKey = "sb_publishable_er4-JYK258s6fUpzHCd7BA_pP-vDn76";

export const supabase = createClient(supabaseUrl, supabasePublishableKey, {
  auth: {
    storage: localStorage,
    autoRefreshToken: true,
    persistSession: true,
    detectSessionInUrl: false,
  },
});
