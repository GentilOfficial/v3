import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"
import Divider from "@/components/ui/Divider"
import { cn } from "@/lib/utils"
import { useEffect, useState } from "react"
import { NavRouteDropdown } from "@/components/ui/NavRouteDropdown"

export function NavbarMobileMenu({ routes, pathname, open, setOpen }) {
  const [activeDropdown, setActiveDropdown] = useState(null)

  useEffect(() => {
    if (open) {
      window.lenis?.stop()
    } else {
      window.lenis?.start()
    }
    return () => {
      window.lenis?.start()
    }
  }, [open])

  useEffect(() => {
    const mq = window.matchMedia("(min-width: 768px)")
    const handleChange = (e) => {
      if (e.matches) {
        setOpen(false)
        setActiveDropdown(null)
      }
    }
    mq.addEventListener("change", handleChange)
    return () => mq.removeEventListener("change", handleChange)
  }, [setOpen])

  return (
    <AnimatePresence
      initial={false}
      onExitComplete={() => setActiveDropdown(null)}
    >
      {open && (
        <motion.div
          key="mobile-menu"
          initial={{ height: 0, opacity: 0 }}
          animate={{ height: "auto", opacity: 1 }}
          exit={{ height: 0, opacity: 0 }}
          transition={{
            type: "tween",
            duration: 0.4,
            ease: [0.25, 0.5, 0.75, 1],
          }}
          className="md:hidden overflow-hidden"
        >
          <Divider className="mx-auto" />
          <nav
            data-lenis-prevent
            className="flex flex-col px-4 py-3 gap-2 max-h-[calc(100vh-4rem)] overflow-y-auto"
          >
            {routes.map((route, i) => {
              const hasItems = route.items?.length > 0
              const isActive = pathname === route.href
              const isOpen = activeDropdown === route.href

              return (
                <motion.div
                  key={route.href}
                  initial={{ x: -12, opacity: 0 }}
                  animate={{ x: 0, opacity: 1 }}
                  transition={{
                    delay: i * 0.06,
                    duration: 0.3,
                    ease: [0.25, 0.75, 0.25, 1],
                  }}
                >
                  {!hasItems ? (
                    <Link
                      href={route.href}
                      onClick={() => setOpen(false)}
                      className={cn(
                        "w-full inline-flex items-center justify-between rounded-md border px-3 py-2 text-sm transition-colors duration-300",
                        isActive
                          ? "border-border bg-sidebar/75 text-foreground"
                          : "border-transparent text-foreground/55 hover:text-foreground/80 hover:bg-sidebar/45",
                      )}
                    >
                      {route.name}
                    </Link>
                  ) : (
                    <NavRouteDropdown
                      route={route}
                      isOpen={isOpen}
                      isActive={isActive}
                      onToggle={() =>
                        setActiveDropdown((prev) =>
                          prev === route.href ? null : route.href,
                        )
                      }
                      onNavigate={() => {
                        setOpen(false)
                        setActiveDropdown(null)
                      }}
                      variant="mobile"
                    />
                  )}
                </motion.div>
              )
            })}
          </nav>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
