"use client"

import { useTheme } from "next-themes"
import { Button } from "@/components/ui/button"
import {
  DropdownMenu,
  DropdownMenuTrigger,
  DropdownMenuContent,
  DropdownMenuItem,
} from "@/components/ui/dropdown-menu"
import { flushSync } from "react-dom"
import { useEffect, useState, useCallback, useRef } from "react"
import { Sun, Moon, Laptop, Loader } from "lucide-react"

function ThemeMenuItem({
  value,
  icon: Icon,
  label,
  theme,
  animateThemeChange,
}) {
  return (
    <DropdownMenuItem
      onClick={() => animateThemeChange(value)}
      className="flex items-center justify-between hover:cursor-pointer"
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        {label}
      </div>
      {theme === value && <span className="size-2 rounded-full bg-primary" />}
    </DropdownMenuItem>
  )
}

export function ThemeToggle() {
  const { setTheme, theme } = useTheme()
  const [mounted, setMounted] = useState(false)
  const buttonRef = useRef(null)

  useEffect(() => {
    requestAnimationFrame(() => setMounted(true))
  }, [])

  const animateThemeChange = useCallback(
    async (newTheme) => {
      await document.startViewTransition(() => {
        flushSync(() => {
          setTheme(newTheme)
        })
      }).ready

      const rect = buttonRef.current?.getBoundingClientRect()
      if (!rect) return

      const { top, left, width, height } = rect
      const x = left + width / 2
      const y = top + height / 2

      const maxRadius = Math.hypot(
        Math.max(left, window.innerWidth - left),
        Math.max(top, window.innerHeight - top),
      )

      document.documentElement.animate(
        {
          clipPath: [
            `circle(0px at ${x}px ${y}px)`,
            `circle(${maxRadius}px at ${x}px ${y}px)`,
          ],
        },
        {
          duration: 500,
          easing: "ease-in-out",
          pseudoElement: "::view-transition-new(root)",
        },
      )
    },
    [setTheme],
  )

  const renderIcon = () => {
    if (!mounted) return <Loader className="animate-spin size-4" />
    if (theme === "dark") return <Moon className="size-4" />
    if (theme === "light") return <Sun className="size-4" />
    return <Laptop className="size-4" />
  }

  const Item = ({ value, icon: Icon, label }) => (
    <DropdownMenuItem
      onClick={() => animateThemeChange(value)}
      className="flex items-center justify-between"
    >
      <div className="flex items-center gap-2">
        <Icon className="size-4" />
        {label}
      </div>
      {theme === value && <span className="size-2 rounded-full bg-primary" />}
    </DropdownMenuItem>
  )

  return (
    <DropdownMenu>
      <DropdownMenuTrigger asChild>
        <Button
          aria-label="Theme"
          ref={buttonRef}
          variant="outline"
          size="icon"
          className="hover:cursor-pointer"
        >
          {renderIcon()}
        </Button>
      </DropdownMenuTrigger>

      <DropdownMenuContent align="end">
        <ThemeMenuItem
          value="light"
          icon={Sun}
          label="Light"
          theme={theme}
          animateThemeChange={animateThemeChange}
        />
        <ThemeMenuItem
          value="dark"
          icon={Moon}
          label="Dark"
          theme={theme}
          animateThemeChange={animateThemeChange}
        />
        <ThemeMenuItem
          value="system"
          icon={Laptop}
          label="System"
          theme={theme}
          animateThemeChange={animateThemeChange}
        />
      </DropdownMenuContent>
    </DropdownMenu>
  )
}
