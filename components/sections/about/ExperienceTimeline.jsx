"use client"

import ContentEmptyState from "@/components/feedback/ContentEmptyState"
import ContentNotice from "@/components/feedback/ContentNotice"
import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { experiencesPage } from "@/content/site"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "motion/react"
import Image from "next/image"

dayjs.extend(relativeTime)

function formatDate(date, presentLabel, lang) {
  if (!date) {
    return presentLabel
  }

  return dayjs(date).locale(lang).format("MMM YYYY")
}

export default function ExperienceTimeline({
  experiences = [],
  source = "database",
  issue = null,
}) {
  const { lang } = useLanguage()
  const localizedCopy = getLocalizedValue(experiencesPage, lang)
  const notice = getIssueNotice(issue, lang)
  const emptyState = getEmptyStateCopy("experiences", lang)

  return (
    <section className="relative py-6 md:py-10">
      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <SectionIntro
          eyebrow={localizedCopy.eyebrow}
          title={localizedCopy.title}
          subtitle={localizedCopy.subtitle}
          description={localizedCopy.description}
          mode="enter"
          titleAs="h1"
          titleClassName="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        />

        <div className="grid gap-4">
          {source === "fallback" && notice ? (
            <ContentNotice title={notice.title} description={notice.description} />
          ) : null}

          {experiences.length ? (
            experiences.map((experience, index) => (
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
                      alt={`${experience.company} ${localizedCopy.companyLogoAltSuffix}`}
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
                    {formatDate(experience.startedAt, localizedCopy.present, lang)} -{" "}
                    {formatDate(experience.endedAt, localizedCopy.present, lang)}
                  </div>
                </SurfacePanel>
              </motion.div>
            ))
          ) : (
            <ContentEmptyState
              title={emptyState?.title}
              description={emptyState?.description}
            />
          )}
        </div>
      </div>
    </section>
  )
}


