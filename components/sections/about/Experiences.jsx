"use client"

import { useLanguage } from "@/providers/LanguageContext"
import dayjs from "dayjs"
import "dayjs/locale/en"
import "dayjs/locale/it"
import relativeTime from "dayjs/plugin/relativeTime"
import { motion } from "motion/react"
import Image from "next/image"

dayjs.extend(relativeTime)

function formatDate(date, lang) {
  if (!date) {
    return lang === "it" ? "Presente" : "Present"
  }

  return dayjs(date).locale(lang).format("MMM YYYY")
}

export default function Experiences({ experiences }) {
  const { lang } = useLanguage()

  return experiences.map((experience, index) => (
    <motion.div
      key={index}
      initial={{ opacity: 0, y: 30, x: -30 }}
      whileInView={{ opacity: 1, y: 0, x: 0 }}
      transition={{
        duration: 0.6,
        ease: "easeInOut",
        delay: index * 0.1,
      }}
      viewport={{ once: true }}
    >
      <h2 className="text-2xl uppercase tracking-wide">
        {experience.title?.[lang] ?? experience.title?.en ?? experience.title}
      </h2>

      <p className="font-semibold text-sm">
        {experience.company} -{" "}
        {experience.location?.[lang] ??
          experience.location?.en ??
          experience.location}
      </p>

      <h2 className="text-xl font-bold">{experience.description}</h2>

      <p className="text-sm text-gray-500">
        {formatDate(experience.started_at, lang)} -{" "}
        {formatDate(experience.ended_at, lang)}
      </p>

      {experience.company_icon_url && (
        <Image
          src={experience.company_icon_url}
          alt={`${experience.company} logo`}
          width={64}
          height={64}
          className="size-12"
        />
      )}
    </motion.div>
  ))
}
