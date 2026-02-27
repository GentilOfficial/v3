import {SiNextdotjs, SiReact, SiShadcnui, SiTailwindcss} from "react-icons/si";

export const layout = {
    title: "Federico Gentili | Portfolio",
    description: "Federico's portfolio | Web Developer",
}

export const hero = {
    title: "Federico Gentili",
    secondTitle: "Web Developer",
    description: "Welcome to my digital space, where I transform lines of code into engaging experiences.",
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
        {node: <SiReact/>, title: "React", href: "https://react.dev"},
        {node: <SiNextdotjs/>, title: "Next.js", href: "https://nextjs.org"},
        {node: <SiTailwindcss/>, title: "Tailwind CSS", href: "https://tailwindcss.com"},
        {node: <SiShadcnui/>, title: "Shadcn", href: "https://ui.shadcn.com"}
    ]
}

export const techStack = {
    title: "Tools and Technologies",

}