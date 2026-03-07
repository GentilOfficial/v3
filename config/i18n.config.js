export const SUPPORTED_LOCALES = ["en", "it"]
export const DEFAULT_LOCALE = "en"
export const LANGUAGE_COOKIE_NAME = "lang"

export function isLocale(value) {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value)
}
