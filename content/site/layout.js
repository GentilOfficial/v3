import { DEFAULT_LOCALE } from "@/config/i18n.config"
import routes from "@/content/site/routes"
import {
  getLocalizedValue,
  normalizePathname,
  stripLocaleFromPathname,
} from "@/lib/i18n"

const defaultMetadata = {
  title: "Federico Gentili | Web Developer",
  description: {
    en: "Modern web experiences, thoughtful interfaces, and production-ready builds. Explore my works, process and ways to collaborate.",
    it: "Esperienze web moderne, interfacce curate e progetti pronti per la produzione. Scopri i miei lavori, approcci e come collaborare insieme.",
  },
}

export const layout = {
  metadata: {
    home: defaultMetadata,
    about: {
      title: {
        en: "About | Vision, Process, Experience",
        it: "Chi sono | Visione, metodo, esperienza",
      },
      description: {
        en: "Discover the background, mindset, and working style behind my projects, from product thinking to clean front-end execution.",
        it: "Scopri il percorso, il modo di pensare e l'approccio al lavoro dietro i miei progetti, tra visione di prodotto e cura del codice.",
      },
    },
    projects: {
      title: {
        en: "Projects | Selected Work and Case Studies",
        it: "Progetti | Lavori selezionati e case study",
      },
      description: {
        en: "A curated selection of my projects, with real interfaces, technical choices, and practical solutions built for the web.",
        it: "Una selezione curata dei miei progetti, tra interfacce reali, scelte tecniche e soluzioni concrete costruite per il web.",
      },
    },
    contact: {
      title: {
        en: "Contacts | Let's Build Something Useful",
        it: "Contatti | Costruiamo qualcosa di utile",
      },
      description: {
        en: "Have an idea, a collaboration, or a product to improve? Reach me and let's turn it into a clear, well-crafted web experience.",
        it: "Hai un'idea, una collaborazione o un prodotto da migliorare? Scrivimi e trasformiamolo in un'esperienza web chiara, solida e ben rifinita.",
      },
    },
    error: {
      title: {
        en: "Page Not Found | Federico Gentili",
        it: "Pagina non trovata | Federico Gentili",
      },
      description: {
        en: "This page is no longer here, or it never existed. You can head back and continue exploring the portfolio.",
        it: "Questa pagina non e' piu' disponibile, oppure non e' mai esistita. Puoi tornare indietro e continuare a esplorare il portfolio.",
      },
    },
  },
  logoAlt: "Logo",
  navigation: {
    homeAriaLabel: {
      en: "Go to homepage",
      it: "Vai alla home",
    },
    dropdownPrefix: {
      en: "View",
      it: "Visualizza",
    },
    toggleTitle: {
      en: "Toggle navigation links",
      it: "Apri o chiudi la navigazione",
    },
  },
  themeToggle: {
    triggerAriaLabel: {
      en: "Toggle theme",
      it: "Cambia tema",
    },
    options: [
      {
        value: "light",
        label: {
          en: "Light",
          it: "Chiaro",
        },
      },
      {
        value: "dark",
        label: {
          en: "Dark",
          it: "Scuro",
        },
      },
      {
        value: "system",
        label: {
          en: "System",
          it: "Sistema",
        },
      },
    ],
  },
  console: {
    signature: "\uD83C\uDF35 Made with love by Federico Gentili",
  },
  opengraph: {
    title: "Federico Gentili",
    subtitle: "Web Developer",
    logoAlt: "Logo",
  },
}

export function getLayoutMetadata(pathname = "/", lang = DEFAULT_LOCALE) {
  const normalizedPathname = normalizePathname(
    stripLocaleFromPathname(pathname),
  )
  const matchedRoute = routes.find(
    (route) => normalizePathname(route.href) === normalizedPathname,
  )
  const metadataKey = matchedRoute?.metadataKey ?? "error"

  return getLocalizedValue(
    layout.metadata[metadataKey] ?? defaultMetadata,
    lang,
  )
}
