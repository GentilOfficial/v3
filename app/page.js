import About from "@/components/sections/root/about"
import Certifications from "@/components/sections/root/certifications"
import FAQ from "@/components/sections/root/faq"
import Hero from "@/components/sections/root/hero"
import Projects from "@/components/sections/root/projects"
import TechStack from "@/components/sections/root/tech-stack"
import { getCertificationsContent } from "@/lib/content/certifications"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getProjectsContent } from "@/lib/content/projects"

export default async function Home() {
  const lang = await getCurrentLang()
  const [projectsContent, certificationsContent] = await Promise.all([
    getProjectsContent(lang),
    getCertificationsContent(lang),
  ])

  return (
    <>
      <Hero />
      <About />
      <Certifications
        items={certificationsContent.items}
        source={certificationsContent.source}
        issue={certificationsContent.issue}
      />
      <Projects
        items={projectsContent.items}
        source={projectsContent.source}
        issue={projectsContent.issue}
      />
      <TechStack />
      <FAQ />
    </>
  )
}
