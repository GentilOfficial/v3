"use client"
import {useEffect} from "react"

export function useLenisAnchor() {
    useEffect(() => {
        const handleClick = (e) => {
            const anchor = e.target.closest("a")
            if (!anchor) return

            const href = anchor.getAttribute("href")
            if (!href?.startsWith("#")) return

            const target = document.querySelector(href)
            if (!target) return

            e.preventDefault()
            window.lenis?.scrollTo(target, {
                offset: -80,
                duration: 1.4,
                easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
            })
        }

        document.addEventListener("click", handleClick)
        return () => document.removeEventListener("click", handleClick)
    }, [])
}