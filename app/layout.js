import localFont from "next/font/local"
import "./globals.css"
import { layout } from "@/config/content.config"
import { LanguageProvider } from "@/providers/LanguageContext"
import { ThemeProvider } from "@/providers/ThemeProvider"
import Navbar from "@/components/layout/Navbar"
import LenisScroll from "@/providers/LenisScroll"
import CustomCursor from "@/components/ui/CustomCursor"
import ConsoleSignature from "@/components/layout/ConsoleSignature"
import BottomBlur from "@/components/layout/BottomBlur"
import { Footer } from "@/components/layout/Footer"
import FAQ from "@/components/sections/root/faq"
import { cn } from "@/lib/utils"
import LayoutInner from "@/components/layout/LayoutInner"
import { DynamicGridPattern } from "@/components/layout/DynamicGridPattern"

const font = localFont({
  src: "../assets/DMSans.ttf",
  display: "swap",
  variable: "--font-sans",
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

export default function RootLayout({ children }) {
  return (
    <html
      lang="en"
      className={cn(font.variable, font.className)}
      suppressHydrationWarning
    >
      <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider>
          <LenisScroll />
          <LanguageProvider>
            <LayoutInner>
              <CustomCursor />
              <Navbar />
              <main className="relative mx-auto max-w-7xl px-8 pt-32 flex-1 w-full">
                <DynamicGridPattern />
                {children}
                <FAQ />
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
