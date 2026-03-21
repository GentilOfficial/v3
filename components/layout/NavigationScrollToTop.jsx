"use client"

import { usePathname } from "next/navigation"
import { useEffect } from "react"

export default function NavigationScrollToTop() {
  const pathname = usePathname()

  useEffect(() => {
    if (!pathname) return

    const scrollToTop = () => {
      window.scrollTo({ top: 0, left: 0, behavior: "auto" })
      window.lenis?.scrollTo(0, { immediate: true, force: true })
    }

    scrollToTop()

    const rafId = window.requestAnimationFrame(scrollToTop)

    return () => {
      window.cancelAnimationFrame(rafId)
    }
  }, [pathname])

  return null
}
