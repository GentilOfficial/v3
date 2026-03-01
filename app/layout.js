import {DM_Sans} from 'next/font/google'
import "./globals.css"
import {layout} from "@/config/content.config";
import {LanguageProvider} from "@/providers/LanguageContext"
import {ThemeProvider} from "@/providers/ThemeProvider"
import Navbar from "@/components/layout/Navbar"
import LenisScroll from "@/providers/LenisScroll"
import DynamicBackground from "@/components/layout/DynamicBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ConsoleSignature from "@/components/layout/ConsoleSignature";
import BottomBlur from "@/components/layout/BottomBlur";
import {Footer} from "@/components/layout/Footer";
import FAQ from "@/components/sections/root/faq";
import {GridPattern} from "@/components/ui/GridPattern";
import {cn} from "@/lib/utils";
import LayoutInner from "@/components/layout/LayoutInner";

const font = DM_Sans({
    subsets: ['latin'],
    display: 'swap',
    variable: '--font-sans',
})

export const metadata = {
    title: layout.title,
    description: layout.description,
}

export const viewport = {
    width: 'device-width',
    initialScale: 1,
    themeColor: [
        {media: '(prefers-color-scheme: light)', color: '#ffffff'},
        {media: '(prefers-color-scheme: dark)', color: '#0a0a0a'},
    ],
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={cn(font.variable, font.className)} suppressHydrationWarning>
        <body className="antialiased flex flex-col min-h-screen">
        <ThemeProvider>
            <LenisScroll/>
            <DynamicBackground/>
            <LanguageProvider>
                <LayoutInner>
                    <CustomCursor/>
                    <Navbar/>
                    <main className="relative mx-auto max-w-7xl px-8 pt-32 flex-1 w-full">
                        <GridPattern
                            strokeDasharray="4 2"
                            className={cn(
                                "-z-50 opacity-30 mask-intersect",
                                "mask-[linear-gradient(to_right,transparent,white,transparent),linear-gradient(to_bottom,transparent,white_75%,white,transparent)]"
                            )}
                        />
                        {children}
                        <FAQ/>
                    </main>
                    <Footer/>
                    <BottomBlur/>
                    <ConsoleSignature/>
                </LayoutInner>
            </LanguageProvider>
        </ThemeProvider>
        </body>
        </html>
    )
}