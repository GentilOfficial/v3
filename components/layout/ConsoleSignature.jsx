"use client"

import { layout } from "@/content/site"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { useEffect } from "react"

export default function ConsoleSignature() {
  const { lang } = useLanguage()
  const localizedLayout = getLocalizedValue(layout, lang)

  useEffect(() => {
    console.log(
      `%c${localizedLayout.console.signature}`,
      "background:#1f1f1f;color:#f1f1f1;padding:2px 6px;border-radius:6px",
    )
  }, [localizedLayout.console.signature])

  return null
}
