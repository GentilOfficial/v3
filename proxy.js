import { DEFAULT_LOCALE, isLocale } from "@/config/i18n.config"
import { NextResponse } from "next/server"

export function proxy(request) {
  const { pathname } = request.nextUrl

  if (
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api") ||
    pathname === "/favicon.ico" ||
    /\.[^/]+$/.test(pathname)
  ) {
    return NextResponse.next()
  }

  const segments = pathname.split("/").filter(Boolean)
  const pathnameLocale = segments[0]

  if (isLocale(pathnameLocale)) {
    if (pathnameLocale === DEFAULT_LOCALE) {
      const redirectUrl = request.nextUrl.clone()
      const pathWithoutLocale = `/${segments.slice(1).join("/")}`
      redirectUrl.pathname = pathWithoutLocale === "/" ? "/" : pathWithoutLocale

      return NextResponse.redirect(redirectUrl)
    }

    const rewriteUrl = request.nextUrl.clone()
    const pathWithoutLocale = `/${segments.slice(1).join("/")}`
    rewriteUrl.pathname = pathWithoutLocale === "/" ? "/" : pathWithoutLocale

    const requestHeaders = new Headers(request.headers)
    requestHeaders.set("x-lang", pathnameLocale)
    requestHeaders.set(
      "x-pathname",
      pathWithoutLocale === "/" ? "/" : pathWithoutLocale,
    )

    const response = NextResponse.rewrite(rewriteUrl, {
      request: { headers: requestHeaders },
    })

    return response
  }

  const requestHeaders = new Headers(request.headers)
  requestHeaders.set("x-lang", DEFAULT_LOCALE)
  requestHeaders.set("x-pathname", pathname)

  return NextResponse.next({
    request: { headers: requestHeaders },
  })
}
