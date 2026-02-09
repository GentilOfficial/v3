import "./globals.css"
import { LanguageProvider } from "@/app/providers/LanguageContext"
import Navbar from "./components/layout/Navbar"
import DarkVeil from "@/components/ui/DarkVeil"

export const metadata = {
  title: "Federico Gentili",
  description: "Federico's portfolio | Web Developer",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark relative">
        <DarkVeil
          hueShift={25}
          noiseIntensity={0}
          scanlineIntensity={0}
          speed={1.2}
          scanlineFrequency={0}
          warpAmount={1}
          resolutionScale={1}
        />
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
