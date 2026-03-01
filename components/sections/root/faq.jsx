"use client"
import {faq} from "@/config/content.config"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion";
import {motion} from "motion/react";

export default function FAQ() {
    const {title, subtitle, description, questions} = faq;

    return (
        <section className="py-24" id="faq">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
                <div className="flex flex-col gap-4">
                    <motion.h2
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, ease: [0.25, 0.75, 0.25, 1]}}
                        className="text-3xl sm:text-4xl xl:text-5xl"
                    >
                        <span className="block">
                            {title}
                        </span>
                        <span className="text-foreground/50">
                            {subtitle}
                        </span>
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0, y: 24}}
                        whileInView={{opacity: 1, y: 0}}
                        viewport={{once: true}}
                        transition={{duration: 0.5, ease: [0.25, 0.75, 0.25, 1], delay: 0.30}}
                        className="text-foreground/50 text-sm max-w-lg"
                    >
                        {description}
                    </motion.p>
                </div>
                <motion.div
                    initial={{opacity: 0, y: 24}}
                    whileInView={{opacity: 1, y: 0}}
                    viewport={{once: true}}
                    transition={{duration: 0.5, ease: [0.25, 0.75, 0.25, 1], delay: 0.15}}
                >
                    <Accordion type="single" collapsible className="flex flex-col gap-2 pb-5 ">
                        {questions.map((item, index) => (
                            <AccordionItem
                                key={index}
                                value={`item-${index}`}
                                className="border last:border border-border rounded-xl px-4 bg-background/30 data-[state=open]:bg-background/80 backdrop-blur-md transition-colors"
                            >
                                <AccordionTrigger
                                    className="text-sm font-medium text-left hover:no-underline py-4 cursor-pointer">
                                    {item.question}
                                </AccordionTrigger>
                                <AccordionContent className="text-sm text-foreground/50 pb-4">
                                    {item.answer}
                                </AccordionContent>
                            </AccordionItem>
                        ))}
                    </Accordion>
                </motion.div>

            </div>
        </section>
    );
}