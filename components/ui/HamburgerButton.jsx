"use client"
import {motion} from "framer-motion"
import {Button} from "@/components/ui/button";

export function HamburgerButton({open, setOpen}) {
    return (
        <Button
            size="icon"
            variant="outline"
            className="md:hidden hover:cursor-pointer"
            title="Toggle navigation links"
            onClick={() => setOpen((prev) => !prev)}
        >
            <motion.div
                initial={false}
                animate={open ? "open" : "closed"}
                className="relative size-6"
            >
                <motion.span
                    className="absolute top-0 left-1/6 w-2/3 h-0.5 bg-foreground rounded"
                    variants={{closed: {rotate: 0, y: 6.5}, open: {rotate: 45, y: 11}}}
                    transition={{duration: 0.3}}
                />
                <motion.span
                    className="absolute bottom-0 left-1/6 w-2/3 h-0.5 bg-foreground rounded"
                    variants={{closed: {rotate: 0, y: -6.5}, open: {rotate: -45, y: -11}}}
                    transition={{duration: 0.3}}
                />
            </motion.div>
        </Button>
    )
}
