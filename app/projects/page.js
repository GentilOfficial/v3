import ProjectsPageView from "@/components/pages/ProjectsPageView"
import { projects } from "@/content/site"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getLocalizedValue } from "@/lib/i18n"

export default async function ProjectsPage() {
  const lang = await getCurrentLang()
  const content = getLocalizedValue(projects, lang)

  return <ProjectsPageView lang={lang} content={content} />
}
