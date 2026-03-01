"use client"
import {useRef} from "react";
import {hero} from "@/config/content.config";
import routes from "@/config/routes.config";
import {motion, useInView} from "motion/react";
import GradientText from "@/components/ui/GradientText";
import dynamic from "next/dynamic";
import BlurText from "@/components/ui/BlurText";
import Divider from "@/components/ui/Divider";

const TechStackLoop = dynamic(() => import("@/components/partials/TechStackLoop"));
const Terminal = dynamic(() => import("@/components/ui/terminal").then((mod) => mod.Terminal));
const TypingAnimation = dynamic(() => import("@/components/ui/terminal").then((mod) => mod.TypingAnimation));
const AnimatedSpan = dynamic(() => import("@/components/ui/terminal").then((mod) => mod.AnimatedSpan));

const ease = [0.25, 0.75, 0.25, 1];

const fadeUp = (delay = 0) => ({
    initial: {opacity: 0, y: 28, filter: "blur(8px)"},
    animate: {opacity: 1, y: 0, filter: "blur(0px)"},
    transition: {duration: 0.9, ease, delay},
});

export default function Hero() {
    const {title, subtitle, description, terminal, techStackIcons} = hero;
    const terminalRef = useRef(null);
    const terminalInView = useInView(terminalRef, {once: true});

    return (
        <section className="relative flex flex-col lg:flex-row gap-4 min-h-150 pb-16 lg:pb-0">
            <div className="flex flex-col gap-8 flex-1 text-center lg:text-start py-8">
                <motion.div
                    {...fadeUp(0)}
                    className="flex items-center gap-2 w-fit mx-auto lg:mx-0"
                >
                    <span className="relative flex size-2">
                        <span
                            className="absolute inline-flex h-full w-full animate-ping rounded-full bg-primary opacity-60"/>
                        <span className="relative inline-flex size-2 rounded-full bg-primary"/>
                    </span>
                    <span className="font-mono text-[11px] uppercase tracking-[0.2em] text-foreground/40">
                        Available for work
                    </span>
                </motion.div>

                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl leading-[1.08]">
                    <motion.span {...fadeUp(0.1)} className="block">
                        {title}
                    </motion.span>
                    <motion.span {...fadeUp(0.22)} className="block mt-1">
                        <GradientText
                            colors={["#E27022", "#D22F27", "#E27022"]}
                            animationSpeed={5}
                        >
                            {subtitle}
                        </GradientText>
                    </motion.span>
                </h1>

                <motion.p
                    {...fadeUp(0.36)}
                    className="text-foreground/60 mx-auto max-w-xl lg:mx-0"
                >
                    <BlurText
                        text={description}
                        delay={30}
                        animateBy="words"
                        direction="bottom"
                        className="justify-center lg:justify-start text-md lg:text-base"
                    />
                </motion.p>

                <motion.div
                    initial={{opacity: 0, scaleX: 0.4}}
                    animate={{opacity: 1, scaleX: 1}}
                    transition={{duration: 0.9, ease, delay: 0.48}}
                    style={{originX: 0}}
                >
                    <Divider className="mx-auto lg:mx-0"/>
                </motion.div>

                <motion.div {...fadeUp(0.56)}>
                    <TechStackLoop
                        icons={techStackIcons}
                        className="mx-auto lg:mx-0"
                    />
                </motion.div>
            </div>

            <div className="flex-1 flex items-start justify-center lg:justify-end">
                <motion.div
                    ref={terminalRef}
                    initial={{opacity: 0, y: 32, filter: "blur(10px)"}}
                    animate={
                        terminalInView
                            ? {opacity: 1, y: 0, filter: "blur(0px)"}
                            : {opacity: 0, y: 32, filter: "blur(10px)"}
                    }
                    transition={{duration: 1, ease, delay: 0.5}}
                    className="relative max-w-lg w-full"
                >
                    <div className="pointer-events-none absolute -inset-4 rounded-2xl blur-2xl -z-10 opacity-30"
                         style={{
                             background: "radial-gradient(ellipse at 60% 40%, rgba(226,112,34,0.15), transparent 70%)"
                         }}
                    />

                    <Terminal>
                        <TypingAnimation>{terminal.command}</TypingAnimation>

                        {terminal.output.map((line, i) => (
                            <AnimatedSpan key={i}>{line}</AnimatedSpan>
                        ))}

                        <AnimatedSpan>...</AnimatedSpan>

                        {routes.map((route, i) => (
                            <AnimatedSpan key={`route-${i}`}>
                                {i === 0 ? "┌" : i === routes.length - 1 ? "└" : "├"} ○ {route.href}
                            </AnimatedSpan>
                        ))}

                        <AnimatedSpan>...</AnimatedSpan>
                        <AnimatedSpan>{terminal.success}</AnimatedSpan>
                    </Terminal>
                </motion.div>
            </div>
        </section>
    );
}