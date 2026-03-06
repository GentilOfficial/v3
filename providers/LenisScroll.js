"use client"

import {useEffect} from "react"
import Lenis from "lenis"

export default function LenisScroll() {
    useEffect(() => {
        const lenis = new Lenis()
        window.lenis = lenis
        let rafId = 0

        function raf(time) {
            lenis.raf(time)
            rafId = requestAnimationFrame(raf)
        }

        rafId = requestAnimationFrame(raf)

        return () => {
            cancelAnimationFrame(rafId)
            lenis.destroy()
            if (window.lenis === lenis) {
                delete window.lenis
            }
        }
    }, [])

    return null
}
