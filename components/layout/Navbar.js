"use client"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { LanguageSwitcher } from "../ui/LanguageSwitcher"
import { useState } from "react"
import logo from "@/public/icon.svg"
import Image from "next/image"
import routes from "@/config/routes.config"
import Link from "next/link"
import { Button } from "../ui/button"
import { usePathname } from "next/navigation"

export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0

    setHidden(latest > previous)
  })

  const pathname = usePathname()

  return (
    <motion.nav
      className=" w-full sticky top-0 z-100 backdrop-blur-lg bg-background/30 border-b border-foreground/5 shadow shadow-foreground/5"
      variants={{
        visible: { y: 0 },
        hidden: { y: "-100%" },
      }}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: "easeInOut" }}
    >
      <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-8">
        <div className="flex items-center justify-center w-fit gap-10">
          <div>
            <Image
              src={logo}
              alt="Federico Gentili"
              className="logo size-7 text-white"
            />
          </div>
          <div className="hidden md:block h-6 w-px bg-linear-to-b from-foreground/5 via-foreground/20 to-foreground/5 rounded-full"></div>
          <div className="hidden gap-10 md:flex">
            {routes.map((route, index) => (
              <Link
                  href={route.href}
                  key={index}
                  className={`
                  ${
                    pathname === route.href 
                      ? "text-foreground/80" 
                      : "text-foreground/50 hover:text-foreground/80"
                  } 
                  transition duration-300
                  `}>
                  {route.name}
              </Link>
            ))}
          </div>
        </div>
        <LanguageSwitcher />
      </div>
    </motion.nav>
  )
}
