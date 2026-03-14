import { DEFAULT_LOCALE, isLocale } from "@/config/i18n.config"
import { headers } from "next/headers"

export async function getCurrentLang() {
  const requestHeaders = await headers()
  const headerLang = requestHeaders.get("x-lang")

  return isLocale(headerLang) ? headerLang : DEFAULT_LOCALE
}
