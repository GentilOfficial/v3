"use client";
import {Button} from "@/components/ui/button";
import Link from "next/link";
import Divider from "@/components/ui/Divider";
import {motion} from "motion/react";

const ease = [0.25, 0.75, 0.25, 1];

const container = {
    hidden: {},
    show: {
        transition: {
            staggerChildren: 0.1,
        },
    },
};

const item = {
    hidden: {y: 24, opacity: 0, filter: "blur(6px)"},
    show: {
        y: 0,
        opacity: 1,
        filter: "blur(0px)",
        transition: {duration: 0.6, ease},
    },
};

export default function NotFound() {
    return (
        <motion.div
            variants={container}
            initial="hidden"
            animate="show"
            className="flex flex-col items-center justify-center py-8 gap-6 text-center"
        >
            <motion.div variants={item} className="relative select-none">
                <motion.span
                    aria-hidden
                    animate={{
                        x: [0, -3, 4, -2, 3, 0],
                        y: [0, 2, -3, 1, -2, 0],
                        opacity: [0.5, 0.3, 0.6, 0.2, 0.5, 0.4],
                    }}
                    transition={{
                        duration: 3,
                        repeat: Infinity,
                        repeatType: "mirror",
                        ease: "linear",
                        times: [0, 0.2, 0.4, 0.6, 0.8, 1],
                    }}
                    className="absolute inset-0 block font-mono text-[clamp(5rem,16vw,11rem)] font-black leading-none tracking-tighter text-foreground pointer-events-none"
                >
                    404
                </motion.span>
                <span
                    className="block font-mono text-[clamp(5rem,16vw,11rem)] font-black leading-none tracking-tighter text-primary">
                    404
                </span>
            </motion.div>

            <motion.div
                variants={{
                    hidden: {opacity: 0, scaleX: 0.4},
                    show: {opacity: 1, scaleX: 1, transition: {duration: 0.9, ease}},
                }}
                style={{originX: "center"}}
                className="w-full"
            >
                <Divider className="mx-auto max-w-2/5"/>
            </motion.div>

            <motion.p variants={item} className="text-xs font-mono uppercase tracking-[0.3em] text-muted-foreground">
                Page not found
            </motion.p>

            <motion.p variants={item} className="max-w-sm text-sm text-foreground/50">
                The resource you&#39;re looking for has vanished into the void, or perhaps
                it never existed at all.
            </motion.p>

            <motion.div variants={item} className="mt-2">
                <Link href="/">
                    <Button className="font-mono text-xs tracking-widest uppercase hover:cursor-pointer">
                        ← Return Home
                    </Button>
                </Link>
            </motion.div>

            <motion.span variants={item}
                         className="font-mono text-xs tracking-widest text-foreground/15 uppercase select-none mt-6">
                ERR_NOT_FOUND
            </motion.span>
        </motion.div>
    );
}