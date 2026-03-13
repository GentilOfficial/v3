"use client"

import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { certifications } from "@/config/content.config"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion } from "motion/react"

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

export default function Certifications() {
  const { lang } = useLanguage()
  const localizedCertifications = getLocalizedValue(certifications, lang)
  const { title, subtitle, description, items } = localizedCertifications

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
              key={`cert-${index}`}
              variants={cardVariants}
              className={index === 0 ? "sm:col-span-2" : ""}
            >
              <SurfacePanel className="flex h-full flex-col gap-3 p-4">
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
      </div>
    </section>
  )
}
