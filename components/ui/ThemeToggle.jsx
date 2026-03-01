"use client"

import {useTheme} from "next-themes"
import {useEffect, useState} from "react"
import {Monitor, Moon, Sun} from "lucide-react"
import {Button} from "@/components/ui/button"
import {
    DropdownMenu,
    DropdownMenuContent,
    DropdownMenuGroup,
    DropdownMenuItem,
    DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import {AnimatePresence, motion} from "motion/react"
import {cn} from "@/lib/utils"

const THEMES = [
    {value: "light", label: "Light", icon: Sun},
    {value: "dark", label: "Dark", icon: Moon},
    {value: "system", label: "System", icon: Monitor},
]

const ICONS = {light: Sun, dark: Moon, system: Monitor}

export function ThemeToggle({onOpenChange}) {
    const {setTheme, theme} = useTheme()
    const [mounted, setMounted] = useState(false)

    useEffect(() => {
        requestAnimationFrame(() => setMounted(true))
    }, [])

    const Icon = ICONS[theme] ?? Monitor

    return (
        <DropdownMenu modal={false} onOpenChange={onOpenChange}>
            <DropdownMenuTrigger asChild>
                <Button
                    variant="outline"
                    size="icon"
                    aria-label="Toggle theme"
                    className="hover:cursor-pointer relative overflow-hidden"
                >
                    <AnimatePresence mode="wait" initial={false}>
                        {mounted ? (
                            <motion.span
                                key={theme}
                                initial={{y: -10, opacity: 0, filter: "blur(4px)"}}
                                animate={{y: 0, opacity: 1, filter: "blur(0px)"}}
                                exit={{y: 10, opacity: 0, filter: "blur(4px)"}}
                                transition={{duration: 0.2, ease: [0.25, 0.75, 0.25, 1]}}
                                className="flex items-center justify-center"
                            >
                                <Icon className="size-4"/>
                            </motion.span>
                        ) : (
                            <motion.span
                                key="skeleton"
                                className="size-4 rounded-sm bg-foreground/10 animate-pulse"
                            />
                        )}
                    </AnimatePresence>
                </Button>
            </DropdownMenuTrigger>
            <DropdownMenuContent align="end">
                <DropdownMenuGroup>
                    {THEMES.map(({value, label, icon: ItemIcon}) => {
                        const isActive = theme === value
                        return (
                            <DropdownMenuItem
                                key={value}
                                onClick={() => setTheme(value)}
                                className={cn(
                                    "hover:cursor-pointer gap-2 transition-colors duration-150",
                                    isActive && "text-foreground"
                                )}
                            >
                                <ItemIcon
                                    className={cn("size-4 transition-opacity", isActive ? "opacity-100" : "opacity-50")}/>
                                <span className="flex-1">{label}</span>
                                <AnimatePresence>
                                    {isActive && (
                                        <motion.span
                                            initial={{scale: 0, opacity: 0}}
                                            animate={{scale: 1, opacity: 1}}
                                            exit={{scale: 0, opacity: 0}}
                                            transition={{duration: 0.2, ease: "backOut"}}
                                            className="size-1.5 rounded-full bg-linear-to-br from-[#D22F27] to-[#E27022]"
                                        />
                                    )}
                                </AnimatePresence>
                            </DropdownMenuItem>
                        )
                    })}
                </DropdownMenuGroup>
            </DropdownMenuContent>
        </DropdownMenu>
    )
}