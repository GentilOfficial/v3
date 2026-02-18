import {DM_Sans} from 'next/font/google'
import "./globals.css"
import {LanguageProvider} from "@/providers/LanguageContext"
import {ThemeProvider} from "@/providers/ThemeProvider"
import Navbar from "@/components/layout/Navbar"
import ClickSpark from "@/components/ui/ClickSPark"
import LenisScroll from "@/providers/LenisScroll"
import GradualBlur from "@/components/ui/GradualBlur";
import CustomCursor from "@/components/ui/CustomCursor";
import ConsoleSignature from "@/components/layout/ConsoleSignature";
import BackgroundClient from "@/components/ui/DynamicBackground";
import {cn} from "@/lib/utils";

const font = DM_Sans({
    subsets: ['latin'],
})

export const metadata = {
    title: "Federico Gentili",
    description: "Federico's portfolio | Web Developer",
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={font.className} suppressHydrationWarning>
        <body>
        <ThemeProvider>
            <LenisScroll/>
            <ClickSpark
                sparkColor="#fff"
                sparkSize={5}
                sparkRadius={50}
                sparkCount={10}
                duration={300}
                extraScale={0.5}
            >
                <div
                    className="absolute -z-20 size-full min-h-screen opacity-60 blur-sm md:blur-md overflow-hidden">
                    <BackgroundClient
                        rotation={80}
                        speed={0.25}
                        colors={["#004cff", "#1100ff", "#006eff", "#263fc0"]}
                        transparent
                        autoRotate={0.45}
                        scale={1}
                        frequency={1}
                        warpStrength={1}
                        mouseInfluence={0}
                        parallax={0}
                        noise={0}
                        className={cn(
                            "mask-[linear-gradient(to_bottom,white,transparent)]"
                        )}
                    />
                </div>
                <LanguageProvider>
                    <CustomCursor/>
                    <Navbar/>
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
        </ThemeProvider>
        <ConsoleSignature/>
        </body>
        </html>
    )
}
