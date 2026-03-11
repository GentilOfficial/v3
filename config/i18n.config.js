export const SUPPORTED_LOCALES = ["en", "it"]
export const DEFAULT_LOCALE = "en"

export function isLocale(value) {
  return typeof value === "string" && SUPPORTED_LOCALES.includes(value)
}
