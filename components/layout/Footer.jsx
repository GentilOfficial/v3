import Link from "next/link";
import Image from "next/image";
import routes from "@/config/routes.config";
import {footer} from "@/config/content.config";

export default function Footer() {
    const {tagline, socials, stat} = footer;

    return (
        <footer className="border-t border-border bg-background/30 backdrop-blur-md">
            <div className="max-w-7xl mx-auto px-6 py-16">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-12">

                    <div className="flex flex-col gap-5 lg:col-span-1">
                        <Image width={1024} height={1024} src="/logo.png" className="size-12" alt="logo"/>
                        <p className="text-sm text-foreground/50 whitespace-pre-line">
                            {tagline}
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-semibold">Pages</span>
                        <ul className="flex flex-col gap-2.5">
                            {routes.map((route, index) => (
                                <li key={`route-${index}`}>
                                    <Link
                                        href={route.href}
                                        className="text-sm text-foreground/50 hover:text-foreground transition-colors"
                                    >
                                        {route.name}
                                    </Link>
                                </li>
                            ))}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-4">
                        <span className="text-sm font-semibold">Social</span>
                        <ul className="flex flex-col gap-2.5">
                            {socials.map((social) => {
                                const Icon = social.icon;
                                return (
                                    <li key={social.label}>
                                        <Link
                                            href={social.href}
                                            target="_blank"
                                            rel="noopener noreferrer"
                                            className="flex items-center gap-2 text-sm text-foreground/50 hover:text-foreground transition-colors group w-fit"
                                        >
                                            <Icon className="size-3.5 shrink-0"/>
                                            {social.label}
                                        </Link>
                                    </li>
                                );
                            })}
                        </ul>
                    </div>

                    <div className="flex flex-col gap-3">
                        <span className="text-sm font-semibold">Stats</span>
                        <div className="rounded-xl border border-border bg-foreground/5 p-3 flex flex-col gap-1">
                            <span className="text-sm text-foreground/50">{stat.label}:</span>
                            <span className="text-xl font-bold">{stat.value}</span>
                        </div>
                    </div>
                </div>
            </div>
        </footer>
    );
}