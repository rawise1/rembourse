// Supabase client for the training demo (Class A2-268, MIT).
// Reads config from Vite env vars (see .env.example).
import { createClient } from '@supabase/supabase-js'

const url = import.meta.env.VITE_SUPABASE_URL
const anonKey = import.meta.env.VITE_SUPABASE_ANON_KEY

export const supabase = createClient(url, anonKey)

// Endpoint for the submit-event edge function.
export const SUBMIT_EVENT_URL = `${url}/functions/v1/submit-event`
export const SUPABASE_ANON_KEY = anonKey
