"use client"

import {useEffect} from "react"
import {useTheme} from "next-themes"

function upsertThemeColor(content) {
    let meta = document.querySelector('meta[name="theme-color"]')
    if (!meta) {
        meta = document.createElement("meta")
        meta.name = "theme-color"
        document.head.appendChild(meta)
    }
    meta.content = content
}

export default function ThemeColorMeta() {
    const {resolvedTheme} = useTheme()

    useEffect(() => {
        const color = resolvedTheme === "dark" ? "#0a0a0a" : "#ffffff"
        upsertThemeColor(color)
    }, [resolvedTheme])

    return null
}