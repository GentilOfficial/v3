import ExperienceTimeline from "@/components/sections/about/ExperienceTimeline"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getExperiencesContent } from "@/lib/content/experiences"

export default async function AboutPage() {
  const lang = await getCurrentLang()
  const experiencesContent = await getExperiencesContent(lang)

  return (
    <ExperienceTimeline
      experiences={experiencesContent.items}
      source={experiencesContent.source}
      issue={experiencesContent.issue}
    />
  )
}
