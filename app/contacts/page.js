"use client"

import { SectionIntro } from "@/components/ui/SectionIntro"
import { SpotlightInfoCard } from "@/components/ui/SpotlightInfoCard"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { Button } from "@/components/ui/button"
import { contact, contactEmail, contactSocials } from "@/config/content.config"
import { getLocalizedValue } from "@/lib/i18n"
import { useLanguage } from "@/providers/LanguageContext"
import { Check, Copy, ExternalLink, Mail, Send } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"
import { useState } from "react"
import { SiGithub, SiInstagram, SiLinkedin, SiTelegram } from "react-icons/si"

const SOCIAL_ICON_MAP = {
  github: SiGithub,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  telegram: SiTelegram,
}

export default function Contact() {
  const { lang } = useLanguage()
  const [emailCopied, setEmailCopied] = useState(false)
  const localizedContact = getLocalizedValue(contact, lang)
  const emailAddress = contactEmail
  const emailHref = contactEmail ? `mailto:${contactEmail}` : null

  const handleCopyEmail = async () => {
    if (!emailAddress || !navigator?.clipboard) return
    try {
      await navigator.clipboard.writeText(emailAddress)
      setEmailCopied(true)
      setTimeout(() => setEmailCopied(false), 1600)
    } catch {
      // Ignore clipboard errors (permissions/context)
    }
  }

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
        <SectionIntro
          eyebrow={localizedContact.eyebrow}
          title={localizedContact.title}
          subtitle={localizedContact.subtitle}
          description={localizedContact.description}
          align="center"
          mode="enter"
          titleAs="h1"
          titleClassName="text-4xl font-semibold leading-tight sm:text-5xl md:text-6xl"
        />

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
          <SurfacePanel className="px-3.5 py-3 text-xs text-foreground/55 sm:col-span-2 lg:col-span-4">
            <span className="font-mono uppercase tracking-[0.14em]">
              {localizedContact.cards.label}
            </span>
            <p className="mt-1 text-sm text-foreground/65">
              {localizedContact.cards.availability}
            </p>
          </SurfacePanel>

          {emailAddress ? (
            <div className="relative h-full">
              <SpotlightInfoCard
                title={localizedContact.cards.emailTitle}
                icon={<Mail className="size-4" />}
                iconWrapperClassName="bg-secondary/10 text-primary border-primary/50"
              >
                <p className="break-all text-sm text-foreground/55">
                  {emailAddress}
                </p>
              </SpotlightInfoCard>
              <div className="absolute top-3 right-3 z-20 flex items-center gap-1">
                <Button
                  type="button"
                  onClick={handleCopyEmail}
                  variant="outline"
                  size="icon-xs"
                  className="hover:cursor-pointer"
                  aria-label={emailCopied ? "Email copied" : "Copy email"}
                  title={emailCopied ? "Copied" : "Copy email"}
                >
                  {emailCopied ? (
                    <Check className="size-3.5" />
                  ) : (
                    <Copy className="size-3.5" />
                  )}
                </Button>
                {emailHref ? (
                  <Button
                    className="hover:cursor-pointer"
                    asChild
                    variant="outline"
                    size="icon-xs"
                  >
                    <Link
                      href={emailHref}
                      aria-label="Open mail app"
                      title="Open mail app"
                    >
                      <Send className="size-3.5" />
                    </Link>
                  </Button>
                ) : null}
              </div>
            </div>
          ) : null}

          {socialCards.map((social) => (
            <Link
              key={social.href}
              href={social.href}
              target="_blank"
              rel="noopener noreferrer"
              className="group relative block h-full"
            >
              <span className="absolute top-3 right-3 z-10 p-1 text-foreground">
                <ExternalLink className="size-3.5" />
              </span>
              <SpotlightInfoCard
                title={social.label}
                icon={<social.Icon className="size-4" />}
                iconWrapperClassName="bg-secondary/10 text-primary border-primary/50"
              >
                <p className="max-w-xs truncate text-sm text-foreground/55 transition-colors duration-200 hover:text-foreground">
                  {social.value}
                </p>
              </SpotlightInfoCard>
            </Link>
          ))}
        </motion.div>
      </div>
    </section>
  )
}
