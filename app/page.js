import { createClient } from "@supabase/supabase-js"
import Experiences from "@/app/components/sections/Experiences"

export default async function Home() {
  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
  const supabase = createClient(URL, KEY)

  const { data, error } = await supabase.from("experiences").select()

  if (error) {
    throw new Error(error.message)
  }

  return <Experiences experiences={data} />
}
