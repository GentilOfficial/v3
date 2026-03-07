import { DEFAULT_LOCALE, isLocale } from "@/config/i18n.config"

const EXTERNAL_HREF_RE = /^(?:[a-z]+:)?\/\//i

export function getLocaleFromPathname(pathname = "/") {
  const [firstSegment] = pathname.split("/").filter(Boolean)
  return isLocale(firstSegment) ? firstSegment : null
}

export function stripLocaleFromPathname(pathname = "/") {
  const normalizedPath = pathname.startsWith("/") ? pathname : `/${pathname}`
  const segments = normalizedPath.split("/").filter(Boolean)

  if (!segments.length) return "/"
  if (!isLocale(segments[0])) return normalizedPath

  const nextPath = segments.slice(1).join("/")
  return nextPath ? `/${nextPath}` : "/"
}

export function localizePath(pathname = "/", lang = DEFAULT_LOCALE) {
  if (!pathname) return lang === DEFAULT_LOCALE ? "/" : `/${lang}`
  if (
    EXTERNAL_HREF_RE.test(pathname) ||
    pathname.startsWith("mailto:") ||
    pathname.startsWith("tel:")
  ) {
    return pathname
  }
  if (pathname.startsWith("#")) return pathname

  const [pathPart, hashPart] = pathname.split("#")
  const normalizedPath = pathPart.startsWith("/") ? pathPart : `/${pathPart}`
  const pathWithoutLocale = stripLocaleFromPathname(normalizedPath)
  const localizedPath =
    lang === DEFAULT_LOCALE
      ? pathWithoutLocale
      : pathWithoutLocale === "/"
        ? `/${lang}`
        : `/${lang}${pathWithoutLocale}`

  return hashPart ? `${localizedPath}#${hashPart}` : localizedPath
}

export function localizeHref(href, lang = DEFAULT_LOCALE) {
  if (typeof href === "string") {
    return localizePath(href, lang)
  }

  if (href && typeof href === "object" && typeof href.pathname === "string") {
    return {
      ...href,
      pathname: localizePath(href.pathname, lang),
    }
  }

  return href
}

export function getLocalizedValue(value, lang = DEFAULT_LOCALE) {
  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.prototype.hasOwnProperty.call(value, lang)
  ) {
    return value[lang]
  }

  if (
    value &&
    typeof value === "object" &&
    !Array.isArray(value) &&
    Object.prototype.hasOwnProperty.call(value, DEFAULT_LOCALE)
  ) {
    return value[DEFAULT_LOCALE]
  }

  return value
}

export function getLocalizedRoutes(routesByLocale, lang = DEFAULT_LOCALE) {
  const routes = getLocalizedValue(routesByLocale, lang) ?? []

  return routes.map((route) => ({
    ...route,
    href: localizePath(route.href, lang),
    items:
      route.items?.map((item) => ({
        ...item,
        href: localizePath(item.href, lang),
      })) ?? [],
  }))
}

export function normalizePathname(pathname = "/") {
  if (!pathname || pathname === "/") return "/"
  return pathname.endsWith("/") ? pathname.slice(0, -1) : pathname
}
