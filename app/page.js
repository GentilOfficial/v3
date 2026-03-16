import AboutSection from "@/components/sections/home/AboutSection"
import CertificationsSection from "@/components/sections/home/CertificationsSection"
import FaqSection from "@/components/sections/home/FaqSection"
import HeroSection from "@/components/sections/home/HeroSection"
import ProjectsSection from "@/components/sections/home/ProjectsSection"
import TechStackSection from "@/components/sections/home/TechStackSection"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getCertificationsContent } from "@/lib/content/certifications"
import { getProjectsContent } from "@/lib/content/projects"

export default async function HomePage() {
  const lang = await getCurrentLang()
  const [projectsContent, certificationsContent] = await Promise.all([
    getProjectsContent(lang),
    getCertificationsContent(lang),
  ])

  return (
    <>
      <HeroSection />
      <AboutSection />
      <CertificationsSection
        items={certificationsContent.items}
        source={certificationsContent.source}
        issue={certificationsContent.issue}
      />
      <ProjectsSection
        items={projectsContent.items}
        source={projectsContent.source}
        issue={projectsContent.issue}
      />
      <TechStackSection />
      <FaqSection />
    </>
  )
}
