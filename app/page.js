import About from "@/components/sections/root/about"
import Certifications from "@/components/sections/root/certifications"
import Hero from "@/components/sections/root/hero"
import Projects from "@/components/sections/root/projects"
import TechStack from "@/components/sections/root/tech-stack"

export default function Home() {
  return (
    <div className="flex flex-col">
      <Hero />
      <About />
      <Certifications />
      <Projects />
      <TechStack />
    </div>
  )
}
