"use client"

import { useLanguage } from "@/app/providers/LanguageContext"

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()

  return (
    <div className="flex gap-2">
      <button
        className={`px-3 py-1 rounded ${lang === "en" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setLang("en")}
      >
        EN
      </button>
      <button
        className={`px-3 py-1 rounded ${lang === "it" ? "bg-blue-500 text-white" : "bg-gray-200"}`}
        onClick={() => setLang("it")}
      >
        IT
      </button>
    </div>
  )
}
