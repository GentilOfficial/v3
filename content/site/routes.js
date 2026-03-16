const routes = [
  {
    name: {
      en: "Home",
      it: "Home",
    },
    href: "/",
    items: [
      {
        name: {
          en: "About",
          it: "Chi sono",
        },
        href: "/#about",
        description: {
          en: "Who I am and how I approach projects.",
          it: "Chi sono e come affronto i progetti.",
        },
        icon: "about",
      },
      {
        name: {
          en: "Certifications",
          it: "Certificazioni",
        },
        href: "/#certifications",
        description: {
          en: "Validated skills and training highlights.",
          it: "Competenze validate e formazione continua.",
        },
        icon: "certifications",
      },
      {
        name: {
          en: "Projects",
          it: "Progetti",
        },
        href: "/#projects",
        description: {
          en: "Featured work and case-study previews.",
          it: "Lavori in evidenza e anteprime dei case study.",
        },
        icon: "projects",
      },
      {
        name: {
          en: "Tech Stack",
          it: "Stack",
        },
        href: "/#tech-stack",
        description: {
          en: "Tools and technologies used in production.",
          it: "Strumenti e tecnologie usati in produzione.",
        },
        icon: "tech-stack",
      },
      {
        name: {
          en: "FAQ",
          it: "FAQ",
        },
        href: "/#faq",
        description: {
          en: "Quick answers to common client questions.",
          it: "Risposte rapide alle domande più frequenti.",
        },
        icon: "faq",
      },
    ],
  },
  {
    name: {
      en: "About",
      it: "Chi sono",
    },
    href: "/about",
  },
  {
    name: {
      en: "Projects",
      it: "Progetti",
    },
    href: "/projects",
  },
  {
    name: {
      en: "Contacts",
      it: "Contatti",
    },
    href: "/contacts",
  },
]

export default routes
