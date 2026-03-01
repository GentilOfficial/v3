import {AnimatePresence, motion} from "framer-motion"
import Link from "next/link"
import Divider from "@/components/ui/Divider";

export function NavbarMobileMenu({routes, pathname, open, setOpen}) {
    const linkClass = (href) =>
        `transition duration-300 ${pathname === href ? "text-foreground/80" : "text-foreground/50 hover:text-foreground/80"}`

    return (
        <AnimatePresence initial={false}>
            {open && (
                <motion.div
                    key="mobile-menu"
                    initial={{height: 0, opacity: 0}}
                    animate={{height: "auto", opacity: 1}}
                    exit={{height: 0, opacity: 0}}
                    transition={{type: "tween", duration: 0.5, ease: [0.25, 0.5, 0.75, 1]}}
                    className="md:hidden overflow-hidden"
                >
                    <Divider className="mx-auto"/>
                    <div className="flex flex-col px-6 py-4 gap-4">
                        {routes.map((route) => (
                            <Link key={route.href} href={route.href} onClick={() => setOpen(false)}
                                  className={linkClass(route.href)}>
                                {route.name}
                            </Link>
                        ))}
                    </div>
                </motion.div>
            )}
        </AnimatePresence>
    )
}
