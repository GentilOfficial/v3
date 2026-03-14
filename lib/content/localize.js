import { DEFAULT_LOCALE } from "@/config/i18n.config"

export function getLocalizedField(value, lang = DEFAULT_LOCALE) {
  if (value == null) return null
  if (typeof value === "string" || Array.isArray(value)) return value
  if (typeof value !== "object") return value

  if (Object.prototype.hasOwnProperty.call(value, lang)) {
    return value[lang]
  }

  if (Object.prototype.hasOwnProperty.call(value, DEFAULT_LOCALE)) {
    return value[DEFAULT_LOCALE]
  }

  const [firstValue] = Object.values(value)
  return firstValue ?? null
}

export function toArray(value) {
  return Array.isArray(value) ? value : []
}
