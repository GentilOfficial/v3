"use client"
import {motion, useScroll, useSpring} from "motion/react"
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher"
import {useEffect, useRef, useState} from "react"
import Logo from "@/public/logo.svg"
import routes from "@/config/routes.config"
import Link from "next/link"
import {HamburgerButton} from "@/components/ui/HamburgerButton"
import {usePathname} from "next/navigation"
import {NavbarMobileMenu} from "../partials/NavbarMobileMenu"
import {ThemeToggle} from "@/components/ui/ThemeToggle"
import Divider from "@/components/ui/Divider"
import {cn} from "@/lib/utils"

const navVariants = {
    visible: {y: 0},
    hidden: {y: "-100%"},
}

export default function Navbar() {
    const {scrollY, scrollYProgress} = useScroll()
    const [hidden, setHidden] = useState(false)
    const [scrolled, setScrolled] = useState(false)
    const [open, setOpen] = useState(false)
    const [dropdownOpen, setDropdownOpen] = useState(false)
    const pathname = usePathname()
    const navRef = useRef(null)

    const scaleX = useSpring(scrollYProgress, {
        stiffness: 200,
        damping: 30,
        restDelta: 0.001,
    })

    useEffect(() => {
        scaleX.set(0)
    }, [pathname]) // eslint-disable-line react-hooks/exhaustive-deps

    useEffect(() => {
        let prevY = 0
        const unsubscribe = scrollY.on("change", (latest) => {
            if (!open && !dropdownOpen) setHidden(latest > prevY && prevY > 60)
            setScrolled(latest > 10)
            prevY = latest
        })
        return () => unsubscribe()
    }, [scrollY, open, dropdownOpen])

    useEffect(() => {
        const handleClickOutside = (e) => {
            if (open && navRef.current && !navRef.current.contains(e.target)) {
                setOpen(false)
            }
        }
        document.addEventListener("pointerdown", handleClickOutside)
        return () => document.removeEventListener("pointerdown", handleClickOutside)
    }, [open])

    return (
        <motion.header
            ref={navRef}
            className="fixed top-0 w-full z-50"
            variants={navVariants}
            animate={hidden ? "hidden" : "visible"}
            transition={{duration: 0.5, ease: [0.25, 0.5, 0.25, 1]}}
        >
            <div
                className={cn(
                    "relative border-b transition-colors duration-500",
                    "shadow shadow-foreground/5",
                    scrolled
                        ? "border-foreground/8 bg-background/60 backdrop-blur-md"
                        : "border-transparent bg-background/20 backdrop-blur-sm",
                    open && "bg-background/80 backdrop-blur-md"
                )}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
                    <div className="flex items-center gap-6">
                        <Link href="/" aria-label="Federico Gentili — Home">
                            <Logo className="size-8 transition-opacity duration-200 hover:opacity-70"/>
                        </Link>
                        <Divider position="vertical" className="hidden md:block"/>
                        <nav className="hidden md:flex gap-8">
                            {routes.map((route) => {
                                const isActive = pathname === route.href
                                return (
                                    <Link
                                        key={route.href}
                                        href={route.href}
                                        className={cn(
                                            "relative py-0.5 text-sm transition-colors duration-300",
                                            isActive
                                                ? "text-foreground"
                                                : "text-foreground/50 hover:text-foreground/80"
                                        )}
                                    >
                                        {route.name}
                                        {isActive && (
                                            <motion.span
                                                layoutId="nav-active"
                                                className="absolute inset-x-0 -bottom-0.5 h-px bg-foreground/60"
                                                transition={{type: "spring", stiffness: 380, damping: 32}}
                                            />
                                        )}
                                    </Link>
                                )
                            })}
                        </nav>
                    </div>

                    <div className="flex items-center gap-4">
                        <LanguageSwitcher/>
                        <ThemeToggle onOpenChange={setDropdownOpen}/>
                        <HamburgerButton open={open} setOpen={setOpen}/>
                    </div>
                </div>

                <NavbarMobileMenu
                    routes={routes}
                    pathname={pathname}
                    open={open}
                    setOpen={setOpen}
                />
                <motion.div
                    style={{scaleX}}
                    className="absolute -bottom-px left-0 right-0 h-px origin-left bg-linear-to-r from-[#D22F27] to-[#E27022]"
                />
            </div>
        </motion.header>
    )
}