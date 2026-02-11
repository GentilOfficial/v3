import { createClient } from "@supabase/supabase-js"
import Experiences from "@/components/sections/Experiences"

export default async function About() {
  const URL = process.env.NEXT_PUBLIC_SUPABASE_URL ?? ""
  const KEY = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY ?? ""
  const supabase = createClient(URL, KEY)

  const { data: jobs, error } = await supabase.from("jobs").select()

  if (error) {
    throw new Error(error.message)
  }

  const jobsWithIcons = await Promise.all(
    jobs.map(async (job) => {
      if (job.company_icon_path?.bucket && job.company_icon_path?.path) {
        const { data: imageData } = supabase.storage
          .from(job.company_icon_path.bucket)
          .getPublicUrl(job.company_icon_path.path)

        return {
          ...job,
          company_icon_url: imageData.publicUrl,
        }
      }
      return { ...job, company_icon_url: null }
    }),
  )

  return <Experiences experiences={jobsWithIcons} />
}
