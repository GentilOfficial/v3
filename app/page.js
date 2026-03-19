import {
  about,
  certifications,
  faq,
  hero,
  projects,
  routes,
  techStack,
} from "@/content/site"
import AboutSection from "@/components/sections/home/AboutSection"
import CertificationsSection from "@/components/sections/home/CertificationsSection"
import FaqSection from "@/components/sections/home/FaqSection"
import HeroSection from "@/components/sections/home/HeroSection"
import ProjectsSection from "@/components/sections/home/ProjectsSection"
import TechStackSection from "@/components/sections/home/TechStackSection"
import { getCurrentLang } from "@/lib/content/get-current-lang"
import { getLocalizedRoutes, getLocalizedValue } from "@/lib/i18n"

export default async function HomePage() {
  const lang = await getCurrentLang()
  const localizedRoutes = getLocalizedRoutes(routes, lang)

  return (
    <>
      <HeroSection
        content={getLocalizedValue(hero, lang)}
        localizedRoutes={localizedRoutes}
      />
      <AboutSection content={getLocalizedValue(about, lang)} />
      <CertificationsSection
        lang={lang}
        content={getLocalizedValue(certifications, lang)}
      />
      <ProjectsSection
        lang={lang}
        content={getLocalizedValue(projects, lang)}
      />
      <TechStackSection content={getLocalizedValue(techStack, lang)} />
      <FaqSection content={getLocalizedValue(faq, lang)} />
    </>
  )
}
