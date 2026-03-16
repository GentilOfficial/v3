"use client"
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from "@/components/ui/accordion"
import { SectionIntro } from "@/components/ui/SectionIntro"
import { faq } from "@/content/site"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { motion } from "motion/react"

const itemVariants = {
  hidden: { opacity: 0, y: 16, filter: "blur(4px)" },
  show: {
    opacity: 1,
    y: 0,
    filter: "blur(0px)",
    transition: { duration: 0.5, ease: [0.25, 0.75, 0.25, 1] },
  },
}

export default function FaqSection() {
  const { lang } = useLanguage()
  const localizedFaq = getLocalizedValue(faq, lang)
  const { title, subtitle, description, questions } = localizedFaq

  return (
    <section className="py-20 md:py-24" id="faq">
      <div className="grid grid-cols-1 md:grid-cols-2 gap-12 md:gap-24">
        <div className="flex flex-col gap-4 md:sticky md:top-32 md:self-start">
          <SectionIntro
            title={title}
            subtitle={subtitle}
            description={description}
            descriptionWidth="max-w-lg"
          />
        </div>

        <motion.div
          variants={{
            hidden: {},
            show: { transition: { staggerChildren: 0.07 } },
          }}
          initial="hidden"
          whileInView="show"
          viewport={{ once: true, margin: "-60px" }}
        >
          <Accordion
            type="single"
            collapsible
            className="flex flex-col gap-2 pb-5"
          >
            {questions.map((item, index) => (
              <motion.div key={index} variants={itemVariants}>
                <AccordionItem
                  value={`item-${index}`}
                  className="border last:border border-border rounded-xl px-4 bg-background backdrop-blur-sm data-[state=open]:bg-sidebar transition-colors duration-300"
                >
                  <AccordionTrigger className="text-sm font-medium text-left hover:no-underline py-4 cursor-pointer">
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


