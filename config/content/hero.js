import {
  SiGithub,
  SiJavascript,
  SiLaravel,
  SiNextdotjs,
  SiReact,
  SiTailwindcss,
} from "react-icons/si"

export const hero = {
  title: "Federico Gentili",
  subtitle: "Web Developer",
  description:
    "Welcome to my digital space, where I transform lines of code into engaging experiences.",
  terminal: {
    command: "GentilOfficial@v3 ~ % run",
    output: [
      "✓ Compiled successfully",
      "✓ Collecting page data",
      "✓ Generating static pages",
      "✓ Finalizing page optimization",
    ],
    success: "Success! initialization completed.",
  },
  techStackIcons: [
    { node: <SiNextdotjs />, title: "Next.js" },
    { node: <SiReact />, title: "React" },
    { node: <SiTailwindcss />, title: "Tailwind CSS" },
    { node: <SiLaravel />, title: "Laravel" },
    { node: <SiGithub />, title: "Github" },
    { node: <SiJavascript />, title: "Javascript" },
  ],
}
