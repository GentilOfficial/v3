"use client"

import RemoteContentState from "@/components/feedback/RemoteContentState"
import { ProjectCard } from "@/components/ui/ProjectCard"
import { ProjectCardSkeleton } from "@/components/ui/ProjectCardSkeleton"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { Button } from "@/components/ui/button"
import { useProjectsContent } from "@/hooks/useProjectsContent"
import { DEFERRED_CONTENT_VIEWPORT } from "@/lib/content/constants"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { localizePath } from "@/lib/i18n"
import { ArrowRight } from "lucide-react"
import { motion, useInView } from "motion/react"
import Link from "next/link"
import { useRef } from "react"

const ease = [0.25, 0.75, 0.25, 1]

function ProjectsSectionSkeleton() {
  return (
    <div className="grid gap-4 lg:grid-cols-3">
      {Array.from({ length: 3 }, (_, index) => (
        <ProjectCardSkeleton key={`project-skeleton-${index}`} compact />
      ))}
    </div>
  )
}

export default function ProjectsSection({ lang, content }) {
  const sectionRef = useRef(null)
  const shouldLoadContent = useInView(sectionRef, DEFERRED_CONTENT_VIEWPORT)
  const { items, source, issue, isLoading } = useProjectsContent(lang, {
    enabled: shouldLoadContent,
  })
  const { title, subtitle, description, viewAll } = content
  const topProjects = items.filter((project) => project.featured).slice(0, 3)
  const projectsHref = localizePath("/projects", lang)
  const notice = getIssueNotice(issue, lang)
  const hasHiddenProjects = items.length > 0 && topProjects.length === 0
  const emptyState = getEmptyStateCopy("projects", lang, hasHiddenProjects)

  return (
    <section ref={sectionRef} className="py-20 md:py-24" id="projects">
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
              {viewAll}
              <ArrowRight className="size-4" />
            </Link>
          </Button>
        </motion.div>
      </div>

      <RemoteContentState
        shouldLoad={shouldLoadContent}
        source={source}
        notice={notice}
        isLoading={isLoading}
        hasItems={topProjects.length > 0}
        skeleton={<ProjectsSectionSkeleton />}
        emptyTitle={emptyState?.title}
        emptyDescription={emptyState?.description}
        noticeClassName="mb-4"
      >
        <div className="grid gap-4 lg:grid-cols-3">
          {topProjects.map((project, index) => (
            <motion.div
              key={project.slug ?? project.name}
              initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true, margin: "-60px" }}
              transition={{ duration: 0.55, ease, delay: index * 0.08 }}
            >
              <ProjectCard project={project} index={index} compact />
            </motion.div>
          ))}
        </div>
      </RemoteContentState>
    </section>
  )
}
