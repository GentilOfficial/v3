"use client"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function NavbarMobileMenu({ routes, pathname, open, setOpen }) {
    const linkClass = (href) =>
        `transition duration-300 ${pathname === href ? "text-foreground/80" : "text-foreground/50 hover:text-foreground/80"}`

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="mobile-menu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: "auto", opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{ type: "tween", duration: 0.5, ease: "easeInOut" }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="h-px w-4/5 mx-auto bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0"></div>
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {routes.map((route) => (
                            <Link key={route.href} href={route.href} onClick={() => setOpen(false)} className={linkClass(route.href)}>
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
