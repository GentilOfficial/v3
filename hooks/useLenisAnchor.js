"use client"
import { usePathname } from "next/navigation"
import { useEffect } from "react"

export function useLenisAnchor() {
  const pathname = usePathname()

  useEffect(() => {
    let isCancelled = false
    const timeoutIds = new Set()

    const scheduleRetry = (callback, delay) => {
      const timeoutId = window.setTimeout(() => {
        timeoutIds.delete(timeoutId)
        callback()
      }, delay)

      timeoutIds.add(timeoutId)
    }

    const normalizePath = (path) => {
      const normalized = path.replace(/\/+$/, "")
      return normalized || "/"
    }

    const findTarget = (hash) => {
      if (!hash || hash === "#") return null

      const decodedId = decodeURIComponent(hash.slice(1))
      if (decodedId) {
        const byId = document.getElementById(decodedId)
        if (byId) return byId

        const byName = document.getElementsByName(decodedId)[0]
        if (byName) return byName
      }

      try {
        return document.querySelector(hash)
      } catch {
        return null
      }
    }

    const smoothScrollToHash = (hash, attempt = 0) => {
      if (isCancelled || !hash || hash === "#") return

      const target = findTarget(hash)
      if (!target) {
        if (attempt < 20) {
          scheduleRetry(() => smoothScrollToHash(hash, attempt + 1), 50)
        }
        return
      }

      if (window.lenis) {
        window.lenis.scrollTo(target, {
          offset: -80,
          duration: 1.4,
          easing: (t) => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
        })
        return
      }

      target.scrollIntoView({ behavior: "smooth", block: "start" })
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
        window.history.pushState(
          null,
          "",
          `${window.location.pathname}${window.location.search}${hash}`,
        )
      }
    }

    const handleHashChange = () => {
      smoothScrollToHash(window.location.hash)
    }

    document.addEventListener("click", handleClick)
    window.addEventListener("hashchange", handleHashChange)

    if (window.location.hash) {
      smoothScrollToHash(window.location.hash)
    }

    return () => {
      isCancelled = true
      timeoutIds.forEach((timeoutId) => window.clearTimeout(timeoutId))
      document.removeEventListener("click", handleClick)
      window.removeEventListener("hashchange", handleHashChange)
    }
  }, [pathname])
}
