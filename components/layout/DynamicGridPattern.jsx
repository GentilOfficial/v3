"use client"

import { cn } from "@/lib/utils"
import { motion } from "motion/react"
import dynamic from "next/dynamic"

const GridPattern = dynamic(
  () => import("@/components/ui/GridPattern").then((mod) => mod.GridPattern),
  {
    ssr: false,
  },
)

export function DynamicGridPattern() {
  return (
    <motion.div
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 1.2, ease: "easeOut" }}
    >
      <GridPattern
        strokeDasharray="8 2"
        width={45}
        height={45}
        className={cn(
          "-z-50 opacity-30 mask-intersect",
          "mask-[linear-gradient(to_right,transparent,white,transparent),linear-gradient(to_bottom,transparent,white_300px,white_calc(100%-300px),transparent)]",
        )}
      />
    </motion.div>
  )
}
