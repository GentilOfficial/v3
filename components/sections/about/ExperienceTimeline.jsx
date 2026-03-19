"use client"

import RemoteContentState from "@/components/feedback/RemoteContentState"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { Skeleton } from "@/components/ui/Skeleton"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { useExperiencesContent } from "@/hooks/useExperiencesContent"
import { DEFERRED_CONTENT_VIEWPORT } from "@/lib/content/constants"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion, useInView } from "motion/react"
import Image from "next/image"
import { useRef } from "react"

dayjs.extend(relativeTime)

function formatDate(date, presentLabel, lang) {
  if (!date) {
    return presentLabel
  }

  return dayjs(date).locale(lang).format("MMM YYYY")
}

function ExperienceTimelineSkeleton() {
  return (
    <div className="grid gap-4">
      {Array.from({ length: 3 }, (_, index) => (
        <SurfacePanel
          key={`experience-skeleton-${index}`}
          className="grid gap-5 p-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start border-foreground/5"
        >
          <Skeleton className="size-12 rounded-xl" />

          <div className="space-y-3">
            <div className="space-y-2">
              <Skeleton className="h-3 w-32" />
              <Skeleton className="h-8 w-2/3" />
            </div>

            <Skeleton className="h-16 w-full" />
          </div>

          <div className="md:w-28 md:justify-self-end flex gap-2 items-center">
            <Skeleton className="h-4 w-20" />
            <Skeleton className="h-4 w-20" />
          </div>
        </SurfacePanel>
      ))}
    </div>
  )
}

export default function ExperienceTimeline({ lang, content }) {
  const sectionRef = useRef(null)
  const shouldLoadContent = useInView(sectionRef, DEFERRED_CONTENT_VIEWPORT)
  const {
    items: experiences,
    source,
    issue,
    isLoading,
  } = useExperiencesContent(lang, {
    enabled: shouldLoadContent,
  })
  const notice = getIssueNotice(issue, lang)
  const emptyState = getEmptyStateCopy("experiences", lang)

  return (
    <section ref={sectionRef} className="relative py-6 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <SectionIntro
          eyebrow={content.eyebrow}
          title={content.title}
          subtitle={content.subtitle}
          description={content.description}
          mode="enter"
          titleAs="h1"
          titleClassName="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        />

        <div className="grid gap-4">
          <RemoteContentState
            shouldLoad={shouldLoadContent}
            source={source}
            notice={notice}
            isLoading={isLoading}
            hasItems={experiences.length > 0}
            skeleton={<ExperienceTimelineSkeleton />}
            emptyTitle={emptyState?.title}
            emptyDescription={emptyState?.description}
          >
            {experiences.map((experience, index) => (
              <motion.div
                key={experience.slug ?? index}
                initial={{ opacity: 0, y: 30, x: -24, filter: "blur(6px)" }}
                whileInView={{ opacity: 1, y: 0, x: 0, filter: "blur(0px)" }}
                transition={{
                  duration: 0.6,
                  ease: [0.25, 0.75, 0.25, 1],
                  delay: index * 0.08,
                }}
                viewport={{ once: true }}
              >
                <SurfacePanel className="grid gap-5 p-5 md:grid-cols-[auto_minmax(0,1fr)_auto] md:items-start">
                  {experience.companyIconUrl ? (
                    <Image
                      src={experience.companyIconUrl}
                      alt={`${experience.company} ${content.companyLogoAltSuffix}`}
                      width={64}
                      height={64}
                      className="size-12 rounded-xl border border-border bg-background object-contain p-1"
                    />
                  ) : (
                    <div className="flex size-12 items-center justify-center rounded-xl border border-border bg-muted text-xs font-semibold text-foreground/45">
                      {experience.company?.slice(0, 2).toUpperCase()}
                    </div>
                  )}

                  <div className="space-y-2">
                    <div className="space-y-1">
                      <p className="text-xs uppercase tracking-[0.16em] text-foreground/40">
                        {experience.company}
                        {experience.location ? ` - ${experience.location}` : ""}
                      </p>
                      <h2 className="text-2xl font-semibold leading-tight">
                        {experience.title}
                      </h2>
                    </div>

                    <p className="text-sm leading-relaxed text-foreground/55">
                      {experience.description}
                    </p>
                  </div>

                  <div className="text-sm text-foreground/45 md:text-right">
                    {formatDate(
                      experience.startedAt,
                      content.present,
                      lang,
                    )}{" "}
                    -{" "}
                    {formatDate(
                      experience.endedAt,
                      content.present,
                      lang,
                    )}
                  </div>
                </SurfacePanel>
              </motion.div>
            ))}
          </RemoteContentState>
        </div>
      </div>
    </section>
  )
}
