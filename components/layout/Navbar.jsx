"use client"
import {motion, useScroll} from "framer-motion"
import {LanguageSwitcher} from "@/components/ui/LanguageSwitcher"
import {useEffect, useState} from "react"
import Image from "next/image"
import logo from "@/public/logo.png"
import routes from "@/config/routes.config"
import Link from "next/link"
import {HamburgerButton} from "@/components/ui/HamburgerButton"
import {usePathname} from "next/navigation"
import {NavbarMobileMenu} from "../partials/NavbarMobileMenu"
import {ThemeToggle} from "@/components/ui/ThemeToggle"

const navVariants = {
    visible: {y: 0},
    hidden: {y: "-100%"},
}

export default function Navbar() {
    const {scrollY} = useScroll()
    const [hidden, setHidden] = useState(false)
    const [open, setOpen] = useState(false)
    const pathname = usePathname()

    useEffect(() => {
        let prevY = 0
        const unsubscribe = scrollY.on("change", (latest) => {
            if (!open) {
                setHidden(latest > prevY && prevY > 10)
            }
            prevY = latest
        })
        return () => unsubscribe()
    }, [scrollY, open])

    const linkClass = (href) =>
        `transition duration-300 ${
            pathname === href ? "text-foreground/80" : "text-foreground/50 hover:text-foreground/80"
        }`

    return (
        <motion.nav
            className="fixed top-0 w-full z-50"
            variants={navVariants}
            animate={hidden ? "hidden" : "visible"}
            transition={{duration: 0.5, ease: [0.25, 0.5, 0.25, 1]}}
        >
            <motion.div
                initial={{backdropFilter: "blur(8px)"}}
                animate={{backdropFilter: hidden ? "blur(0px)" : "blur(8px)"}}
                transition={{duration: 0.1}}
                className={`relative border-b border-foreground/5 shadow shadow-foreground/5 transition duration-300 md:bg-background/30 ${
                    open ? "bg-background/80" : "bg-background/30"
                }`}
            >
                <div className="flex items-center justify-between max-w-7xl mx-auto py-4 px-6">
                    <div className="flex items-center gap-6">
                        <Image src={logo} alt="Federico Gentili" width={1024} height={1024} className="size-10"
                               loading="eager"/>
                        <div
                            className="hidden md:block h-8 w-px mx-auto bg-linear-to-b from-foreground/0 via-foreground/20 to-foreground/0"></div>
                        <div className="hidden md:flex gap-8">
                            {routes.map((route) => (
                                <Link key={route.href} href={route.href} className={linkClass(route.href)}>
                                    {route.name}
                                </Link>
                            ))}
                        </div>
                    </div>
                    <div className="flex items-center gap-4">
                        <LanguageSwitcher/>
                        <ThemeToggle/>
                        <HamburgerButton open={open} setOpen={setOpen}/>
                    </div>
                </div>
                <NavbarMobileMenu routes={routes} pathname={pathname} open={open} setOpen={setOpen}/>
            </motion.div>
        </motion.nav>
    )
}
