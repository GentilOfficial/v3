"use client"

import {useTheme} from "next-themes"
import {Button} from "@/components/ui/button"
import {flushSync} from "react-dom"
import {useCallback, useEffect, useRef, useState} from "react"
import {Loader, Moon, Sun} from "lucide-react"

export function ThemeToggle() {
    const {setTheme, theme, resolvedTheme} = useTheme()
    const [mounted, setMounted] = useState(false)
    const buttonRef = useRef(null)

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true))
    }, [])

    const runClipAnimation = (rect) => {
        const x = rect.left + rect.width / 2
        const y = rect.top + rect.height / 2

        const maxRadius = Math.hypot(
            Math.max(rect.left, window.innerWidth - rect.left),
            Math.max(rect.top, window.innerHeight - rect.top),
        )

        document.documentElement.animate(
            {
                clipPath: [
                    `circle(0px at ${x}px ${y}px)`,
                    `circle(${maxRadius}px at ${x}px ${y}px)`,
                ],
            },
            {
                duration: 400,
                easing: "ease-in-out",
                pseudoElement: "::view-transition-new(root)",
            },
        )
    }

    const toggleTheme = useCallback(async () => {
        if (!mounted) return

        const current = resolvedTheme ?? theme
        const nextTheme = current === "dark" ? "light" : "dark"

        const rect = buttonRef.current?.getBoundingClientRect()

        const prefersReducedMotion = window.matchMedia(
            "(prefers-reduced-motion: reduce)"
        ).matches

        const supportsTransition = "startViewTransition" in document

        if (!supportsTransition || prefersReducedMotion) {
            setTheme(nextTheme)
            return
        }

        const transition = document.startViewTransition(() => {
            flushSync(() => setTheme(nextTheme))
        })

        await transition.ready
        if (rect) runClipAnimation(rect)
    }, [mounted, resolvedTheme, theme, setTheme])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" aria-label="Toggle theme">
                <Loader className="size-4 animate-spin"/>
            </Button>
        )
    }

    const isDark = (resolvedTheme ?? theme) === "dark"
    const Icon = isDark ? Sun : Moon

    return (
        <Button
            ref={buttonRef}
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hover:cursor-pointer"
        >
            <Icon className="size-4"/>
        </Button>
    )
}
