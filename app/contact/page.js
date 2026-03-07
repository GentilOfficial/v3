"use client"

import { useLanguage } from "@/providers/LanguageContext"

const copy = {
  en: "Contact",
  it: "Contatti",
}

export default function Contact() {
  const { lang } = useLanguage()

  return <h1>{copy[lang] ?? copy.en}</h1>
}
