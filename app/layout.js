import "./globals.css"
import { LanguageProvider } from "@/app/providers/LanguageContext"
import Navbar from "./components/layout/Navbar"
import { GridPattern } from "@/components/ui/grid-pattern"
import { cn } from "@/lib/utils"
// import { Pointer } from "@/components/ui/pointer"
// import { LightRays } from "@/components/ui/light-rays"

export const metadata = {
  title: "Federico Gentili",
  description: "Federico's portfolio | Web Developer",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="dark">
        <GridPattern
          width={30}
          height={30}
          x={-1}
          y={-1}
          strokeDasharray={"4 2"}
          className={cn(
            "mask-[radial-gradient(300px_circle_at_center,white,transparent)]",
          )}
        />
        <LanguageProvider>
          <Navbar />
          {children}
        </LanguageProvider>
      </body>
    </html>
  )
}
