import "./globals.css"
import "@mantine/core/styles.css"
import {
  ColorSchemeScript,
  MantineProvider,
  mantineHtmlProps,
} from "@mantine/core"
import { LanguageProvider } from "@/app/providers/LanguageContext"
import { LanguageSwitcher } from "@/app/components/LanguageSwitcher"

export const metadata = {
  title: "Federico Gentili",
  description: "Federico's portfolio | Web Developer",
}

export default function RootLayout({ children }) {
  return (
    <html lang="en" {...mantineHtmlProps}>
      <body>
        <ColorSchemeScript />
        <LanguageProvider>
          <MantineProvider>
            <LanguageSwitcher />
            {children}
          </MantineProvider>
        </LanguageProvider>
      </body>
    </html>
  )
}
