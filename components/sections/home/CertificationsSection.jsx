"use client"

import RemoteContentState from "@/components/feedback/RemoteContentState"
import { CertificationCard } from "@/components/ui/CertificationCard"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { Skeleton } from "@/components/ui/Skeleton"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { useCertificationsContent } from "@/hooks/useCertificationsContent"
import { DEFERRED_CONTENT_VIEWPORT } from "@/lib/content/constants"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { motion, useInView } from "motion/react"
import { useRef } from "react"

const ease = [0.25, 0.75, 0.25, 1]

const cardVariants = {
  hidden: { opacity: 0, y: 20, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.55, ease },
  },
}

function CertificationsSectionSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2">
      {Array.from({ length: 4 }, (_, index) => (
        <SurfacePanel
          key={`certification-skeleton-${index}`}
          className="flex h-full flex-col gap-4 overflow-hidden p-3.5 sm:p-4 border-foreground/5"
        >
          <Skeleton className="aspect-video w-full rounded-lg" />

          <div className="flex flex-1 items-stretch justify-between gap-4 px-1 pb-1">
            <div className="min-w-0 flex-1 space-y-2">
              <Skeleton className="h-6 w-3/4" />
              <Skeleton className="h-4 w-1/2" />
            </div>

            <div className="w-20 shrink-0 space-y-2 text-right mt-auto">
              <Skeleton className="ml-auto h-3 w-10" />
              <Skeleton className="ml-auto h-4 w-16" />
            </div>
          </div>
        </SurfacePanel>
      ))}
    </div>
  )
}

export default function CertificationsSection({ lang, content }) {
  const sectionRef = useRef(null)
  const shouldLoadContent = useInView(sectionRef, DEFERRED_CONTENT_VIEWPORT)
  const { items, source, issue, isLoading } = useCertificationsContent(lang, {
    enabled: shouldLoadContent,
  })
  const { title, subtitle, description } = content
  const notice = getIssueNotice(issue, lang)
  const emptyState = getEmptyStateCopy("certifications", lang)

  return (
    <section ref={sectionRef} className="py-20 md:py-24" id="certifications">
      <div className="grid grid-cols-1 gap-10 lg:grid-cols-[minmax(0,0.85fr)_minmax(0,1.15fr)] lg:gap-12 xl:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            title={title}
            subtitle={subtitle}
            description={description}
            descriptionWidth="max-w-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          <RemoteContentState
            shouldLoad={shouldLoadContent}
            source={source}
            notice={notice}
            isLoading={isLoading}
            hasItems={items.length > 0}
            skeleton={<CertificationsSectionSkeleton />}
            emptyTitle={emptyState?.title}
            emptyDescription={emptyState?.description}
          >
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.slug ?? `cert-${index}`}
                  variants={cardVariants}
                >
                  <CertificationCard
                    certification={item}
                    labels={content.labels}
                  />
                </motion.div>
              ))}
            </motion.div>
          </RemoteContentState>
        </div>
      </div>
    </section>
  )
}
