import "server-only"

import { createClient } from "@supabase/supabase-js"

function getSupabaseEnv() {
  const url = process.env.SUPABASE_URL ?? process.env.NEXT_PUBLIC_SUPABASE_URL
  const key =
    process.env.SUPABASE_ANON_KEY ??
    process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY

  return { url, key }
}

export function getSupabaseServerClient() {
  const { url, key } = getSupabaseEnv()

  if (!url || !key) return null

  return createClient(url, key, {
    auth: {
      persistSession: false,
      autoRefreshToken: false,
    },
  })
}

export function getSupabasePublicUrl(bucket, path) {
  if (!bucket || !path) return null

  const client = getSupabaseServerClient()
  if (!client) return null

  const { data } = client.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
