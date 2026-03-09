"use client"
import { SpotlightInfoCard } from "@/components/ui/SpotlightInfoCard"
import { techStack } from "@/config/content.config"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion } from "motion/react"
import {
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si"

const TECH_ICON_MAP = {
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  laravel: SiLaravel,
  github: SiGithub,
  javascript: SiJavascript,
}

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.08,
    },
  },
}

const cardItem = {
  hidden: { opacity: 0, y: 24, filter: "blur(6px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.75, 0.25, 1] },
  },
}

export default function TechStack() {
  const { lang } = useLanguage()
  const localizedTechStack = getLocalizedValue(techStack, lang)
  const { title, subtitle, description, tools } = localizedTechStack

  return (
    <section
      className="flex flex-col items-center py-20 md:py-24"
      id="tech-stack"
    >
      <div className="flex flex-col gap-4 mb-12">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease: [0.25, 0.75, 0.25, 1] }}
          className="text-3xl sm:text-4xl xl:text-5xl text-center"
        >
          <span className="block">{title}</span>
          <span className="text-foreground/50">{subtitle}</span>
        </motion.h2>
        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.75, 0.25, 1],
            delay: 0.12,
          }}
          className="text-foreground/50 text-center text-sm max-w-xl mx-auto"
        >
          {description}
        </motion.p>
      </div>
      <motion.div
        variants={container}
        initial="hidden"
        whileInView="show"
        viewport={{ once: true, margin: "-80px" }}
        className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4"
      >
        {tools.map((tool, index) => {
          const Icon = TECH_ICON_MAP[tool.icon.key]
          if (!Icon) return null
          const isFill = tool.icon.fill

          return (
            <motion.div key={`tool-${index}`} variants={cardItem}>
              <SpotlightInfoCard
                divider
                className="gap-1"
                title={tool.title}
                subtitle={tool.tag}
                description={tool.description}
                titleClassName="text-base font-bold text-foreground"
                subtitleClassName="text-xs text-foreground/40"
                icon={
                  <Icon
                    className={isFill ? "size-full rounded-sm" : "size-full"}
                  />
                }
                iconWrapperClassName={`rounded-md border-0 shadow-sm p-1 overflow-hidden group-hover:scale-110 ${isFill ? "p-0.5" : "p-1"}`}
                iconWrapperStyle={{
                  backgroundColor: tool.icon.bg,
                  color: tool.icon.color,
                }}
                descriptionClassName="mt-auto text-sm leading-relaxed text-foreground/50"
                spotlightColor="rgba(120, 120, 120, 0.15)"
              />
            </motion.div>
          )
        })}
      </motion.div>
    </section>
  )
}
