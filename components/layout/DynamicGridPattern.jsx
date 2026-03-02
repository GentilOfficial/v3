"use client"

import dynamic from "next/dynamic"
import {cn} from "@/lib/utils"
import {motion} from "motion/react"

const GridPattern = dynamic(() =>
    import("@/components/ui/GridPattern").then(mod => mod.GridPattern), {
    ssr: false,
})

export function DynamicGridPattern() {
    return (
        <motion.div
            initial={{opacity: 0}}
            animate={{opacity: 1}}
            transition={{duration: 1.2, ease: "easeOut"}}
        >
            <GridPattern
                strokeDasharray="4 2"
                className={cn(
                    "-z-50 opacity-30 mask-intersect",
                    "mask-[linear-gradient(to_right,transparent,white,transparent),linear-gradient(to_bottom,transparent,white_50%,white,transparent)]"
                )}
            />
        </motion.div>
    )
}