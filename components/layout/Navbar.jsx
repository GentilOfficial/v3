"use client"
import Divider from "@/components/ui/Divider"
import { HamburgerButton } from "@/components/ui/HamburgerButton"
import { LanguageSwitcher } from "@/components/ui/LanguageSwitcher"
import { NavRouteDropdown } from "@/components/ui/NavRouteDropdown"
import { ThemeToggle } from "@/components/ui/ThemeToggle"
import routes from "@/config/routes.config"
import { getLocalizedRoutes, localizePath, normalizePathname } from "@/lib/i18n"
import { cn } from "@/lib/utils"
import { useLanguage } from "@/providers/LanguageContext"
import Logo from "@/public/logo.svg"
import { motion, useMotionValue, useSpring } from "motion/react"
import Link from "next/link"
import { usePathname } from "next/navigation"
import { useEffect, useMemo, useRef, useState } from "react"
import { NavbarMobileMenu } from "../partials/NavbarMobileMenu"

const navVariants = {
  visible: { y: 0 },
  hidden: { y: "-100%" },
}

export default function Navbar() {
  const { lang } = useLanguage()
  const scrollY = useMotionValue(0)
  const scrollYProgress = useMotionValue(0)
  const [hidden, setHidden] = useState(false)
  const [scrolled, setScrolled] = useState(false)
  const [open, setOpen] = useState(false)
  const [dropdownOpen, setDropdownOpen] = useState(false)
  const [activeDropdown, setActiveDropdown] = useState(null)
  const pathname = usePathname()
  const navRef = useRef(null)
  const hiddenRef = useRef(hidden)
  const scrolledRef = useRef(scrolled)
  const localizedRoutes = useMemo(
    () => getLocalizedRoutes(routes, lang),
    [lang],
  )
  const homeHref = localizePath("/", lang)

  const hasNavDropdownOpen = !!activeDropdown

  const scaleX = useSpring(scrollYProgress, {
    stiffness: 200,
    damping: 30,
    restDelta: 0.001,
  })

  useEffect(() => {
    const updateScrollMetrics = () => {
      const scroll = window.scrollY || window.pageYOffset || 0
      const doc = document.documentElement
      const maxScroll = Math.max(doc.scrollHeight - window.innerHeight, 0)
      const progress = maxScroll > 0 ? Math.min(scroll / maxScroll, 1) : 0

      scrollY.set(scroll)
      scrollYProgress.set(progress)
    }

    updateScrollMetrics()
    window.addEventListener("scroll", updateScrollMetrics, { passive: true })
    window.addEventListener("resize", updateScrollMetrics)
    window.addEventListener("orientationchange", updateScrollMetrics)

    return () => {
      window.removeEventListener("scroll", updateScrollMetrics)
      window.removeEventListener("resize", updateScrollMetrics)
      window.removeEventListener("orientationchange", updateScrollMetrics)
    }
  }, [scrollY, scrollYProgress])

  useEffect(() => {
    scaleX.set(0)
  }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

  useEffect(() => {
    hiddenRef.current = hidden
  }, [hidden])

  useEffect(() => {
    scrolledRef.current = scrolled
  }, [scrolled])

  useEffect(() => {
    let prevY = 0
    const unsubscribe = scrollY.on("change", (latest) => {
      const nextHidden =
        !open &&
        !dropdownOpen &&
        !hasNavDropdownOpen &&
        latest > prevY &&
        prevY > 60
      const nextScrolled = latest > 10

      if (nextHidden !== hiddenRef.current) {
        hiddenRef.current = nextHidden
        setHidden(nextHidden)
      }

      if (nextScrolled !== scrolledRef.current) {
        scrolledRef.current = nextScrolled
        setScrolled(nextScrolled)
      }

      prevY = latest
    })
    return () => unsubscribe()
  }, [scrollY, open, dropdownOpen, hasNavDropdownOpen])

  useEffect(() => {
    const handleClickOutside = (e) => {
      if (navRef.current && !navRef.current.contains(e.target)) {
        if (open) setOpen(false)
        if (activeDropdown) setActiveDropdown(null)
      }
    }
    document.addEventListener("pointerdown", handleClickOutside)
    return () => document.removeEventListener("pointerdown", handleClickOutside)
  }, [open, activeDropdown])

  return (
    <motion.header
      ref={navRef}
      className="fixed top-0 w-full z-50"
      variants={navVariants}
      animate={hidden ? "hidden" : "visible"}
      transition={{ duration: 0.5, ease: [0.25, 0.5, 0.25, 1] }}
    >
      <div
        className={cn(
          "relative border-b transition-colors duration-500",
          "shadow shadow-foreground/5",
          scrolled
            ? "border-foreground/8 bg-background/60 backdrop-blur-sm"
            : "border-transparent bg-background/20 backdrop-blur-sm",
          (open || hasNavDropdownOpen) && "bg-background/80 backdrop-blur-sm",
        )}
      >
        <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
          <div className="flex items-center gap-6">
            <Link href={homeHref} aria-label="Go to homepage">
              <Logo className="size-8 transition-opacity duration-200 hover:opacity-70" />
            </Link>
            <Divider position="vertical" className="hidden md:block" />

            <nav className="hidden md:flex items-center gap-3">
              {localizedRoutes.map((route) => {
                const isActive =
                  normalizePathname(pathname) === normalizePathname(route.href)
                const hasItems = route.items?.length > 0
                const isOpen = activeDropdown === route.href

                if (!hasItems) {
                  return (
                    <Link
                      key={route.href}
                      href={route.href}
                      className={cn(
                        "inline-flex items-center gap-1.5 rounded-md border px-3 py-1.5 text-sm transition-colors duration-300",
                        isActive
                          ? "border-border bg-sidebar/75 text-foreground"
                          : "border-transparent text-foreground/55 hover:text-foreground/80 hover:bg-sidebar/45",
                      )}
                    >
                      {route.name}
                    </Link>
                  )
                }

                return (
                  <NavRouteDropdown
                    key={route.href}
                    route={route}
                    isOpen={isOpen}
                    isActive={isActive}
                    onToggle={() =>
                      setActiveDropdown((prev) =>
                        prev === route.href ? null : route.href,
                      )
                    }
                    onOpen={() => setActiveDropdown(route.href)}
                    onClose={() =>
                      setActiveDropdown((prev) =>
                        prev === route.href ? null : prev,
                      )
                    }
                    onNavigate={() => setActiveDropdown(null)}
                  />
                )
              })}
            </nav>
          </div>

          <div className="flex items-center gap-4">
            <LanguageSwitcher />
            <ThemeToggle onOpenChange={setDropdownOpen} />
            <HamburgerButton open={open} setOpen={setOpen} />
          </div>
        </div>

        <NavbarMobileMenu
          routes={localizedRoutes}
          pathname={pathname}
          open={open}
          setOpen={setOpen}
        />
        <motion.div
          style={{ scaleX }}
          className="absolute -bottom-px left-0 right-0 h-px origin-left bg-linear-to-r from-primary to-secondary"
        />
      </div>
    </motion.header>
  )
}
