"use client"

import { SpotlightInfoCard } from "@/components/ui/SpotlightInfoCard"
import { contact, contactEmail, contactSocials } from "@/config/content.config"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { Mail } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { SiGithub, SiInstagram, SiLinkedin, SiTelegram } from "react-icons/si"

const SOCIAL_ICON_MAP = {
  github: SiGithub,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  telegram: SiTelegram,
}

export default function Contact() {
  const { lang } = useLanguage()
  const localizedContact = getLocalizedValue(contact, lang)
  const emailAddress = contactEmail
  const emailHref = contactEmail ? `mailto:${contactEmail}` : null

  const socialCards = (contactSocials ?? [])
    .map((social) => {
      const Icon = SOCIAL_ICON_MAP[social.icon]
      if (!Icon) return null

      return {
        label: social.label,
        href: social.href,
        value: social.href
          .replace(/^https?:\/\//, "")
          .replace(/^www\./, "")
          .replace(/\/$/, ""),
        Icon,
      }
    })
    .filter(Boolean)

  return (
    <section className="relative py-6 md:py-10">
      <motion.div
        initial={{ opacity: 0, scale: 0.85 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 1.1, ease: [0.25, 0.75, 0.25, 1] }}
        className="pointer-events-none absolute -top-20 left-1/2 h-72 w-72 -translate-x-1/2 rounded-full bg-primary/10 blur-[90px]"
      />

      <div className="mx-auto flex w-full max-w-6xl flex-col gap-10">
        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{ duration: 0.65, ease: [0.25, 0.75, 0.25, 1] }}
          className="flex flex-col items-center gap-3 text-center"
        >
          <span className="font-mono text-xs uppercase tracking-[0.2em] text-foreground/40">
            {localizedContact.eyebrow}
          </span>
          <h1 className="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl">
            <span className="block">{localizedContact.title}</span>
            <span className="block bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
              {localizedContact.subtitle}
            </span>
          </h1>
          <p className="max-w-2xl text-sm text-foreground/55 sm:text-base">
            {localizedContact.description}
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 24, filter: "blur(6px)" }}
          animate={{ opacity: 1, y: 0, filter: "blur(0px)" }}
          transition={{
            duration: 0.6,
            ease: [0.25, 0.75, 0.25, 1],
            delay: 0.1,
          }}
          className="grid gap-4 sm:grid-cols-2 lg:grid-cols-3"
        >
          <div className="rounded-xl border border-border bg-background px-3.5 py-3 text-xs text-foreground/55 backdrop-blur-sm sm:col-span-2 lg:col-span-4">
            <span className="font-mono uppercase tracking-[0.14em]">
              {localizedContact.cards.label}
            </span>
            <p className="mt-1 text-sm text-foreground/65">
              {localizedContact.cards.availability}
            </p>
          </div>

          {emailHref && emailAddress ? (
            <SpotlightInfoCard
              title={localizedContact.cards.emailTitle}
              icon={<Mail className="size-4" />}
            >
              <Link
                href={emailHref}
                className="break-all text-sm text-foreground/55 transition-colors duration-200 hover:text-foreground"
              >
                {emailAddress}
              </Link>
            </SpotlightInfoCard>
          ) : null}

          {socialCards.map((social) => (
            <SpotlightInfoCard
              key={social.href}
              title={social.label}
              icon={<social.Icon className="size-4" />}
            >
              <Link
                href={social.href}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-foreground/55 transition-colors duration-200 hover:text-foreground truncate max-w-xs"
              >
                {social.value}
              </Link>
            </SpotlightInfoCard>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
