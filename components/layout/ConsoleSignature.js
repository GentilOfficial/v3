"use client"

import {useEffect } from "react"

export default function ConsoleSignature() {
    useEffect(() => {
        console.log.apply(console, [
            "%c 🌵 Made with love by Federico Gentili",
            "background:#1f1f1f;color:#f1f1f1;padding:2px 6px;border-radius:6px"
        ])
    })

    return null
}