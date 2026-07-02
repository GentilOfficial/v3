'use client'

import Divider from '@/components/ui/Divider'
import GradientText from '@/components/ui/GradientText'
import { useLoading } from '@/providers/LoadingProvider'
import { motion, useInView } from 'motion/react'
import { useTheme } from 'next-themes'
import dynamic from 'next/dynamic'
import { useRef } from 'react'
import { SiGithub, SiJavascript, SiLaravel, SiNextdotjs, SiReact, SiTailwindcss } from 'react-icons/si'

const TechStackLoop = dynamic(() => import('@/components/ui/TechStackLoop'))
const Globe = dynamic(() => import('@/components/ui/globe').then((mod) => mod.Globe))

const TECH_ICON_MAP = {
  nextjs: SiNextdotjs,
  react: SiReact,
  tailwindcss: SiTailwindcss,
  laravel: SiLaravel,
  github: SiGithub,
  javascript: SiJavascript,
}

const ease = [0.25, 0.75, 0.25, 1]

export default function HeroSection({ content }) {
  const { isLoading } = useLoading()
  const { theme, systemTheme } = useTheme()
  const fadeUp = (delay = 0) => ({
    initial: { opacity: 0, y: 28, filter: 'blur(8px)' },
    animate: isLoading ? {} : { opacity: 1, y: 0, filter: 'blur(0px)' },
    transition: { duration: 0.9, ease, delay },
  })

  const { title, subtitle, description, techStackIcons, availableForWork, techStackLoopAriaLabel } = content
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

  const isDark = theme === 'dark' || (theme === 'system' && systemTheme === 'dark')

  const globeColors = {
    baseColor: [0.985, 0.985, 0.985],
    glowColor: isDark ? [0.25, 0.25, 0.25] : [0.75, 0.75, 0.75],
    markerColor: isDark ? [251 / 255, 100 / 255, 21 / 255] : [232 / 255, 124 / 255, 54 / 255],
  }

  return (
    <section className="relative flex flex-col lg:flex-row gap-6 min-h-200 pb-20 md:pb-24">
      <motion.div
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 2, ease }}
        className="pointer-events-none absolute bg-primary/5 top-0 left-0 md:-left-16 w-60 h-60 md:w-120 md:h-120 rounded-full blur-[60px] md:blur-[120px] -z-10"
      />

      <div className="flex flex-col gap-8 flex-1 justify-center text-center lg:text-start py-8">
        <motion.div {...fadeUp(0)} className="flex items-center gap-2 w-fit mx-auto lg:mx-0">
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
            <GradientText colors={['var(--secondary)', 'var(--primary)', 'var(--secondary)']} animationSpeed={5}>
              {subtitle}
            </GradientText>
          </motion.span>
        </h1>

        <motion.p {...fadeUp(0.36)} className="text-foreground/60 mx-auto max-w-xl lg:mx-0 text-md lg:text-base">
          {description}
        </motion.p>

        <motion.div
          initial={{ opacity: 0, scaleX: 0.4 }}
          animate={isLoading ? {} : { opacity: 1, scaleX: 1 }}
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

      <div className="flex-1 flex items-center justify-center lg:justify-end min-h-100">
        <motion.div
          ref={terminalRef}
          initial={{ opacity: 0, y: 32, filter: 'blur(10px)' }}
          animate={
            !isLoading && terminalInView
              ? { opacity: 1, y: 0, filter: 'blur(0px)' }
              : { opacity: 0, y: 32, filter: 'blur(10px)' }
          }
          transition={{ duration: 1, ease, delay: 0.5 }}
          className="relative w-full aspect-square max-w-lg flex items-center justify-center"
        >
          <Globe
            config={{
              width: 800,
              height: 800,
              devicePixelRatio: 2,
              phi: 0,
              theta: 0.5,
              dark: isDark ? 1 : 0,
              diffuse: 1.2,
              mapSamples: 8000,
              mapBrightness: isDark ? 1.2 : 1.5,
              baseColor: globeColors.baseColor,
              markerColor: globeColors.markerColor,
              glowColor: globeColors.glowColor,
              markers: [{ location: [44.8333, 11.6166], size: 0.25 }],
            }}
          />
        </motion.div>
      </div>
    </section>
  )
}
