"use client"

import ContentEmptyState from "@/components/feedback/ContentEmptyState"
import ContentNotice from "@/components/feedback/ContentNotice"
import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { certifications } from "@/config/content.config"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion } from "motion/react"
import Image from "next/image"

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

export default function Certifications({
  items = [],
  source = "database",
  issue = null,
}) {
  const { lang } = useLanguage()
  const localizedCertifications = getLocalizedValue(certifications, lang)
  const { title, subtitle, description } = localizedCertifications
  const notice = getIssueNotice(issue, lang)
  const emptyState = getEmptyStateCopy("certifications", lang)

  return (
    <section className="py-20 md:py-24" id="certifications">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16">
        <div className="flex flex-col gap-5 lg:sticky lg:top-28 lg:self-start">
          <SectionIntro
            title={title}
            subtitle={subtitle}
            description={description}
            descriptionWidth="max-w-lg"
          />
        </div>

        <div className="flex flex-col gap-4">
          {source === "fallback" && notice ? (
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <ContentNotice
                title={notice.title}
                description={notice.description}
              />
            </motion.div>
          ) : null}

          {items.length ? (
            <motion.div
              variants={{
                hidden: {},
                show: { transition: { staggerChildren: 0.08 } },
              }}
              initial="hidden"
              whileInView="show"
              viewport={{ once: true, margin: "-60px" }}
              className="grid grid-cols-1 sm:grid-cols-2 gap-4"
            >
              {items.map((item, index) => (
                <motion.article
                  key={item.slug ?? `cert-${index}`}
                  variants={cardVariants}
                  className={index === 0 ? "sm:col-span-2" : ""}
                >
                  <SurfacePanel className="flex h-full gap-4 p-4">
                    {item.badgeUrl ? (
                      <div className="relative size-14 shrink-0 overflow-hidden rounded-xl border border-border bg-background">
                        <Image
                          src={item.badgeUrl}
                          alt={item.badgeAlt ?? item.title}
                          fill
                          sizes="56px"
                          className="object-contain p-2"
                        />
                      </div>
                    ) : null}

                    <div className="flex flex-col">
                      <h3 className="text-sm font-semibold leading-tight">
                        {item.title}
                      </h3>
                      <p className="mt-1 text-xs text-foreground/45">
                        {item.issuer} - {item.issued}
                      </p>
                    </div>
                  </SurfacePanel>
                </motion.article>
              ))}
            </motion.div>
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
