"use client"

import Divider from "@/components/ui/Divider"
import GradientText from "@/components/ui/GradientText"
import { hero, routes } from "@/content/site"
import { getLocalizedRoutes, getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion, useInView } from "motion/react"
import dynamic from "next/dynamic"
import { useMemo, useRef } from "react"
import {
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si"

const TechStackLoop = dynamic(
  () => import("@/components/ui/TechStackLoop"),
)
const Terminal = dynamic(() =>
  import("@/components/ui/terminal").then((mod) => mod.Terminal),
)
const TypingAnimation = dynamic(() =>
  import("@/components/ui/terminal").then((mod) => mod.TypingAnimation),
)
const AnimatedSpan = dynamic(() =>
  import("@/components/ui/terminal").then((mod) => mod.AnimatedSpan),
)

const TECH_ICON_MAP = {
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  laravel: SiLaravel,
  github: SiGithub,
  javascript: SiJavascript,
}

const ease = [0.25, 0.75, 0.25, 1]

const fadeUp = (delay = 0) => ({
  initial: { opacity: 0, y: 28, filter: "blur(8px)" },
  animate: { opacity: 1, y: 0, filter: "blur(0px)" },
  transition: { duration: 0.9, ease, delay },
})

export default function HeroSection() {
  const { lang } = useLanguage()
  const localizedHero = getLocalizedValue(hero, lang)
  const localizedRoutes = useMemo(
    () => getLocalizedRoutes(routes, lang),
    [lang],
  )
  const {
    title,
    subtitle,
    description,
    terminal,
    techStackIcons,
    availableForWork,
    techStackLoopAriaLabel,
  } = localizedHero
  const renderedTechStackIcons = techStackIcons
    .map((item) => {
      const Icon = TECH_ICON_MAP[item.icon]
      if (!Icon) return null
      return {
        ...item,
        node: <Icon />,
      }
    })
    .filter(Boolean)
  const terminalRef = useRef(null)
  const terminalInView = useInView(terminalRef, { once: true })

  return (
    <section className="relative flex flex-col lg:flex-row gap-6 min-h-200 pb-20 md:pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease }}
        className="pointer-events-none absolute bg-primary/5 top-0 left-0 md:-left-16 w-60 h-60 md:w-120 md:h-120 rounded-full blur-[60px] md:blur-[120px] -z-10"
      />

      <div className="flex flex-col gap-8 flex-1 justify-center text-center lg:text-start py-8">
        <motion.div
          {...fadeUp(0)}
          className="flex items-center gap-2 w-fit mx-auto lg:mx-0"
        >
          <span className="relative flex size-2">
            <span className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60" />
            <span className="relative inline-flex size-2 rounded-full bg-primary" />
          </span>
          <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
            {availableForWork}
          </span>
        </motion.div>

        <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08]">
          <motion.span {...fadeUp(0.1)} className="block">
            {title}&nbsp;
          </motion.span>
          <motion.span {...fadeUp(0.22)} className="block mt-1">
            <GradientText
              colors={[
                "var(--secondary)",
                "var(--primary)",
                "var(--secondary)",
              ]}
              animationSpeed={5}
            >
              {subtitle}
            </GradientText>
          </motion.span>
        </h1>

        <motion.p
          {...fadeUp(0.36)}
          className="text-foreground/60 mx-auto max-w-xl lg:mx-0 text-md lg:text-base"
        >
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={{ opacity: 1, scaleX: 1 }}
          transition={{ duration: 0.9, ease, delay: 0.48 }}
          style={{ originX: 0 }}
        >
          <Divider className="mx-auto lg:mx-0" />
        </motion.div>

        <motion.div {...fadeUp(0.56)}>
          <TechStackLoop
            icons={renderedTechStackIcons}
            ariaLabel={techStackLoopAriaLabel}
            className="mx-auto lg:mx-0"
          />
        </motion.div>
      </div>

      <div className="flex-1 flex items-center justify-center lg:justify-end">
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, y: 32, filter: "blur(10px)" }}
          animate={
            terminalInView
              ? { opacity: 1, y: 0, filter: "blur(0px)" }
              : { opacity: 0, y: 32, filter: "blur(10px)" }
          }
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="relative max-w-lg w-full"
        >
          <div
            className="pointer-events-none absolute -inset-4 rounded-2xl blur-md -z-20 opacity-30"
            style={{
              background:
                "radial-gradient(ellipse at 60% 40%, rgba(226,112,34,0.15), transparent 70%)",
            }}
          />

          <Terminal>
            <TypingAnimation>{terminal.command}</TypingAnimation>

            {terminal.output.map((line, i) => (
              <AnimatedSpan key={i}>{line}</AnimatedSpan>
            ))}

            <AnimatedSpan>{terminal.ellipsis}</AnimatedSpan>

            {localizedRoutes.map((route, i) => (
              <AnimatedSpan key={`route-${i}`}>
                {i === 0 ? "-" : "|"} {terminal.routePrefix} {route.href}
              </AnimatedSpan>
            ))}

            <AnimatedSpan>{terminal.ellipsis}</AnimatedSpan>
            <AnimatedSpan>{terminal.success}</AnimatedSpan>
          </Terminal>
        </motion.div>
      </div>
    </section>
  )
}



