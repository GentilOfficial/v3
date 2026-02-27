"use client"

import { useTheme } from "next-themes"
import { useEffect, useState } from "react"
import { Loader, Monitor, Moon, Sun } from "lucide-react"
import { Button } from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

export function ThemeToggle() {
    const { setTheme, theme } = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true))
    }, [])

    if (!mounted) {
        return (
            <Button variant="outline" size="icon" aria-label="Toggle theme">
                <Loader className="size-4 animate-spin" />
            </Button>
        )
    }

    const getIcon = () => {
        switch (theme) {
            case "light": return <Sun className="size-4" />
            case "dark": return <Moon className="size-4" />
            default: return <Monitor className="size-4" />
        }
    }

    const themes = [
        { value: "light", label: "Light", icon: Sun },
        { value: "dark", label: "Dark", icon: Moon },
        { value: "system", label: "System", icon: Monitor },
    ]

    return (
        <DropdownMenu>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle theme"
                    className="hover:cursor-pointer"
                >
                    {getIcon()}
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    {themes.map(({ value, label, icon: Icon }) => (
                        <DropdownMenuItem
                            key={value}
                            onClick={() => setTheme(value)}
                            className="hover:cursor-pointer gap-2"
                        >
                            <Icon className="size-4" />
                            <span className="flex-1">{label}</span>
                            {theme === value && (
                                <span className="size-1.5 rounded-full bg-foreground/50" />
                            )}
                        </DropdownMenuItem>
                    ))}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}