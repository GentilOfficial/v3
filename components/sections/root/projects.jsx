"use client"

import { motion } from "motion/react"
import { projects } from "@/config/content.config"

const ease = [0.25, 0.75, 0.25, 1]

export default function Projects() {
  const { title, subtitle, description } = projects

  return (
    <section className="py-20 md:py-24" id="projects">
      <div className="flex flex-col gap-5 mb-8">
        <motion.h2
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease }}
          className="text-3xl sm:text-4xl xl:text-5xl"
        >
          <span className="block">{title}</span>
          <span className="text-foreground/50">{subtitle}</span>
        </motion.h2>

        <motion.p
          initial={{ opacity: 0, y: 18, filter: "blur(4px)" }}
          whileInView={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          viewport={{ once: true }}
          transition={{ duration: 0.6, ease, delay: 0.12 }}
          className="text-foreground/50 text-sm max-w-2xl"
        >
          {description}
        </motion.p>
      </div>
    </section>
  )
}
