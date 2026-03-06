const routes = [
    {
        name: "Home",
        href: "/",
        items: [
            {
                name: "About",
                href: "/#about",
                description: "Who I am and how I approach projects.",
                icon: "about",
            },
            {
                name: "Certifications",
                href: "/#certifications",
                description: "Validated skills and training highlights.",
                icon: "certifications",
            },
            {
                name: "Projects",
                href: "/#projects",
                description: "Featured work and case-study previews.",
                icon: "projects",
            },
            {
                name: "Tech Stack",
                href: "/#tech-stack",
                description: "Tools and technologies used in production.",
                icon: "tech-stack",
            },
            {
                name: "FAQ",
                href: "/#faq",
                description: "Quick answers to common client questions.",
                icon: "faq",
            },
        ],
    },
    {
        name: "About",
        href: "/about",
    },
    {
        name: "Projects",
        href: "/projects",
    },
    {
        name: "Contact",
        href: "/contact",
    },
]

export default routes
