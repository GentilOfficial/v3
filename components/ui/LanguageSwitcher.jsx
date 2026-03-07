"use client"

import { Button } from "@/components/ui/button"
import { localizePath } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { usePathname, useRouter, useSearchParams } from "next/navigation"

export function LanguageSwitcher() {
  const { lang, setLang } = useLanguage()
  const router = useRouter()
  const pathname = usePathname()
  const searchParams = useSearchParams()

  const handleSwitch = () => {
    const nextLang = lang === "en" ? "it" : "en"
    const localizedPath = localizePath(pathname ?? "/", nextLang)
    const query = searchParams.toString()
    const hash = typeof window !== "undefined" ? window.location.hash : ""
    const nextUrl = `${localizedPath}${query ? `?${query}` : ""}${hash}`

    setLang(nextLang)
    router.push(nextUrl)
  }

  return (
    <Button
      size="icon"
      variant="outline"
      onClick={handleSwitch}
      className="hover:cursor-pointer"
    >
      {lang.toUpperCase()}
    </Button>
  )
}
