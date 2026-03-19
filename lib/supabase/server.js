import "server-only"

import { createClient } from "@supabase/supabase-js"
import { getServerSupabaseEnv } from "@/lib/supabase/env"
import { getSupabasePublicUrl as getPublicUrlFromClient } from "@/lib/supabase/public-url"

export function getSupabaseServerClient() {
  const { url, key } = getServerSupabaseEnv()

  if (!url || !key) return null

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function getSupabasePublicUrl(bucket, path) {
  const client = getSupabaseServerClient()
  return getPublicUrlFromClient(client, bucket, path)
}
