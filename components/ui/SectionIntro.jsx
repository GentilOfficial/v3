"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"

const ease = [0.25, 0.75, 0.25, 1]

function getMotionProps(mode, delay, distance) {
  const base = {
    initial: { opacity: 0, y: distance, filter: "blur(6px)" },
    transition: { duration: 0.6, ease, delay },
  }

  if (mode === "enter") {
    return {
      ...base,
      animate: { opacity: 1, y: 0, filter: "blur(0px)" },
    }
  }

  return {
    ...base,
    whileInView: { opacity: 1, y: 0, filter: "blur(0px)" },
    viewport: { once: true },
  }
}

export function SectionIntro({
  eyebrow,
  title,
  subtitle,
  description,
  align = "left",
  mode = "view",
  className,
  titleClassName,
  descriptionClassName,
  descriptionWidth = "max-w-2xl",
  titleAs = "h2",
  subtitleClassName,
  descriptionNode,
}) {
  const HeadingTag = titleAs

  return (
    <div
      className={cn(
        "flex flex-col gap-4",
        align === "center" && "items-center text-center",
        className,
      )}
    >
      {eyebrow ? (
        <motion.span
          {...getMotionProps(mode, 0, 18)}
          className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40"
        >
          {eyebrow}
        </motion.span>
      ) : null}

      <motion.div {...getMotionProps(mode, 0.04, 24)}>
        <HeadingTag
          className={cn(
            "text-3xl sm:text-4xl xl:text-5xl",
            align === "center" && "text-center",
            titleClassName,
          )}
        >
          <span className="block">{title}&nbsp;</span>
          {subtitle ? (
            <span className={cn("block text-foreground/50", subtitleClassName)}>
              {subtitle}
            </span>
          ) : null}
        </HeadingTag>
      </motion.div>

      {description || descriptionNode ? (
        <motion.div
          {...getMotionProps(mode, 0.14, 18)}
          className={cn(descriptionWidth, descriptionClassName)}
        >
          {descriptionNode ?? (
            <p
              className={cn(
                "text-sm leading-relaxed text-foreground/55 sm:text-base",
                align === "center" && "text-center",
              )}
            >
              {description}
            </p>
          )}
        </motion.div>
      ) : null}
    </div>
  )
}
