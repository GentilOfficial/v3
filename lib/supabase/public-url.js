export function getSupabasePublicUrl(client, bucket, path) {
  if (!client || !bucket || !path) return null

  const { data } = client.storage.from(bucket).getPublicUrl(path)
  return data.publicUrl
}
