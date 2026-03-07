import {
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si"

const techStackIcons = [
  { node: <SiNextdotjs />, title: "Next.js" },
  { node: <SiReact />, title: "React" },
  { node: <SiTailwindcss />, title: "Tailwind CSS" },
  { node: <SiLaravel />, title: "Laravel" },
  { node: <SiGithub />, title: "GitHub" },
  { node: <SiJavascript />, title: "JavaScript" },
]

export const hero = {
  en: {
    title: "Federico Gentili",
    subtitle: "Web Developer",
    description:
      "Welcome to my digital space, where I transform lines of code into engaging experiences.",
    terminal: {
      command: "GentilOfficial ~ % run",
      output: [
        "✓ Compiled successfully",
        "✓ Collecting page data",
        "✓ Generating static pages",
        "✓ Finalizing page optimization",
      ],
      success: "Success! Initialization completed.",
    },
    availableForWork: "Available for work",
    techStackIcons,
  },
  it: {
    title: "Federico Gentili",
    subtitle: "Sviluppatore Web",
    description:
      "Benvenuto nel mio spazio digitale, dove trasformo linee di codice in esperienze efficaci.",
    terminal: {
      command: "GentilOfficial ~ % run",
      output: [
        "✓ Compilazione completata",
        "✓ Raccolta dati pagina",
        "✓ Generazione pagine statiche",
        "✓ Ottimizzazione finale pagina",
      ],
      success: "Ottimo! Inizializzazione completata.",
    },
    availableForWork: "Disponibile per collaborazioni",
    techStackIcons,
  },
}
