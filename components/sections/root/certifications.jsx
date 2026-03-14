"use client"

import ContentEmptyState from "@/components/feedback/ContentEmptyState"
import ContentNotice from "@/components/feedback/ContentNotice"
import { CertificationCard } from "@/components/ui/CertificationCard"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { certifications } from "@/config/content.config"
import { getEmptyStateCopy, getIssueNotice } from "@/lib/content/feedback"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion } from "motion/react"

const ease = [0.25, 0.75, 0.25, 1]

const copy = {
  en: {
    issuer: "Issuer",
    date: "Date",
    credential: "View credential",
  },
  it: {
    issuer: "Ente",
    date: "Data",
    credential: "Vedi credenziale",
  },
}

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
  const localizedCopy = copy[lang] ?? copy.en
  const { title, subtitle, description } = localizedCertifications
  const notice = getIssueNotice(issue, lang)
  const emptyState = getEmptyStateCopy("certifications", lang)

  return (
    <section className="py-20 md:py-24" id="certifications">
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
              className="grid grid-cols-1 gap-4 sm:grid-cols-2"
            >
              {items.map((item, index) => (
                <motion.div
                  key={item.slug ?? `cert-${index}`}
                  variants={cardVariants}
                >
                  <CertificationCard
                    certification={item}
                    labels={localizedCopy}
                  />
                </motion.div>
              ))}
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
              whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
              viewport={{ once: true }}
              transition={{ duration: 0.6, ease }}
            >
              <ContentEmptyState
                title={emptyState?.title}
                description={emptyState?.description}
              />
            </motion.div>
          )}
        </div>
      </div>
    </section>
  )
}
