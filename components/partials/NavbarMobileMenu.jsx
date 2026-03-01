import {AnimatePresence, motion} from "motion/react"
import Link from "next/link"
import Divider from "@/components/ui/Divider"
import {cn} from "@/lib/utils"

export function NavbarMobileMenu({routes, pathname, open, setOpen}) {
    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="mobile-menu"
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{type: "tween", duration: 0.4, ease: [0.25, 0.5, 0.75, 1]}}
                    className="md:hidden overflow-hidden"
                >
                    <Divider className="mx-auto"/>
                    <nav className="flex flex-col px-6 py-4 gap-1">
                        {routes.map((route, i) => {
                            const isActive = pathname === route.href
                            return (
                                <motion.div
                                    key={route.href}
                                    initial={{x: -12, opacity: 0}}
                                    animate={{x: 0, opacity: 1}}
                                    transition={{delay: i * 0.06, duration: 0.3, ease: [0.25, 0.75, 0.25, 1]}}
                                >
                                    <Link
                                        href={route.href}
                                        onClick={() => setOpen(false)}
                                        className={cn(
                                            "flex items-center gap-3 py-2.5 text-sm transition-colors duration-300",
                                            isActive
                                                ? "text-foreground"
                                                : "text-foreground/50 hover:text-foreground/80"
                                        )}
                                    >
                                        {isActive && (
                                            <motion.span
                                                layoutId="mobile-nav-active"
                                                className="h-4 w-px bg-linear-to-b rounded-full from-[#D22F27] to-[#E27022]"
                                                transition={{type: "spring", stiffness: 380, damping: 32}}
                                            />
                                        )}
                                        {route.name}
                                    </Link>
                                </motion.div>
                            )
                        })}
                    </nav>
                </motion.div>
            )}
        </AnimatePresence>
    )
}