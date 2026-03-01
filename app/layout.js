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
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/root/faq";
import {GridPattern} from "@/components/ui/GridPattern";
import {cn} from "@/lib/utils";

const font = DM_Sans({
    subsets: ['latin'],
})


export const metadata = {
    title: layout.title,
    description: layout.description
}

export default function RootLayout({children}) {
    return (
        <html lang="en" className={font.className} suppressHydrationWarning>
        <body>
        <ThemeProvider>
            <LenisScroll/>
            <DynamicBackground/>
            <LanguageProvider>
                <CustomCursor/>
                <Navbar/>
                <main className="mx-auto max-w-7xl px-8 pt-32 relative">
                    <GridPattern
                        strokeDasharray={"4 2"}
                        className={cn(
                            "-z-100 opacity-30 mask-intersect",
                            "mask-[linear-gradient(to_right,transparent,white,transparent),linear-gradient(to_bottom,transparent,white_75%,white,transparent)]"
                        )}
                    />
                    {children}
                    <FAQ/>
                </main>
                <Footer/>
                <BottomBlur/>
            </LanguageProvider>
        </ThemeProvider>
        <ConsoleSignature/>
        </body>
        </html>
    )
}
