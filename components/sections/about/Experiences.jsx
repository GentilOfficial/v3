"use client"

import { motion } from "motion/react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/en"
import { useLanguage } from "@/providers/LanguageContext"
import Image from "next/image";

dayjs.extend(relativeTime)
dayjs.locale("en")

function formatDate(date) {
  return date ? dayjs(date).format("MMM YYYY") : "Present"
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
        {experience.title[lang]}
      </h2>

      <p className="font-semibold text-sm">
        {experience.company} · {experience.location[lang]}
      </p>

      <h2 className="text-xl font-bold">{experience.description}</h2>

      <p className="text-sm text-gray-500">
        {formatDate(experience.started_at)} - {formatDate(experience.ended_at)}
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
