"use client"

import { useTheme } from "next-themes"
import { useEffect, useMemo, useState } from "react"
import { Loader, Moon, Sun, Laptop } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuItem,
    DropdownMenuLabel,
    DropdownMenuSeparator,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { cn } from "@/lib/utils"

const ThemeItem = ({
                                value,
                                label,
                                Icon,
                            }) => {
    const { theme, setTheme } = useTheme()
    const isActive = theme === value

    return (
        <DropdownMenuItem
            onSelect={(e) => {
                e.preventDefault()
                setTheme(value)
            }}
            className="flex items-center justify-between"
        >
        <span className="flex items-center">
          <Icon className="mr-2 size-4" />
            {label}
        </span>
            <span
                className={cn(
                    "size-1 rounded-full transition-opacity",
                    isActive ? "opacity-50 bg-foreground" : "opacity-0"
                )}
            />
        </DropdownMenuItem>
    )
}

export function ThemeToggle() {
    const { theme, resolvedTheme } = useTheme()
    const [mounted, setMounted] = useState(false)

    const IconSchemeAssociation = {
        "light": Moon,
        "dark": Sun,
    }

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true))
    }, [])

    const currentTheme = useMemo(() => resolvedTheme ?? theme, [resolvedTheme, theme])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" aria-label="Theme">
                <Loader className="size-4 animate-spin" />
            </Button>
        )
    }

    const Icon = IconSchemeAssociation[currentTheme]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Theme"
                    className="hover:cursor-pointer"
                >
                    <Icon className="size-4" />
                </Button>
            </DropdownMenuTrigger>

            <DropdownMenuContent align="end" className="w-44">
                <DropdownMenuLabel>Theme</DropdownMenuLabel>
                <DropdownMenuSeparator />

                <ThemeItem value="light" label="Light" Icon={Sun} />
                <ThemeItem value="dark" label="Dark" Icon={Moon} />
                <ThemeItem value="system" label="System" Icon={Laptop} />
            </DropdownMenuContent>
        </DropdownMenu>
    )
}