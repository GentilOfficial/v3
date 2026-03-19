import ExperienceTimeline from "@/components/sections/about/ExperienceTimeline"
import { experiencesPage } from "@/content/site"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getLocalizedValue } from "@/lib/i18n"

export default async function AboutPage() {
  const lang = await getCurrentLang()

  return (
    <ExperienceTimeline
      lang={lang}
      content={getLocalizedValue(experiencesPage, lang)}
    />
  )
}
