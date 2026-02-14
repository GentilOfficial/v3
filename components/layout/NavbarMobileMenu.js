"use client"
import { useRef, useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Link from "next/link"

export function NavbarMobileMenu({ routes, pathname, open, setOpen }) {
    const containerRef = useRef(null)
    const [height, setHeight] = useState(0)

    useEffect(() => {
        if (containerRef.current) {
            setHeight(containerRef.current.scrollHeight)
        }
    }, [routes, open])

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="mobile-menu"
                    initial={{ height: 0, opacity: 0 }}
                    animate={{ height: height, opacity: 1 }}
                    exit={{ height: 0, opacity: 0 }}
                    transition={{
                        type: "tween",
                        duration: 0.5,
                        ease: "easeInOut",
                    }}
                    className="md:hidden overflow-hidden"
                >
                    <div className="h-px w-4/5 mx-auto bg-gradient-to-r from-foreground/0 via-foreground/10 to-foreground/0"></div>
                    <div ref={containerRef} className="flex flex-col px-6 py-4 gap-4">
                        {routes.map((route, index) => (
                            <Link
                                href={route.href}
                                key={index}
                                onClick={() => setOpen(false)}
                                className={`
                                  ${pathname === route.href
                                                    ? "text-foreground/80"
                                                    : "text-foreground/50 hover:text-foreground/80"}
                                  transition duration-300
                                `}
                            >
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
