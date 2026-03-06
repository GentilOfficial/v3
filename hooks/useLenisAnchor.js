"use client"
import {useEffect} from "react"

export function useLenisAnchor() {
    useEffect(() => {
        const normalizePath = (path) => {
            const normalized = path.replace(/\/+$/, "")
            return normalized || "/"
        }

        const smoothScrollToHash = (hash) => {
            if (!hash || hash === "#") return

            const target = document.querySelector(hash)
            if (!target) return

            const run = (attempt = 0) => {
                if (window.lenis) {
                    window.lenis.scrollTo(target, {
                        offset: -80,
                        duration: 1.4,
                        easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
                    })
                    return
                }

                if (attempt < 8) {
                    setTimeout(() => run(attempt + 1), 50)
                    return
                }

                target.scrollIntoView({behavior: "smooth", block: "start"})
            }

            run()
        }

        const handleClick = (e) => {
            const anchor = e.target.closest("a")
            if (!anchor) return

            const href = anchor.getAttribute("href")
            if (!href || !href.includes("#")) return

            const url = new URL(href, window.location.href)
            const hash = url.hash
            if (!hash) return

            const currentPath = normalizePath(window.location.pathname)
            const targetPath = normalizePath(url.pathname)
            if (currentPath !== targetPath) return

            e.preventDefault()
            smoothScrollToHash(hash)

            if (window.location.hash !== hash) {
                window.history.pushState(null, "", `${window.location.pathname}${window.location.search}${hash}`)
            }
        }

        const handleHashChange = () => {
            smoothScrollToHash(window.location.hash)
        }

        document.addEventListener("click", handleClick)
        window.addEventListener("hashchange", handleHashChange)

        if (window.location.hash) {
            setTimeout(() => smoothScrollToHash(window.location.hash), 0)
        }

        return () => {
            document.removeEventListener("click", handleClick)
            window.removeEventListener("hashchange", handleHashChange)
        }
    }, [])
}
