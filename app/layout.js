import "./globals.css"
import { LanguageProvider } from "@/providers/LanguageContext"
import Navbar from "../components/layout/Navbar"
import DarkVeil from "@/components/ui/DarkVeil"
import ClickSpark from "@/components/ui/ClickSPark"
import LenisScroll from "@/providers/LenisScroll"

export const metadata = {
  title: "Federico Gentili",
  description: "Federico's portfolio | Web Developer",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark">
        <LenisScroll />
        <ClickSpark
          sparkColor="#fff"
          sparkSize={5}
          sparkRadius={50}
          sparkCount={10}
          duration={300}
          extraScale={0.5}
        >
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
            <div className="min-h-screen">
              <main className="mx-auto max-w-7xl px-4 py-12">{children}</main>
            </div>
          </LanguageProvider>
        </ClickSpark>
      </body>
    </html>
  )
}
