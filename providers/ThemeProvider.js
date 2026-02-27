"use client"

import {ThemeProvider as NextThemeProvider} from "next-themes"

export function ThemeProvider({children}) {
    return (
        <NextThemeProvider
            attribute="class"
            enableSystem
            enableColorScheme
            disableTransitionOnChange
            storageKey={"fg-color-scheme"}
        >
            {children}
        </NextThemeProvider>
    )
}
