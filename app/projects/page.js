import ProjectsPageView from "@/components/pages/ProjectsPageView"
import { projects } from "@/content/site"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getProjectsContent } from "@/lib/content/projects"
import { getLocalizedValue } from "@/lib/i18n"

export default async function ProjectsPage() {
  const lang = await getCurrentLang()
  const content = getLocalizedValue(projects, lang)
  const projectsContent = await getProjectsContent(lang)

  return (
    <ProjectsPageView
      lang={lang}
      content={content}
      projects={projectsContent.items}
      source={projectsContent.source}
      issue={projectsContent.issue}
    />
  )
}
