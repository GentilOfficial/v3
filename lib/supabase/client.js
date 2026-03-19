"use client"

import { createClient } from "@supabase/supabase-js"

import { getPublicSupabaseEnv } from "@/lib/supabase/env"

let browserClient

export function getSupabaseBrowserClient() {
  if (browserClient !== undefined) {
    return browserClient
  }

  const { url, key } = getPublicSupabaseEnv()

  if (!url || !key) {
    browserClient = null
    return browserClient
  }

  browserClient = createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })

  return browserClient
}
