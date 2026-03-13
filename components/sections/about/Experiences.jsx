"use client"

import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { useLanguage } from "@/providers/LanguageContext"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "motion/react"
import Image from "next/image"

dayjs.extend(relativeTime)

const copy = {
  en: {
    eyebrow: "Experience",
    title: "Work history",
    subtitle: "Roles, companies and ongoing growth",
    description:
      "A concise timeline of the teams and environments that shaped how I design and build products.",
    present: "Present",
  },
  it: {
    eyebrow: "Esperienza",
    title: "Percorso professionale",
    subtitle: "Ruoli, aziende e crescita continua",
    description:
      "Una timeline essenziale dei contesti e dei team che hanno influenzato il mio modo di progettare e sviluppare prodotti.",
    present: "Presente",
  },
}

function formatDate(date, lang) {
  if (!date) {
    return copy[lang]?.present ?? copy.en.present
  }

  return dayjs(date).locale(lang).format("MMM YYYY")
}

export default function Experiences({ experiences }) {
  const { lang } = useLanguage()
  const localizedCopy = copy[lang] ?? copy.en

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
          {experiences.map((experience, index) => (
            <motion.div
              key={index}
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
                {experience.company_icon_url ? (
                  <Image
                    src={experience.company_icon_url}
                    alt={`${experience.company} logo`}
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
                      {experience.company} -{" "}
                      {experience.location?.[lang] ??
                        experience.location?.en ??
                        experience.location}
                    </p>
                    <h2 className="text-2xl font-semibold leading-tight">
                      {experience.title?.[lang] ??
                        experience.title?.en ??
                        experience.title}
                    </h2>
                  </div>

                  <p className="text-sm leading-relaxed text-foreground/55">
                    {experience.description}
                  </p>
                </div>

                <div className="text-sm text-foreground/45 md:text-right">
                  {formatDate(experience.started_at, lang)} -{" "}
                  {formatDate(experience.ended_at, lang)}
                </div>
              </SurfacePanel>
            </motion.div>
          ))}
        </div>
      </div>
    </section>
  )
}
