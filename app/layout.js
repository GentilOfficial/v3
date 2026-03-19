import BottomBlur from "@/components/layout/BottomBlur"
import ConsoleSignature from "@/components/layout/ConsoleSignature"
import { DynamicGridPattern } from "@/components/layout/DynamicGridPattern"
import { Footer } from "@/components/layout/Footer"
import LayoutInner from "@/components/layout/LayoutInner"
import Navbar from "@/components/layout/Navbar"
import CustomCursor from "@/components/ui/CustomCursor"
import { DEFAULT_LOCALE, isLocale } from "@/config/i18n.config"
import { getLayoutMetadata } from "@/content/site/layout"
import { cn } from "@/lib/utils"
import { LanguageProvider } from "@/providers/LanguageContext"
import LenisScroll from "@/providers/LenisScroll"
import { ThemeProvider } from "@/providers/ThemeProvider"
import localFont from "next/font/local"
import { headers } from "next/headers"
import "./globals.css"

const sansFont = localFont({
  src: "../fonts/DMSans.ttf",
  display: "swap",
  variable: "--font-sans",
  preload: true,
})

const monoFont = localFont({
  src: "../fonts/DMMono.ttf",
  display: "swap",
  variable: "--font-mono",
  preload: true,
})

export async function generateMetadata() {
  const requestHeaders = await headers()
  const pathname = requestHeaders.get("x-pathname")
  const headerLang = requestHeaders.get("x-lang")
  const currentLang = isLocale(headerLang) ? headerLang : DEFAULT_LOCALE
  const pageMetadata = getLayoutMetadata(pathname, currentLang)

  return {
    metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
    title: pageMetadata.title,
    description: pageMetadata.description,
  }
}

export const viewport = {
  width: "device-width",
  initialScale: 1,
  themeColor: [
    { media: "(prefers-color-scheme: light)", color: "#ffffff" },
    { media: "(prefers-color-scheme: dark)", color: "#0a0a0a" },
  ],
}

export default async function RootLayout({ children }) {
  const requestHeaders = await headers()
  const headerLang = requestHeaders.get("x-lang")
  const currentLang = isLocale(headerLang) ? headerLang : DEFAULT_LOCALE

  return (
    <html
      lang={currentLang}
      className={cn(sansFont.variable, monoFont.variable)}
      suppressHydrationWarning
    >
      <body className="font-sans antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <LenisScroll />
          <LanguageProvider initialLang={currentLang}>
            <LayoutInner>
              <CustomCursor />
              <Navbar />
              <main className="relative mx-auto max-w-7xl px-8 pt-32 pb-16 flex-1 w-full">
                <DynamicGridPattern />
                {children}
              </main>
              <Footer />
              <BottomBlur />
              <ConsoleSignature />
            </LayoutInner>
          </LanguageProvider>
        </ThemeProvider>
      </body>
    </html>
  )
}
