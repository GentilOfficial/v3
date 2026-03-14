import Experiences from "@/components/sections/about/Experiences"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getExperiencesContent } from "@/lib/content/experiences"

export default async function About() {
  const lang = await getCurrentLang()
  const experiencesContent = await getExperiencesContent(lang)

  return (
    <Experiences
      experiences={experiencesContent.items}
      source={experiencesContent.source}
      issue={experiencesContent.issue}
    />
  )
}
