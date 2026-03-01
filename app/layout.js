import {DM_Sans} from 'next/font/google'
import "./globals.css"
import {layout} from "@/config/content.config";
import {LanguageProvider} from "@/providers/LanguageContext"
import {ThemeProvider} from "@/providers/ThemeProvider"
import Navbar from "@/components/layout/Navbar"
import ClickSpark from "@/components/ui/ClickSPark"
import LenisScroll from "@/providers/LenisScroll"
import DynamicBackground from "@/components/layout/DynamicBackground";
import CustomCursor from "@/components/ui/CustomCursor";
import ConsoleSignature from "@/components/layout/ConsoleSignature";
import BottomBlur from "@/components/layout/BottomBlur";
import Footer from "@/components/layout/Footer";
import FAQ from "@/components/sections/root/faq";

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
            <ClickSpark
                sparkColor="#fff"
                sparkSize={5}
                sparkRadius={50}
                sparkCount={10}
                duration={300}
                extraScale={0.5}
            >
                <DynamicBackground/>
                <LanguageProvider>
                    <CustomCursor/>
                    <Navbar/>
                    <main className="mx-auto max-w-7xl px-8 pt-32">
                        {children}
                        <FAQ/>
                    </main>
                    <Footer/>
                    <BottomBlur/>
                </LanguageProvider>
            </ClickSpark>
        </ThemeProvider>
        <ConsoleSignature/>
        </body>
        </html>
    )
}
