"use client"

import {useEffect} from "react"
import Lenis from "lenis"

export default function LenisScroll() {
    useEffect(() => {
        let lenis
        let rafId = 0
        let timeoutId
        let idleId

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        if (prefersReducedMotion) return

        const start = () => {
            lenis = new Lenis()
            window.lenis = lenis

            function raf(time) {
                lenis.raf(time)
                rafId = requestAnimationFrame(raf)
            }

            rafId = requestAnimationFrame(raf)
        }

        if ("requestIdleCallback" in window) {
            idleId = window.requestIdleCallback(start, {timeout: 1200})
        } else {
            timeoutId = window.setTimeout(start, 350)
        }

        return () => {
            if (idleId) {
                window.cancelIdleCallback(idleId)
            }
            if (timeoutId) {
                window.clearTimeout(timeoutId)
            }
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
