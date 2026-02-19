"use client"
import {useRef} from "react";
import hero from "@/config/content.config";
import routes from "@/config/routes.config";
import {motion, useInView} from "motion/react";
import GradientText from "@/components/ui/GradientText";
import dynamic from "next/dynamic";

const TechStackLoop = dynamic(() => import("@/components/layout/TechStackLoop"), {
    ssr: false,
});

const Terminal = dynamic(() =>
    import("@/components/ui/terminal").then((mod) => mod.Terminal), {
    ssr: false,
});

const TypingAnimation = dynamic(() =>
    import("@/components/ui/terminal").then((mod) => mod.TypingAnimation), {
    ssr: false,
});

const AnimatedSpan = dynamic(() =>
    import("@/components/ui/terminal").then((mod) => mod.AnimatedSpan), {
    ssr: false,
});

export default function Hero() {
    const {title, secondTitle, description, terminal, techStackIcons} = hero;
    const terminalRef = useRef(null);

    const terminalInView = useInView(terminalRef, {once: true});

    return (
        <div className="flex flex-col lg:flex-row gap-4 min-h-150">
            <div className="flex flex-col gap-8 flex-1 text-center lg:text-start py-8">
                <h1 className="text-4xl sm:text-5xl md:text-6xl xl:text-7xl">
                    <motion.span
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, ease: [0.25, 0.75, 0.25, 1]}}
                        className="block"
                    >
                        {title}
                    </motion.span>
                    <motion.span
                        initial={{opacity: 0, y: 20}}
                        animate={{opacity: 1, y: 0}}
                        transition={{duration: 1, ease: [0.25, 0.75, 0.25, 1], delay: 0.15}}
                        className="block"
                    >
                        <GradientText
                            colors={["#417352", "#59aa5f", "#66bd67", "#59aa5f", "#417352"]}
                            animationSpeed={2}
                            showBorder
                            className="font-mono"
                        >
                            {secondTitle}
                        </GradientText>
                    </motion.span>
                </h1>
                <motion.p
                    initial={{opacity: 0, y: 20}}
                    animate={{opacity: 1, y: 0}}
                    transition={{duration: 1, ease: [0.25, 0.75, 0.25, 1], delay: 0.30}}
                    className="text-foreground/80 mx-auto max-w-xl lg:mx-0 font-mono"
                >
                    {description}
                </motion.p>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, ease: [0.25, 0.75, 0.25, 1], delay: 0.45}}
                    className="h-0.5 w-4/5 my-2 mx-auto lg:mx-0 bg-linear-to-r from-foreground/0 via-foreground/10 to-foreground/0"
                ></motion.div>
                <motion.div
                    initial={{opacity: 0}}
                    animate={{opacity: 1}}
                    transition={{duration: 1, ease: [0.25, 0.75, 0.25, 1], delay: 0.45}}
                >
                    <TechStackLoop
                        icons={techStackIcons}
                        className="mx-auto lg:mx-0"
                    />
                </motion.div>
            </div>

            <div className="flex-1 flex items-start justify-center lg:justify-end">
                <motion.div
                    ref={terminalRef}
                    initial="hidden"
                    animate={terminalInView ? "visible" : "hidden"}
                    variants={{
                        hidden: {opacity: 0},
                        visible: {opacity: 1}
                    }}
                    transition={{duration: 1, ease: [0.25, 0.75, 0.25, 1], delay: 0.5}}
                    className="max-w-lg w-full h-100"
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
