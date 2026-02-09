"use client"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { useState } from "react"
import logo from "@/public/icon.svg"
import Image from "next/image"

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0

    if (latest > previous && latest > 80) {
      setHidden(true)
    } else {
      setHidden(false)
    }
  })

  return (
    <motion.nav
      className=" w-full sticky top-0 backdrop-blur-md bg-background/20 border-b border-foreground/5 shadow shadow-foreground/5"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.25, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto p-5">
        <div className="flex items-center justify-center w-fit gap-5">
          <div>
            <Image src={logo} alt="Federico Gentili" className="logo size-7" />
          </div>
          <div className="h-6 w-px bg-linear-to-b from-foreground/5 via-foreground/50 to-foreground/5 rounded-full"></div>
          <div>LINKS</div>
        </div>
        <LanguageSwitcher />
      </div>
    </motion.nav>
  )
}
