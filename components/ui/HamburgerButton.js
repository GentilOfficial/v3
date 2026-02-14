"use client"
import { motion } from "framer-motion"

export function HamburgerButton({ open, setOpen }) {
    return (
        <motion.button
            initial={false}
            animate={open ? "open" : "closed"}
            className="md:hidden relative size-6 hover:cursor-pointer"
            onClick={() => setOpen((prev) => !prev)}
        >
            <motion.span
                className="absolute top-0 left-0 w-full h-0.5 bg-foreground rounded"
                variants={{ closed: { rotate: 0, y: 6.5 }, open: { rotate: 45, y: 11 } }}
                transition={{ duration: 0.3 }}
            />
            <motion.span
                className="absolute bottom-0 left-0 w-full h-0.5 bg-foreground rounded"
                variants={{ closed: { rotate: 0, y: -6.5 }, open: { rotate: -45, y: -11 } }}
                transition={{ duration: 0.3 }}
            />
        </motion.button>
    )
}
