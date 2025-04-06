
import AsyncStorage from "@react-native-async-storage/async-storage";
import 'react-native-url-polyfill/auto'
import { createClient } from '@supabase/supabase-js'
import { Database } from '@/db_types';

export const supabase = createClient<Database>(
  process.env.EXPO_PUBLIC_SUPABASE_URL || "",
  process.env.EXPO_PUBLIC_SUPABASE_ANON_KEY || "",{
    auth: {
      storage: AsyncStorage,
      autoRefreshToken: true,
      persistSession: true,
      detectSessionInUrl: false,
    },
  });
        