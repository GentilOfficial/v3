"use client"

import { useLanguage } from "@/providers/LanguageContext"
import { Button } from "@/components/ui/button"

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <Button
      size="xs"
      variant="ghost"
      onClick={() => setLang(lang === "en" ? "it" : "en")}
      className="hover:cursor-pointer"
    >
      {lang.toUpperCase()}
    </Button>
  )
}
