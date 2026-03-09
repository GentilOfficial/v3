import { contactEmail, socials } from "@/config/content/contact"

export const footer = {
  en: {
    tagline: "Made with ❤️\nFederico Gentili",
    socials,
    email: {
      label: "Email",
      address: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    stat: {
      label: "Coffee consumed",
      value: "Yes",
    },
    pagesLabel: "Pages",
    socialLabel: "Contacts",
    statsLabel: "Stats",
    builtWith: "Built with Next.js",
  },
  it: {
    tagline: "Creato con ❤️\nFederico Gentili",
    socials,
    email: {
      label: "Email",
      address: contactEmail,
      href: `mailto:${contactEmail}`,
    },
    stat: {
      label: "Caffè consumati",
      value: "Si",
    },
    pagesLabel: "Pagine",
    socialLabel: "Contatti",
    statsLabel: "Statistiche",
    builtWith: "Creato con Next.js",
  },
}
