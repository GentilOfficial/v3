"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import { useCallback, useEffect, useState } from "react"
import { Loader, Moon, Sun } from "lucide-react"

export function ThemeToggle() {
    const { setTheme, theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true))
    }, [])

    const toggleTheme = useCallback(() => {
        if (!mounted) return

        const current = resolvedTheme ?? theme
        const nextTheme = current === "dark" ? "light" : "dark"
        setTheme(nextTheme)
    }, [mounted, resolvedTheme, theme, setTheme])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" aria-label="Toggle theme">
                <Loader className="size-4 animate-spin" />
            </Button>
        )
    }

    const isDark = (resolvedTheme ?? theme) === "dark"
    const Icon = isDark ? Sun : Moon

    return (
        <Button
            variant="outline"
            size="icon"
            aria-label="Toggle theme"
            onClick={toggleTheme}
            className="hover:cursor-pointer"
        >
            <Icon className="size-4" />
        </Button>
    )
}