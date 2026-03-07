import About from "@/components/sections/root/about"
import Certifications from "@/components/sections/root/certifications"
import FAQ from "@/components/sections/root/faq"
import Hero from "@/components/sections/root/hero"
import Projects from "@/components/sections/root/projects"
import TechStack from "@/components/sections/root/tech-stack"

export default function Home() {
  return (
    <>
      <Hero />
      <About />
      <Certifications />
      <Projects />
      <TechStack />
      <FAQ />
    </>
  )
}
