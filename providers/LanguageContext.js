"use client"

import { DEFAULT_LOCALE, isLocale } from "@/config/i18n.config"
import { getLocaleFromPathname } from "@/lib/i18n"
import { usePathname } from "next/navigation"
import { createContext, useContext, useMemo, useState } from "react"

const LanguageContext = createContext(undefined)

export function LanguageProvider({ children, initialLang = DEFAULT_LOCALE }) {
  const pathname = usePathname()
  const safeInitialLang = isLocale(initialLang) ? initialLang : DEFAULT_LOCALE
  const [langState, setLangState] = useState(safeInitialLang)
  const pathnameLang = getLocaleFromPathname(pathname)
  const lang = pathnameLang ?? langState

  const setLang = (nextLang) => {
    if (!isLocale(nextLang)) return
    setLangState(nextLang)
  }

  const value = useMemo(() => ({ lang, setLang }), [lang])

  return (
    <LanguageContext.Provider value={value}>
      {children}
    </LanguageContext.Provider>
  )
}

export function useLanguage() {
  const context = useContext(LanguageContext)
  if (!context)
    throw new Error("useLanguage must be used within a LanguageProvider")
  return context
}
