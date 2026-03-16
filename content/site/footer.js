import { contactEmail, socials } from "@/content/site/contact"

export const footer = {
  tagline: {
    en: "Made with ❤️\n- Federico Gentili",
    it: "Creato con ❤️\n- Federico Gentili",
  },
  socials,
  email: {
    label: "Email",
    address: contactEmail,
    href: `mailto:${contactEmail}`,
  },
  stat: {
    label: {
      en: "Coffee consumed",
      it: "Caffè consumati",
    },
    value: {
      en: "Yes",
      it: "Si",
    },
  },
  pagesLabel: {
    en: "Pages",
    it: "Pagine",
  },
  socialLabel: {
    en: "Contacts",
    it: "Contatti",
  },
  statsLabel: {
    en: "Stats",
    it: "Statistiche",
  },
  builtWith: {
    en: "Built with Next.js",
    it: "Creato con Next.js",
  },
}
