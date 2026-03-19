import { Mail } from "lucide-react"
import Image from "next/image"
import Link from "next/link"
import { SiGithub, SiInstagram, SiLinkedin, SiTelegram } from "react-icons/si"

const SOCIAL_ICON_MAP = {
  github: SiGithub,
  linkedin: SiLinkedin,
  instagram: SiInstagram,
  telegram: SiTelegram,
}

export function Footer({ localizedFooter, localizedLayout, localizedRoutes }) {
  const footerBottomTitle = localizedLayout.opengraph.title
  const {
    tagline,
    socials,
    email,
    stat,
    pagesLabel,
    socialLabel,
    statsLabel,
    builtWith,
  } = localizedFooter

  return (
    <footer className="border-t border-border bg-background/60 backdrop-blur-md">
      <div className="max-w-7xl mx-auto px-6 py-16">
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">
          <div className="flex flex-col gap-5 lg:col-span-1">
            <Image
              width={96}
              height={96}
              src="/logo.png"
              className="size-12"
              alt={localizedLayout.logoAlt}
              sizes="48px"
            />
            <p className="text-sm text-foreground/50 whitespace-pre-line leading-relaxed">
              {tagline}
            </p>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold">{pagesLabel}</span>
            <ul className="flex flex-col gap-2.5">
              {localizedRoutes.map((route, index) => (
                <li key={`route-${index}`}>
                  <Link
                    href={route.href}
                    className="text-sm text-foreground/50 hover:text-foreground transition-colors duration-200"
                  >
                    {route.name}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          <div className="flex flex-col gap-4">
            <span className="text-sm font-semibold">{socialLabel}</span>
            <ul className="flex flex-col gap-2.5">
              {email?.href && email?.address ? (
                <li key="footer-email">
                  <Link
                    href={email.href}
                    className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200 group w-fit"
                  >
                    <Mail className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                    {email.address}
                  </Link>
                </li>
              ) : null}

              {socials.map((social) => {
                const Icon = SOCIAL_ICON_MAP[social.icon]
                if (!Icon) return null
                return (
                  <li key={social.label}>
                    <Link
                      href={social.href}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors duration-200 group w-fit"
                    >
                      <Icon className="size-3.5 shrink-0 transition-transform duration-200 group-hover:-translate-y-px group-hover:translate-x-px" />
                      {social.label}
                    </Link>
                  </li>
                )
              })}
            </ul>
          </div>

          <div className="flex flex-col gap-3">
            <span className="text-sm font-semibold">{statsLabel}</span>
            <div className="rounded-xl border border-border bg-background/60 backdrop-blur-sm p-3 flex flex-col gap-1">
              <span className="text-sm text-foreground/50">{stat.label}:</span>
              <span className="text-xl font-bold bg-linear-to-r from-primary to-secondary bg-clip-text text-transparent">
                {stat.value}
              </span>
            </div>
          </div>
        </div>

        <div className="mt-12 pt-6 border-t border-border/50 flex flex-col sm:flex-row items-center justify-between gap-3">
          <span className="font-mono text-xs text-foreground/25 uppercase tracking-widest">
            {footerBottomTitle}
          </span>
          <span className="font-mono text-xs text-foreground/25 uppercase tracking-widest">
            {builtWith}
          </span>
        </div>
      </div>
    </footer>
  )
}
