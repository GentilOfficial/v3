import {
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si"

const sharedTools = [
  {
    icon: { node: SiNextdotjs, bg: "#000000", color: "#ffffff" },
    title: {
      en: "Next.js",
      it: "Next.js",
    },
    tag: {
      en: "Framework",
      it: "Framework",
    },
    description: {
      en: "My go-to framework for full-stack React applications, with built-in routing, SSR and API routes.",
      it: "Il framework che uso più spesso per applicazioni React full-stack, con routing, SSR e API routes integrate.",
    },
  },
  {
    icon: { node: SiReact, bg: "#0d1117", color: "#61dafb" },
    title: {
      en: "React",
      it: "React",
    },
    tag: {
      en: "Library",
      it: "Libreria",
    },
    description: {
      en: "The library I build every interface with, leveraging reusable components and reactive state management.",
      it: "La libreria con cui costruisco le interfacce, sfruttando componenti riusabili e gestione reattiva dello stato.",
    },
  },
  {
    icon: { node: SiTailwindcss, bg: "#0f172a", color: "#38bdf8" },
    title: {
      en: "Tailwind CSS",
      it: "Tailwind CSS",
    },
    tag: {
      en: "Styling",
      it: "Styling",
    },
    description: {
      en: "Utility-first CSS to style quickly without leaving the HTML, keeping the codebase clean and consistent.",
      it: "CSS utility-first per stilizzare rapidamente senza uscire dall'HTML, mantenendo coerenza e pulizia del codice.",
    },
  },
  {
    icon: { node: SiLaravel, bg: "#1a0a0a", color: "#ff2d20" },
    title: {
      en: "Laravel",
      it: "Laravel",
    },
    tag: {
      en: "Framework",
      it: "Framework",
    },
    description: {
      en: "Elegant PHP framework for robust backends: ORM, authentication, queues and RESTful APIs in just a few lines.",
      it: "Framework PHP elegante per backend solidi: ORM, autenticazione, code e API REST in poche righe.",
    },
  },
  {
    icon: { node: SiGithub, bg: "#0d1117", color: "#f0f6fc" },
    title: {
      en: "Git & GitHub",
      it: "Git e GitHub",
    },
    tag: {
      en: "Version Control",
      it: "Versionamento",
    },
    description: {
      en: "Version control for every project, with branches, pull requests and CI/CD for a clean and collaborative workflow.",
      it: "Versionamento per ogni progetto con branch, pull request e CI/CD per un workflow pulito e collaborativo.",
    },
  },
  {
    icon: { node: SiJavascript, bg: "#1a1600", color: "#f7df1e", fill: true },
    title: {
      en: "JavaScript",
      it: "JavaScript",
    },
    tag: {
      en: "Language",
      it: "Linguaggio",
    },
    description: {
      en: "The language at the core of the web: dynamism, logic and interactivity across every project, client and server side.",
      it: "Il linguaggio al centro del web: dinamismo, logica e interattività su ogni progetto, lato client e server.",
    },
  },
]

function mapTools(lang) {
  return sharedTools.map((tool) => ({
    icon: tool.icon,
    title: tool.title[lang],
    tag: tool.tag[lang],
    description: tool.description[lang],
  }))
}

export const techStack = {
  en: {
    title: "Tools and Technologies",
    subtitle: "The writer's pens",
    description:
      "All the tools and technologies I use to create projects and bring ideas to reality.",
    tools: mapTools("en"),
  },
  it: {
    title: "Strumenti e tecnologie",
    subtitle: "Le penne dello sviluppatore",
    description:
      "Tutti gli strumenti e le tecnologie che uso per creare progetti e trasformare idee in realtà.",
    tools: mapTools("it"),
  },
}
