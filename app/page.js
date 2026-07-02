import AboutSection from '@/components/sections/home/AboutSection'
import CertificationsSection from '@/components/sections/home/CertificationsSection'
import FaqSection from '@/components/sections/home/FaqSection'
import HeroSection from '@/components/sections/home/HeroSection'
import ProjectsSection from '@/components/sections/home/ProjectsSection'
import TechStackSection from '@/components/sections/home/TechStackSection'
import { about, certifications, faq, hero, projects, techStack } from '@/content/site'
import { getCurrentLang } from '@/lib/content/get-current-lang'
import { getLocalizedValue } from '@/lib/i18n'

export default async function HomePage() {
  const lang = await getCurrentLang()

  return (
    <>
      <HeroSection content={getLocalizedValue(hero, lang)} />
      <AboutSection content={getLocalizedValue(about, lang)} />
      <CertificationsSection lang={lang} content={getLocalizedValue(certifications, lang)} />
      <ProjectsSection lang={lang} content={getLocalizedValue(projects, lang)} />
      <TechStackSection content={getLocalizedValue(techStack, lang)} />
      <FaqSection content={getLocalizedValue(faq, lang)} />
    </>
  )
}
