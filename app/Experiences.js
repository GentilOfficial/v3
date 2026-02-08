"use client"

import { Timeline, Text, Badge } from "@mantine/core"
import { motion } from "motion/react"
import dayjs from "dayjs"
import relativeTime from "dayjs/plugin/relativeTime"
import "dayjs/locale/en"
import { useLanguage } from "./providers/LanguageContext"

dayjs.extend(relativeTime)
dayjs.locale("en")

function formatDate(date) {
  return date ? dayjs(date).format("MMM YYYY") : "Present"
}

export default function Experiences({ experiences }) {
  const { lang } = useLanguage()

  const MotionTimelineItem = motion.create(Timeline.Item)

  return (
    <div className="min-h-screen bg-zinc-50">
      <main className="mx-auto max-w-3xl px-4 py-12">
        <Text fw={700} size="lg" mb="md">
          {lang === "en" ? "Work Experiences" : "Esperienze Lavorative"}
        </Text>
        <Timeline color="lime" active={0} lineWidth={2} bulletSize={18}>
          {experiences.map((experience, index) => (
            <MotionTimelineItem
              key={index}
              title={experience.title[lang]}
              initial={{ opacity: 0, y: 30 }}
              whileInView={{ opacity: 1, y: 0 }}
              transition={{
                duration: 0.6,
                ease: "easeOut",
                delay: index * 0.1,
              }}
              viewport={{ once: true }}
            >
              <Badge
                variant="gradient"
                gradient={{ from: "orange", to: "yellow", deg: 275 }}
                size="xs"
              >
                {experience.company} · {experience.location[lang]}
              </Badge>

              <Text c="dimmed" size="sm">
                {experience.description}
              </Text>

              <Text size="xs" mt={4}>
                {formatDate(experience.started_at)} -{" "}
                {formatDate(experience.ended_at)}
              </Text>
            </MotionTimelineItem>
          ))}
        </Timeline>
      </main>
    </div>
  )
}
