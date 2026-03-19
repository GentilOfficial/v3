"use client"

import { SectionIntro } from "@/components/ui/SectionIntro"
import SurfacePanel from "@/components/ui/SurfacePanel"
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

export default function AboutSection({ content }) {
  const { title, subtitle, description, image, badge, highlights } = content

  return (
    <section className="py-20 md:py-24" id="about">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
        <motion.div {...fade(0)} className="relative">
          <SurfacePanel className="p-2">
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
          </SurfacePanel>

          <motion.div
            {...fade(0.15)}
            className="absolute -bottom-5 -right-3 sm:-right-5"
          >
            <SurfacePanel className="rounded-xl bg-background px-4 py-3">
              <p className="font-mono text-[10px] uppercase tracking-[0.2em] text-foreground/45">
                {badge.top}
              </p>
              <p className="text-sm font-semibold">{badge.bottom}</p>
            </SurfacePanel>
          </motion.div>
        </motion.div>

        <div className="flex flex-col gap-5">
          <SectionIntro
            title={title}
            subtitle={subtitle}
            description={description}
            descriptionWidth="max-w-xl"
          />

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
                className=""
              >
                <SurfacePanel className="h-full rounded-xl p-4">
                  <h3 className="text-sm font-semibold">{item.title}</h3>
                  <p className="mt-1 text-sm leading-relaxed text-foreground/50">
                    {item.description}
                  </p>
                </SurfacePanel>
              </motion.li>
            ))}
          </motion.ul>
        </div>
      </div>
    </section>
  )
}


