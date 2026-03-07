"use client"

import { useLanguage } from "@/providers/LanguageContext"

const copy = {
  en: "Projects",
  it: "Progetti",
}

export default function Projects() {
  const { lang } = useLanguage()

  return <h1>{copy[lang] ?? copy.en}</h1>
}
