import { SiGithub, SiInstagram, SiLinkedin } from "react-icons/si"

const socials = [
  {
    label: "GitHub",
    href: "https://github.com/GentilOfficial",
    icon: SiGithub,
  },
  {
    label: "LinkedIn",
    href: "https://www.linkedin.com/in/federico-gentili-009531308",
    icon: SiLinkedin,
  },
  {
    label: "Instagram",
    href: "https://www.instagram.com/federico.gnt",
    icon: SiInstagram,
  },
]

export const footer = {
  en: {
    tagline: "Made with ❤️\nFederico Gentili",
    socials,
    stat: {
      label: "Coffee consumed",
      value: "Yes",
    },
    pagesLabel: "Pages",
    socialLabel: "Social",
    statsLabel: "Stats",
    builtWith: "Built with Next.js",
  },
  it: {
    tagline: "Creato con ❤️\nFederico Gentili",
    socials,
    stat: {
      label: "Caffè consumati",
      value: "Si",
    },
    pagesLabel: "Pagine",
    socialLabel: "Social",
    statsLabel: "Statistiche",
    builtWith: "Creato con Next.js",
  },
}
