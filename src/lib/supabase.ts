import "react-native-url-polyfill/auto";
import { createClient } from "@supabase/supabase-js";

// Load values from .env.local
const url = process.env.EXPO_PUBLIC_SUPABASE_URL!;
const key = process.env.EXPO_PUBLIC_SUPABASE_PUBLISHABLE_KEY!;

export const supabase = createClient(url, key, {
  auth: { persistSession: false }, // Session persistence is disabled for now (covered in Lab 11)
});