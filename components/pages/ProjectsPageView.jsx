"use client"

import ContentEmptyState from "@/components/feedback/ContentEmptyState"
import ContentNotice from "@/components/feedback/ContentNotice"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { Button } from "@/components/ui/button"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { localizePath } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"

const ease = [0.25, 0.75, 0.25, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.65, ease, delay },
})

function getStatValue(statKey, projects) {
  if (statKey === "published") return projects.length
  if (statKey === "live") {
    return projects.filter((project) => project.statusKey === "live").length
  }
  if (statKey === "laravel") {
    return projects.filter((project) => project.stack.includes("Laravel")).length
  }

  return 0
}

export default function ProjectsPageView({
  lang,
  content,
  projects,
  source,
  issue,
}) {
  const [activeStack, setActiveStack] = useState("all")
  const contactsHref = localizePath("/contacts", lang)
  const homeHref = localizePath("/", lang)
  const notice = getIssueNotice(issue, lang)
  const emptyState = getEmptyStateCopy("projects", lang)
  const filters = content.page.filters
  const stackFilters = Array.from(
    new Set(projects.flatMap((project) => project.stack ?? [])),
  )
  const filteredProjects =
    activeStack === "all"
      ? projects
      : projects.filter((project) => project.stack.includes(activeStack))
  const stats =
    (content.page.stats ?? []).map((item) => ({
      label: item.label,
      value: String(getStatValue(item.key, filteredProjects)),
    })) ?? []
  const resultLabel =
    filteredProjects.length === 1
      ? filters.resultSingular
      : filters.resultPlural

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
            {stats.map((item) => (
              <SurfacePanel key={item.label} className="p-4">
                <p className="text-2xl font-semibold sm:text-3xl">
                  {item.value}
                </p>
                <p className="mt-1 text-sm text-foreground/50">{item.label}</p>
              </SurfacePanel>
            ))}
          </div>
        </motion.div>

        {source === "fallback" && notice ? (
          <motion.div {...fadeUp(0.05)}>
            <ContentNotice
              title={notice.title}
              description={notice.description}
            />
          </motion.div>
        ) : null}

        {projects.length ? (
          <>
            {stackFilters.length ? (
              <motion.div {...fadeUp(0.08)}>
                <SurfacePanel className="p-4 sm:p-5">
                  <div className="flex flex-col gap-4">
                    <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
                      <div>
                        <p className="text-xs uppercase tracking-[0.16em] text-foreground/40">
                          {filters.label}
                        </p>
                        <p className="mt-1 text-sm text-foreground/55">
                          {filteredProjects.length} {resultLabel}
                        </p>
                      </div>
                    </div>

                    <div className="flex flex-wrap gap-2">
                      {[
                        { key: "all", label: filters.all },
                        ...stackFilters.map((item) => ({
                          key: item,
                          label: item,
                        })),
                      ].map((item) => {
                        const isActive = activeStack === item.key

                        return (
                          <Button
                            key={item.key}
                            type="button"
                            onClick={() => setActiveStack(item.key)}
                            size="sm"
                            variant={isActive ? "default" : "outline"}
                            className={cn(
                              "rounded-full transition-colors duration-200",
                              !isActive &&
                                "text-foreground/65 hover:bg-muted hover:text-foreground",
                            )}
                          >
                            {item.label}
                          </Button>
                        )
                      })}
                    </div>
                  </div>
                </SurfacePanel>
              </motion.div>
            ) : null}

            {filteredProjects.length ? (
              <div className="grid gap-4 lg:grid-cols-3">
                {filteredProjects.map((project, index) => {
                  return (
                    <motion.div
                      key={project.slug ?? project.name}
                      initial={{ opacity: 0, y: 26, filter: "blur(6px)" }}
                      animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
                      transition={{
                        duration: 0.6,
                        ease,
                        delay: 0.12 + index * 0.08,
                      }}
                    >
                      <ProjectCard project={project} index={index} />
                    </motion.div>
                  )
                })}
              </div>
            ) : (
              <motion.div {...fadeUp(0.1)}>
                <ContentEmptyState
                  title={filters.emptyTitle}
                  description={filters.emptyDescription}
                />
              </motion.div>
            )}
          </>
        ) : (
          <motion.div {...fadeUp(0.1)}>
            <ContentEmptyState
              title={emptyState?.title}
              description={emptyState?.description}
            />
          </motion.div>
        )}

        <motion.div
          {...fadeUp(0.2)}
          className="rounded-3xl border border-border bg-linear-to-br from-primary/8 via-background to-secondary/10 p-6 sm:p-8"
        >
          <div className="flex flex-col gap-5 lg:flex-row lg:items-end lg:justify-between">
            <div className="max-w-2xl">
              <h2 className="text-2xl font-semibold sm:text-3xl">
                {content.page.cta.title}
              </h2>
              <p className="mt-2 text-sm text-foreground/55 sm:text-base">
                {content.page.cta.description}
              </p>
            </div>

            <div className="flex flex-col gap-3 sm:flex-row">
              <Button asChild size="lg">
                <Link href={contactsHref}>
                  {content.page.cta.primary}
                  <ArrowRight className="size-4" />
                </Link>
              </Button>

              <Button asChild size="lg" variant="outline">
                <Link href={homeHref}>{content.page.cta.secondary}</Link>
              </Button>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  )
}

