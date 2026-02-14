"use client"
import { motion, useScroll, useMotionValueEvent } from "framer-motion"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import { useState } from "react"
import logo from "@/public/icon.svg"
import Image from "next/image"
import routes from "@/config/routes.config"
import Link from "next/link"
import { HamburgerButton } from "@/components/ui/HamburgerButton"
import { usePathname } from "next/navigation"
import { NavbarMobileMenu } from "./NavbarMobileMenu"


export default function Navbar() {
  const { scrollY } = useScroll()
  const [hidden, setHidden] = useState(false)
  const [open, setOpen] = useState(false)
  const pathname = usePathname()

  useMotionValueEvent(scrollY, "change", (latest) => {
    const previous = scrollY.getPrevious() ?? 0
    if (!open) {
      setHidden(latest > previous && previous > 10)
    }
  })

  return (
      <motion.nav
          className="fixed top-0 w-full z-50"
          variants={{
            visible: { y: 0 },
            hidden: { y: "-100%" },
          }}
          animate={hidden ? "hidden" : "visible"}
          transition={{ duration: 0.5, ease: "easeInOut" }}
      >
        <div className={`relative backdrop-blur-lg ${open ? "bg-background/80" : "bg-background/30"} md:bg-background/30 border-b border-foreground/5 shadow shadow-foreground/5 transition duration-500`}>
          <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
            <div className="flex items-center gap-6">
              <Image src={logo} alt="Federico Gentili" className="size-7" />
              <div className="hidden md:block h-8 w-px mx-auto bg-gradient-to-b from-foreground/0 via-foreground/20 to-foreground/0"></div>
              <div className="hidden md:flex gap-8">
                {routes.map((route, index) => (
                    <Link
                        href={route.href}
                        key={index}
                        className={`
                          ${pathname === route.href
                                  ? "text-foreground/80"
                                  : "text-foreground/50 hover:text-foreground/80"}
                          transition duration-300
                        `}
                    >
                      {route.name}
                    </Link>
                ))}
              </div>
            </div>
            <div className="flex items-center gap-4">
              <LanguageSwitcher />
              <HamburgerButton  open={open} setOpen={setOpen} />
            </div>
          </div>
          <NavbarMobileMenu
              routes={routes}
              pathname={pathname}
              open={open}
              setOpen={setOpen}
          />
        </div>
      </motion.nav>
  )
}
