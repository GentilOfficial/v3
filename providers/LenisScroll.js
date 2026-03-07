"use client"

import Lenis from "lenis"
import { useEffect } from "react"

export default function LenisScroll() {
  useEffect(() => {
    let lenis
    let rafId = 0

    const prefersReducedMotion = window.matchMedia(
      "(prefers-reduced-motion: reduce)",
    ).matches

    if (prefersReducedMotion) return

    lenis = new Lenis()
    window.lenis = lenis

    function raf(time) {
      lenis.raf(time)
      rafId = requestAnimationFrame(raf)
    }

    rafId = requestAnimationFrame(raf)

    return () => {
      if (rafId) {
        cancelAnimationFrame(rafId)
      }
      if (lenis) {
        lenis.destroy()
      }
      if (lenis && window.lenis === lenis) {
        delete window.lenis
      }
    }
  }, [])

  return null
}
