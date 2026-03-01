"use client"
import {techStack} from "@/config/content.config";
import SpotlightCard from "@/components/ui/SpotlightCard";
import Divider from "@/components/ui/Divider";
import {motion} from "motion/react";

export default function TechStack() {
    const {title, subtitle, description, tools} = techStack

    return (
        <section className="flex min-h-180 flex-col items-center py-12">
            <div className="flex flex-col gap-4 mb-12">
                <motion.h2
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5, ease: [0.25, 0.75, 0.25, 1]}}
                    className="text-3xl sm:text-4xl xl:text-5xl text-center"
                >
                    <span className="block">{title}</span>
                    <span className="text-foreground/50">{subtitle}</span>
                </motion.h2>
                <motion.p
                    initial={{opacity: 0, y: 18}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5, ease: [0.25, 0.75, 0.25, 1], delay: 0.15}}
                    className="text-foreground/50 text-center text-sm max-w-xl mx-auto"
                >
                    {description}
                </motion.p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4">
                {tools.map((tool, index) => {
                    const Icon = tool.icon.node;
                    const isFill = tool.icon.fill;
                    return (
                        <motion.div
                            key={`tool-${index}`}
                            initial={{opacity: 0, y: 20}}
                            whileInView={{opacity: 1, y: 0}}
                            viewport={{once: true}}
                            transition={{
                                duration: 0.5,
                                ease: [0.25, 0.75, 0.25, 1],
                                delay: index * 0.15,
                            }}
                        >
                            <SpotlightCard
                                spotlightColor="rgba(255, 105, 0, 0.15)"
                                className="flex flex-col gap-1 h-full"
                            >
                                <div
                                    className={`rounded-md border border-border size-9 shrink-0 flex items-center justify-center overflow-hidden ${isFill ? "p-0" : "p-0.5"}`}
                                    style={{background: tool.icon.bg, color: tool.icon.color}}
                                >
                                    <Icon className={isFill ? "size-3/4 rounded-sm" : "size-3/4"}/>
                                </div>
                                <div>
                                    <h3 className="font-bold text-base">{tool.title}</h3>
                                    <span className="text-xs text-foreground/40">{tool.tag}</span>
                                </div>
                                <Divider/>
                                <p className="text-sm text-foreground/50 leading-relaxed mt-auto">
                                    {tool.description}
                                </p>
                            </SpotlightCard>
                        </motion.div>
                    )
                })}
            </div>
        </section>
    );
}