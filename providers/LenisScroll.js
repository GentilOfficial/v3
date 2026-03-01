"use client"

import {useEffect} from "react"
import Lenis from "lenis"

export default function LenisScroll() {
    useEffect(() => {
        const lenis = new Lenis()
        window.lenis = lenis

        function raf(time) {
            lenis.raf(time)
            requestAnimationFrame(raf)
        }

        requestAnimationFrame(raf)

        return () => {
            lenis.destroy()
            delete window.lenis
        }
    }, [])

    return null
}