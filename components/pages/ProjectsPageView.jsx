"use client"

import ContentEmptyState from "@/components/feedback/ContentEmptyState"
import RemoteContentState from "@/components/feedback/RemoteContentState"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { ProjectCardSkeleton } from "@/components/ui/ProjectCardSkeleton"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { Skeleton } from "@/components/ui/Skeleton"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { Button } from "@/components/ui/button"
import { useProjectsContent } from "@/hooks/useProjectsContent"
import { DEFERRED_CONTENT_VIEWPORT } from "@/lib/content/constants"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { localizePath } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import { useRef, useState } from "react"

const ease = [0.25, 0.75, 0.25, 1]
const projectCardMinHeightClass = "min-h-[28rem]"
const PROJECT_STAT_RESOLVERS = {
  published: (projects) => projects.length,
  live: (projects) =>
    projects.filter((project) => project.statusKey === "live").length,
  laravel: (projects) =>
    projects.filter((project) => project.stack.includes("Laravel")).length,
}

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 24, filter: "blur(6px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.65, ease, delay },
})

function getStatValue(statKey, projects) {
  return PROJECT_STAT_RESOLVERS[statKey]?.(projects) ?? 0
}

function ProjectsPageStatsSkeleton({ count = 3 }) {
  return (
    <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
      {Array.from({ length: count }, (_, index) => (
        <SurfacePanel
          key={`project-stat-skeleton-${index}`}
          className="space-y-2 border-foreground/5 p-4"
        >
          <Skeleton className="h-8 w-16" />
          <Skeleton className="h-4 w-24" />
        </SurfacePanel>
      ))}
    </div>
  )
}

function ProjectsPageFiltersSkeleton() {
  return (
    <SurfacePanel className="border-foreground/5 p-4 sm:p-5">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col gap-1 sm:flex-row sm:items-end sm:justify-between">
          <div className="space-y-2">
            <Skeleton className="h-4 w-16" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>

        <div className="flex flex-wrap gap-2">
          {Array.from({ length: 5 }, (_, index) => (
            <Skeleton
              key={`project-filter-skeleton-${index}`}
              className="h-6 w-20 rounded-full"
            />
          ))}
        </div>
      </div>
    </SurfacePanel>
  )
}

function ProjectsPageGridSkeleton({ count = 6 }) {
  return (
    <div className="grid gap-4 lg:auto-rows-fr lg:grid-cols-3">
      {Array.from({ length: count }, (_, index) => (
        <ProjectCardSkeleton
          key={`project-page-skeleton-${index}`}
          className={projectCardMinHeightClass}
        />
      ))}
    </div>
  )
}

export default function ProjectsPageView({ lang, content }) {
  const sectionRef = useRef(null)
  const shouldLoadContent = useInView(sectionRef, DEFERRED_CONTENT_VIEWPORT)
  const [activeStack, setActiveStack] = useState("all")
  const {
    items: projects,
    source,
    issue,
    isLoading,
  } = useProjectsContent(lang, {
    enabled: shouldLoadContent,
  })
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
  const stats = (content.page.stats ?? []).map((item) => ({
    label: item.label,
    value: String(getStatValue(item.key, filteredProjects)),
  }))
  const resultLabel =
    filteredProjects.length === 1
      ? filters.resultSingular
      : filters.resultPlural
  const showLoadingState = shouldLoadContent && isLoading && !projects.length

  return (
    <section ref={sectionRef} className="relative py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.75, 0.25, 1] }}
        className="pointer-events-none absolute -top-16 md:top-6 -left-6 h-72 w-72 rounded-full bg-primary/5 blur-[90px]"
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

          {showLoadingState ? (
            <ProjectsPageStatsSkeleton
              count={content.page.stats?.length ?? 3}
            />
          ) : shouldLoadContent && stats.length ? (
            <div className="grid gap-3 sm:grid-cols-3 lg:grid-cols-1">
              {stats.map((item) => (
                <SurfacePanel key={item.label} className="p-4">
                  <p className="text-2xl font-semibold sm:text-3xl">
                    {item.value}
                  </p>
                  <p className="mt-1 text-sm text-foreground/50">
                    {item.label}
                  </p>
                </SurfacePanel>
              ))}
            </div>
          ) : null}
        </motion.div>

        <RemoteContentState
          shouldLoad={shouldLoadContent}
          source={source}
          notice={notice}
          isLoading={isLoading}
          hasItems={projects.length > 0}
          skeleton={
            <>
              <motion.div {...fadeUp(0.08)}>
                <ProjectsPageFiltersSkeleton />
              </motion.div>
              <ProjectsPageGridSkeleton />
            </>
          }
          emptyTitle={emptyState?.title}
          emptyDescription={emptyState?.description}
        >
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
              <div className="grid gap-4 lg:auto-rows-fr lg:grid-cols-3">
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
                      className={projectCardMinHeightClass}
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
        </RemoteContentState>

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
