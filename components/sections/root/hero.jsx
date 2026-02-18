"use client"
import {useRef} from "react";
import hero from "@/config/content.config";
import routes from "@/config/routes.config";
import {AnimatedSpan, Terminal, TypingAnimation} from "@/components/ui/terminal";
import {motion, useInView} from "motion/react";

export default function Hero() {
    const {terminal, title, secondTitle, description} = hero;
    const titleRef = useRef(null);
    const secondTitleRef = useRef(null);
    const descriptionRef = useRef(null);
    const terminalRef = useRef(null);

    const titleInView = useInView(titleRef, {once: true});
    const secondTitleInView = useInView(secondTitleRef, {once: true});
    const descriptionInView = useInView(descriptionRef, {once: true});
    const terminalInView = useInView(terminalRef, {once: true});

    const variants = {
        hidden: {opacity: 0},
        visible: {opacity: 1}
    };

    return (
        <div className="flex flex-col lg:flex-row gap-4 min-h-180">
            <div className="flex flex-col gap-8 flex-1">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
                    <motion.span
                        ref={titleRef}
                        initial="hidden"
                        animate={titleInView ? "visible" : "hidden"}
                        variants={variants}
                        transition={{duration: 0.5, ease: "easeOut"}}
                        className="block"
                    >
                        {title}
                    </motion.span>
                    <motion.span
                        ref={secondTitleRef}
                        initial="hidden"
                        animate={secondTitleInView ? "visible" : "hidden"}
                        variants={variants}
                        transition={{duration: 0.5, ease: "easeOut", delay: 0.2}}
                    >
                        {secondTitle}
                    </motion.span>
                </h1>
                <motion.p
                    ref={descriptionRef}
                    initial="hidden"
                    animate={descriptionInView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{duration: 0.5, ease: "easeOut", delay: 0.5}}
                    className="text-muted-foreground max-w-4/5"
                >
                    {description}
                </motion.p>
            </div>

            <div className="flex-1 flex items-start justify-center lg:justify-end">
                <motion.div
                    ref={terminalRef}
                    initial="hidden"
                    animate={terminalInView ? "visible" : "hidden"}
                    variants={variants}
                    transition={{duration: 0.5, ease: "easeOut", delay: 0.5}}
                    className="max-w-lg w-full h-fit"
                >
                    <Terminal>
                        <TypingAnimation>{terminal.command}</TypingAnimation>

                        {terminal.output.map((line, i) => (
                            <AnimatedSpan key={i}>{line}</AnimatedSpan>
                        ))}

                        {routes.map((route, i) => (
                            <AnimatedSpan key={`route-${i}`}>
                                {i === 0 ? "┌" : i === routes.length - 1 ? "└" : "├"} ○ {route.href}
                            </AnimatedSpan>
                        ))}

                        <AnimatedSpan></AnimatedSpan>
                        <TypingAnimation>{terminal.success}</TypingAnimation>
                    </Terminal>
                </motion.div>
            </div>
        </div>
    );
}
