"use client"

import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { Button } from "@/components/ui/button"
import { projects } from "@/config/content.config"
import { getLocalizedValue, localizePath } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const ease = [0.25, 0.75, 0.25, 1]

export default function Projects() {
  const { lang } = useLanguage()
  const localizedProjects = getLocalizedValue(projects, lang)
  const { title, subtitle, description, featured } = localizedProjects
  const topProjects = featured.slice(0, 3)
  const projectsHref = localizePath("/projects", lang)

  return (
    <section className="py-20 md:py-24" id="projects">
      <div className="mb-8 flex flex-col gap-5 md:mb-10">
        <SectionIntro title={title} subtitle={subtitle} />

        <motion.div
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.12 }}
          className="flex flex-col gap-4 lg:flex-row lg:items-end lg:justify-between"
        >
          <p className="max-w-2xl text-sm text-foreground/50">{description}</p>

          <Button asChild variant="outline">
            <Link href={projectsHref}>
              {lang === "it" ? "Vedi tutti i progetti" : "See all projects"}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <div className="grid gap-4 lg:grid-cols-3">
        {topProjects.map((project, index) => (
          <motion.div
            key={project.name}
            initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
            whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
            viewport={{ once: true, margin: "-60px" }}
            transition={{ duration: 0.55, ease, delay: index * 0.08 }}
          >
            <ProjectCard project={project} index={index} compact />
          </motion.div>
        ))}
      </div>
    </section>
  )
}
