"use client"

import { about } from "@/config/content.config"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion } from "motion/react"
import Image from "next/image"

const ease = [0.25, 0.75, 0.25, 1]

const fade = (delay = 0) => ({
  initial: { opacity: 0, y: 22, filter: "blur(6px)" },
  whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
  viewport: { once: true },
  transition: { duration: 0.6, ease, delay },
})

const listVariants = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const listItem = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.45, ease },
  },
}

export default function About() {
  const { lang } = useLanguage()
  const localizedAbout = getLocalizedValue(about, lang)
  const { title, subtitle, description, image, badge, highlights } =
    localizedAbout

  return (
    <section className="py-20 md:py-24" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...fade(0)} className="relative">
          <div className="rounded-2xl border border-border bg-background p-2">
            <div className="relative aspect-4/3 rounded-xl overflow-hidden bg-linear-to-br from-primary/8 via-background to-secondary/8">
              <Image
                src={image.src}
                alt={image.alt}
                fill
                sizes="(min-width: 1024px) 45vw, 100vw"
                className="object-contain p-10 sm:p-14"
                priority={false}
              />
            </div>
          </div>

          <motion.div
            {...fade(0.15)}
            className="absolute -bottom-5 -right-3 sm:-right-5 rounded-xl border border-border bg-background px-4 py-3"
          >
            <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
              {badge.top}
            </p>
            <p className="text-sm font-semibold">{badge.bottom}</p>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <motion.h2
            {...fade(0.1)}
            className="text-3xl sm:text-4xl xl:text-5xl"
          >
            <span className="block">{title}</span>
            <span className="text-foreground/50">{subtitle}</span>
          </motion.h2>

          <motion.p
            {...fade(0.2)}
            className="text-foreground/50 text-sm max-w-xl"
          >
            {description}
          </motion.p>

          <motion.ul
            variants={listVariants}
            initial="hidden"
            whileInView="show"
            viewport={{ once: true, margin: "-60px" }}
            className="grid grid-cols-1 sm:grid-cols-2 gap-3"
          >
            {highlights.map((item, index) => (
              <motion.li
                key={`about-highlight-${index}`}
                variants={listItem}
                className="rounded-xl border border-border bg-background p-4"
              >
                <h3 className="text-sm font-semibold">{item.title}</h3>
                <p className="text-sm text-foreground/50 mt-1 leading-relaxed">
                  {item.description}
                </p>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}
