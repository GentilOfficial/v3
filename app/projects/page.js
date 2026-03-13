"use client"

import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { Button } from "@/components/ui/button"
import { projects } from "@/config/content.config"
import { getLocalizedValue, localizePath } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

const ease = [0.25, 0.75, 0.25, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.65, ease, delay },
})

export default function ProjectsPage() {
  const { lang } = useLanguage()
  const content = getLocalizedValue(projects, lang)
  const contactsHref = localizePath("/contacts", lang)
  const homeHref = localizePath("/", lang)

  return (
    <section className="relative py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease }}
        className="pointer-events-none absolute left-1/2 top-2 md:left-16 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <motion.div
          {...fadeUp(0)}
          className="grid gap-8 lg:grid-cols-[minmax(0,1.4fr)_minmax(18rem,0.8fr)] lg:items-end"
        >
          <SectionIntro
            eyebrow={content.eyebrow}
            title={content.title}
            subtitle={content.subtitle}
            description={content.description}
            mode="enter"
            titleAs="h1"
            titleClassName="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
          />

          <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
            {content.stats.map((item) => (
              <SurfacePanel
                key={item.label}
                className="bg-background/85 px-4 py-4"
              >
                <p className="text-2xl font-semibold sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-foreground/50">{item.label}</p>
              </SurfacePanel>
            ))}
          </div>
        </motion.div>

        <div className="grid gap-4 lg:grid-cols-3">
          {content.featured.map((project, index) => {
            return (
              <motion.div
                key={project.name}
                initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                transition={{ duration: 0.6, ease, delay: 0.12 + index * 0.08 }}
              >
                <ProjectCard project={project} index={index} />
              </motion.div>
            )
          })}
        </div>

        <motion.div
          {...fadeUp(0.2)}
          className="rounded-3xl border border-border bg-linear-to-br from-primary/8 via-background to-secondary/10 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                {content.cta.title}
              </h2>
              <p className="mt-2 text-sm text-foreground/55 sm:text-base">
                {content.cta.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={contactsHref}>
                  {content.cta.primary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href={homeHref}>{content.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}
