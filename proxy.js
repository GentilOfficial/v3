import {
  DEFAULT_LOCALE,
  isLocale,
  LANGUAGE_COOKIE_NAME,
} from "@/config/i18n.config"
import { NextResponse } from "next/server"

function resolveLocaleFromCookie(request) {
  const cookieLang = request.cookies.get(LANGUAGE_COOKIE_NAME)?.value
  return isLocale(cookieLang) ? cookieLang : DEFAULT_LOCALE
}

export function proxy(request) {
  const { pathname } = request.nextUrl
  const segments = pathname.split("/").filter(Boolean)
  const pathnameLocale = segments[0]

  if (isLocale(pathnameLocale)) {
    const rewriteUrl = request.nextUrl.clone()
    const pathWithoutLocale = `/${segments.slice(1).join("/")}`
    rewriteUrl.pathname = pathWithoutLocale === "/" ? "/" : pathWithoutLocale

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-lang", pathnameLocale)

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    })

    response.cookies.set(LANGUAGE_COOKIE_NAME, pathnameLocale, {
      path: "/",
      sameSite: "lax",
    })

    return response
  }

  const locale = resolveLocaleFromCookie(request)
  const redirectUrl = request.nextUrl.clone()
  redirectUrl.pathname =
    pathname === "/" ? `/${locale}` : `/${locale}${pathname}`

  const response = NextResponse.redirect(redirectUrl)
  response.cookies.set(LANGUAGE_COOKIE_NAME, locale, {
    path: "/",
    sameSite: "lax",
  })

  return response
}
