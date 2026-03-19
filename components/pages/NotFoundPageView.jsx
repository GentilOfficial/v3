"use client"

import { Button } from "@/components/ui/button"
import Divider from "@/components/ui/Divider"
import { localizePath } from "@/lib/i18n"
import { motion } from "motion/react"
import Link from "next/link"

const ease = [0.25, 0.75, 0.25, 1]

const container = {
  hidden: {},
  show: {
    transition: {
      staggerChildren: 0.1,
    },
  },
}

const item = {
  hidden: { y: 24, opacity: 0, filter: "blur(6px)" },
  show: {
    y: 0,
    opacity: 1,
    filter: "blur(0px)",
    transition: { duration: 0.6, ease },
  },
}

export default function NotFoundPageView({ content, lang }) {
  return (
    <motion.div
      variants={container}
      initial="hidden"
      animate="show"
      className="flex flex-col items-center gap-6 text-center pb-20 md:pb-24"
    >
      <motion.h1 variants={item} className="relative select-none">
        <motion.span
          aria-hidden
          animate={{
            x: [0, -3, 4, -2, 3, 0],
            y: [0, 2, -3, 1, -2, 0],
            opacity: [0.5, 0.3, 0.6, 0.2, 0.5, 0.4],
          }}
          transition={{
            duration: 3,
            repeat: Infinity,
            repeatType: "mirror",
            ease: "linear",
            times: [0, 0.2, 0.4, 0.6, 0.8, 1],
          }}
          className="absolute inset-0 block font-mono text-[clamp(5rem,16vw,11rem)] font-black leading-none tracking-tighter text-secondary blur-sm pointer-events-none"
        >
          ?
        </motion.span>
        <span className="block font-mono text-[clamp(5rem,20vw,11rem)] font-black leading-none tracking-tighter text-primary">
          ?
        </span>
      </motion.h1>

      <motion.div
        variants={{
          hidden: { opacity: 0, scaleX: 0.4 },
          show: { opacity: 1, scaleX: 1, transition: { duration: 0.9, ease } },
        }}
        style={{ originX: "center" }}
        className="w-full"
      >
        <Divider className="mx-auto max-w-2/5" />
      </motion.div>

      <motion.p
        variants={item}
        className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground"
      >
        {content.title}
      </motion.p>

      <motion.p variants={item} className="max-w-xs text-sm text-foreground/50">
        {content.description}
      </motion.p>

      <motion.div variants={item} className="mt-2">
        <Link href={localizePath("/", lang)}>
          <Button className="font-mono text-xs tracking-widest uppercase hover:cursor-pointer">
            {content.cta}
          </Button>
        </Link>
      </motion.div>

      <motion.span
        variants={item}
        className="font-mono text-xs tracking-widest text-foreground/15 uppercase select-none mt-6"
      >
        {content.code}
      </motion.span>
    </motion.div>
  )
}
