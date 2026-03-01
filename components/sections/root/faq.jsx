"use client"
import {faq} from "@/config/content.config"
import {Accordion, AccordionContent, AccordionItem, AccordionTrigger} from "@/components/ui/accordion"
import {motion} from "motion/react"

const itemVariants = {
    hidden: {opacity: 0, y: 16, filter: "blur(4px)"},
    show: {
        opacity: 1,
        y: 0,
        filter: "blur(0px)",
        transition: {duration: 0.5, ease: [0.25, 0.75, 0.25, 1]},
    },
}

export default function FAQ() {
    const {title, subtitle, description, questions} = faq

    return (
        <section className="py-24" id="faq">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">

                <div className="flex flex-col gap-4 md:sticky md:top-32 md:self-start">
                    <motion.h2
                        initial={{opacity: 0, y: 24, filter: "blur(6px)"}}
                        whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, ease: [0.25, 0.75, 0.25, 1]}}
                        className="text-3xl sm:text-4xl xl:text-5xl"
                    >
                        <span className="block">{title}</span>
                        <span className="text-foreground/50">{subtitle}</span>
                    </motion.h2>
                    <motion.p
                        initial={{opacity: 0, y: 18, filter: "blur(4px)"}}
                        whileInView={{opacity: 1, y: 0, filter: "blur(0px)"}}
                        viewport={{once: true}}
                        transition={{duration: 0.6, ease: [0.25, 0.75, 0.25, 1], delay: 0.15}}
                        className="text-foreground/50 text-sm max-w-lg"
                    >
                        {description}
                    </motion.p>
                </div>

                <motion.div
                    variants={{hidden: {}, show: {transition: {staggerChildren: 0.07}}}}
                    initial="hidden"
                    whileInView="show"
                    viewport={{once: true, margin: "-60px"}}
                >
                    <Accordion type="single" collapsible className="flex flex-col gap-2 pb-5">
                        {questions.map((item, index) => (
                            <motion.div key={index} variants={itemVariants}>
                                <AccordionItem
                                    value={`item-${index}`}
                                    className="border last:border border-border rounded-xl px-4 bg-background backdrop-blur-sm data-[state=open]:bg-sidebar transition-colors duration-300"
                                >
                                    <AccordionTrigger
                                        className="text-sm font-medium text-left hover:no-underline py-4 cursor-pointer">
                                        {item.question}
                                    </AccordionTrigger>
                                    <AccordionContent className="text-sm text-foreground/50 pb-4">
                                        {item.answer}
                                    </AccordionContent>
                                </AccordionItem>
                            </motion.div>
                        ))}
                    </Accordion>
                </motion.div>
            </div>
        </section>
    )
}