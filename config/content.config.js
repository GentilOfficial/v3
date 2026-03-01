import {
    SiGithub,
    SiInstagram,
    SiJavascript,
    SiLaravel,
    SiLinkedin,
    SiNextdotjs,
    SiReact,
    SiShadcnui,
    SiTailwindcss
} from "react-icons/si";

export const layout = {
    title: "Federico Gentili | Portfolio",
    description: "Federico's portfolio | Web Developer",
}

export const hero = {
    title: "Federico Gentili",
    subtitle: "Web Developer",
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
    subtitle: "The writer's pens",
    description: "All the tools and technologies I use to create my projects and bring my ideas to reality.",
    tools: [
        {
            icon: {node: SiNextdotjs, bg: "#000000", color: "#ffffff"},
            title: "Next.JS",
            tag: "Framework",
            description: "My go-to framework for full-stack React applications, with built-in routing, SSR and API routes.",
        },
        {
            icon: {node: SiReact, bg: "#0d1117", color: "#61dafb"},
            title: "React",
            tag: "Library",
            description: "The library I build every interface with, leveraging reusable components and reactive state management.",
        },
        {
            icon: {node: SiTailwindcss, bg: "#0f172a", color: "#38bdf8"},
            title: "Tailwind CSS",
            tag: "Styling",
            description: "Utility-first CSS to style quickly without leaving the HTML, keeping the codebase clean and consistent.",
        },
        {
            icon: {node: SiLaravel, bg: "#1a0a0a", color: "#ff2d20"},
            title: "Laravel",
            tag: "Framework",
            description: "Elegant PHP framework for robust backends: ORM, authentication, queues and RESTful APIs in just a few lines.",
        },
        {
            icon: {node: SiGithub, bg: "#0d1117", color: "#f0f6fc"},
            title: "Git & GitHub",
            tag: "Version Control",
            description: "Version control for every project, with branches, pull requests and CI/CD for a clean and collaborative workflow.",
        },
        {
            icon: {node: SiJavascript, bg: "#1a1600", color: "#f7df1e", fill: true},
            title: "JavaScript",
            tag: "Language",
            description: "The language at the core of the web: dynamism, logic and interactivity across every project, client and server side.",
        },
    ]
}

export const faq = {
    title: "Frequently",
    subtitle: "Asked Questions",
    description: "Do you have any questions? The FAQ section provides quick answers to frequently asked questions.",
    questions: [
        {
            question: "What technologies do you work with?",
            answer: "I primarily work with Next.js, React, Tailwind CSS and Laravel. Whether it's a full-stack web app or a polished frontend, I use the right tool for the job.",
        },
        {
            question: "Are you available for contract projects?",
            answer: "Yes! I'm open to contract work. Feel free to reach out with your project details and we can discuss scope, timeline and budget.",
        },
        {
            question: "How long does a typical project take?",
            answer: "It depends on complexity. A simple landing page can be ready in a few days, while a full-stack application may take several weeks.",
        },
        {
            question: "Can you work from an existing design?",
            answer: "Yes, I can translate Figma or other design files into clean, responsive code.",
        },
    ],
};

export const footer = {
    tagline: "Made with ❤️\n— Federico Gentili",
    socials: [
        {label: "GitHub", href: "https://github.com/GentilOfficial", icon: SiGithub},
        {label: "LinkedIn", href: "https://www.linkedin.com/in/federico-gentili-009531308", icon: SiLinkedin},
        {label: "Instagram", href: "https://www.instagram.com/federico.gnt", icon: SiInstagram},
    ],
    stat: {
        label: "Coffee consumed ☕",
        value: "Si (Yes)",
    },
};