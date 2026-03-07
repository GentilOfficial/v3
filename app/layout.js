import BottomBlur from "@/components/layout/BottomBlur"
import ConsoleSignature from "@/components/layout/ConsoleSignature"
import { DynamicGridPattern } from "@/components/layout/DynamicGridPattern"
import { Footer } from "@/components/layout/Footer"
import LayoutInner from "@/components/layout/LayoutInner"
import Navbar from "@/components/layout/Navbar"
import CustomCursor from "@/components/ui/CustomCursor"
import { layout } from "@/config/content.config"
import { DEFAULT_LOCALE, isLocale } from "@/config/i18n.config"
import { cn } from "@/lib/utils"
import { LanguageProvider } from "@/providers/LanguageContext"
import LenisScroll from "@/providers/LenisScroll"
import { ThemeProvider } from "@/providers/ThemeProvider"
import localFont from "next/font/local"
import { headers } from "next/headers"
import "./globals.css"

const font = localFont({
  src: "../assets/DMSans.ttf",
  display: "swap",
  variable: "--font-sans",
  preload: false,
})

export const metadata = {
  metadataBase: new URL(process.env.NEXT_PUBLIC_SITE_URL),
  title: layout.title,
  description: layout.description,
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
      className={cn(font.variable, font.className)}
      suppressHydrationWarning
    >
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <LenisScroll />
          <LanguageProvider initialLang={currentLang}>
            <LayoutInner>
              <CustomCursor />
              <Navbar />
              <main className="relative mx-auto max-w-7xl px-8 pt-32 flex-1 w-full">
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
