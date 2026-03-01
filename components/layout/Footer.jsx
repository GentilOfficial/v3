"use client"
import Link from "next/link"
import Image from "next/image"
import routes from "@/config/routes.config"
import {footer, layout} from "@/config/content.config"
import {motion} from "motion/react"

const colVariants = {
    hidden: {},
    show: {transition: {staggerChildren: 0.06}},
}

const rowItem = {
    hidden: {opacity: 0, y: 10, filter: "blur(4px)"},
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 0.4, ease: [0.25, 0.75, 0.25, 1]},
    },
}

export function Footer() {
    const {tagline, socials, stat} = footer
    const {title: footerBottomTitle} = layout

    return (
        <footer className="border-t border-border bg-background/60 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
                    <motion.div
                        initial={{opacity: 0, y: 20, filter: "blur(6px)"}}
                        whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, ease: [0.25, 0.75, 0.25, 1]}}
                        className="flex flex-col gap-5 lg:col-span-1"
                    >
                        <Image
                            width={1024}
                            height={1024}
                            src="/logo.png"
                            className="size-12"
                            alt="logo"
                        />
                        <p className="text-sm text-foreground/50 whitespace-pre-line leading-relaxed">
                            {tagline}
                        </p>
                    </motion.div>
                    <motion.div
                        variants={colVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: true}}
                        className="flex flex-col gap-4"
                    >
                        <motion.span variants={rowItem} className="text-sm font-semibold">
                            Pages
                        </motion.span>
                        <ul className="flex flex-col gap-2.5">
                            {routes.map((route, index) => (
                                <motion.li key={`route-${index}`} variants={rowItem}>
                                    <Link
                                        href={route.href}
                                        className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                                    >
                                        {route.name}
                                    </Link>
                                </motion.li>
                            ))}
                        </ul>
                    </motion.div>
                    <motion.div
                        variants={colVariants}
                        initial="hidden"
                        whileInView="show"
                        viewport={{once: true}}
                        className="flex flex-col gap-4"
                    >
                        <motion.span variants={rowItem} className="text-sm font-semibold">
                            Social
                        </motion.span>
                        <ul className="flex flex-col gap-2.5">
                            {socials.map((social) => {
                                const Icon = social.icon
                                return (
                                    <motion.li key={social.label} variants={rowItem}>
                                        <Link
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200 group w-fit"
                                        >
                                            <Icon
                                                className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px"/>
                                            {social.label}
                                        </Link>
                                    </motion.li>
                                )
                            })}
                        </ul>
                    </motion.div>
                    <motion.div
                        initial={{opacity: 0, y: 20, filter: "blur(6px)"}}
                        whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, ease: [0.25, 0.75, 0.25, 1], delay: 0.2}}
                        className="flex flex-col gap-3"
                    >
                        <span className="text-sm font-semibold">Stats</span>
                        <div
                            className="rounded-xl border border-border bg-background/60 backdrop-blur-sm p-3 flex flex-col gap-1">
                            <span className="text-sm text-foreground/50">{stat.label}:</span>
                            <span
                                className="text-xl font-bold bg-linear-to-r from-[#D22F27] to-[#E27022] bg-clip-text text-transparent">
                                {stat.value}
                            </span>
                        </div>
                    </motion.div>

                </div>
                <motion.div
                    initial={{opacity: 0}}
                    whileInView={{opacity: 1}}
                    viewport={{once: true}}
                    transition={{duration: 0.6, delay: 0.3}}
                    className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3"
                >
                    <span className="font-mono text-xs text-foreground/25 uppercase tracking-widest">
                        {footerBottomTitle}
                    </span>
                    <span className="font-mono text-xs text-foreground/25 uppercase tracking-widest">
                        Built with Next.js
                    </span>
                </motion.div>

            </div>
        </footer>
    )
}