import { DM_Sans } from 'next/font/google'
import "./globals.css"
import { LanguageProvider } from "@/providers/LanguageContext"
import Navbar from "@/components/layout/Navbar"
import DarkVeil from "@/components/ui/DarkVeil"
import ClickSpark from "@/components/ui/ClickSPark"
import LenisScroll from "@/providers/LenisScroll"
import GradualBlur from "@/components/ui/GradualBlur";
import CustomCursor from "@/components/ui/CustomCursor";
import ConsoleSignature from "@/components/layout/ConsoleSignature";

const font = DM_Sans({
  subsets: ['latin'],
})

export const metadata = {
  title: "Federico Gentili",
  description: "Federico's portfolio | Web Developer",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" className={font.className}>
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
            speed={1.5 }
            scanlineFrequency={0}
            warpAmount={1}
            resolutionScale={1}
          />
          <LanguageProvider>
            <CustomCursor />
            <Navbar />
              <main className="min-h-screen">
                <div className="mx-auto max-w-7xl px-8 py-32">
                  {children}
                </div>
              </main>
            <GradualBlur
                target="page"
                position="bottom"
                height="7rem"
                strength={1}
                divCount={2}
                curve="bezier"
                exponential={false}
                opacity={1}
            />
          </LanguageProvider>
        </ClickSpark>
      <ConsoleSignature />
      </body>
    </html>
  )
}
