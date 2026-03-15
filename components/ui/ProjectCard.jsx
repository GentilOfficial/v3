"use client"

import { SpotlightInfoCard } from "@/components/ui/SpotlightInfoCard"
import { cn } from "@/lib/utils"
import {
  Blocks,
  BriefcaseBusiness,
  ExternalLink,
  Github,
  Rocket,
} from "lucide-react"
import Link from "next/link"

const ICONS = [BriefcaseBusiness, Blocks, Rocket]

export function ProjectCard({ project, index = 0, compact = false }) {
  const Icon = ICONS[index % ICONS.length]

  return (
    <SpotlightInfoCard
      className={cn("p-5", compact ? "gap-4" : "gap-5")}
      icon={<Icon className="size-5" />}
      iconWrapperClassName="size-11 rounded-xl bg-secondary/10 text-primary border-primary/50"
      title={project.name}
      subtitle={project.category}
      description={project.summary}
      titleClassName="text-2xl font-semibold leading-tight text-foreground"
      subtitleClassName="text-xs uppercase tracking-[0.16em] text-foreground/40"
      descriptionClassName="text-sm leading-relaxed text-foreground/55"
      spotlightColor="rgba(120, 120, 120, 0.15)"
      divider={!compact}
    >
      <div className="flex items-center justify-between gap-4 text-xs">
        <span className="rounded-full border border-border px-2.5 py-1 font-medium uppercase tracking-[0.16em] text-foreground/45">
          {project.status}
        </span>
        <span className="text-foreground/40">{project.year}</span>
      </div>

      <div className={cn("space-y-3", compact && "space-y-4")}>
        <div className="flex flex-wrap gap-2">
          {(compact ? project.stack.slice(0, 4) : project.stack).map((item) => (
            <span
              key={`${project.name}-${item}`}
              className="rounded-full bg-muted px-3 py-1 text-xs text-foreground/65"
            >
              {item}
            </span>
          ))}
        </div>

        {!compact ? (
          <ul className="space-y-2 text-sm text-foreground/55">
            {project.deliverables.map((item) => (
              <li
                key={`${project.name}-${item}`}
                className="flex gap-2 leading-relaxed"
              >
                <span className="mt-1.5 size-1.5 shrink-0 rounded-full bg-primary/80" />
                <span>{item}</span>
              </li>
            ))}
          </ul>
        ) : null}
      </div>

      <div className="mt-auto flex flex-wrap gap-3 pt-1">
        {project.links.map((link) => {
          const isGithub = link.href.includes("github.com")
          const LinkIcon = isGithub ? Github : ExternalLink

          return (
            <Link
              key={`${project.name}-${link.href}`}
              href={link.href}
              target="_blank"
              rel="noopener noreferrer"
              className="inline-flex items-center gap-2 rounded-full border border-border px-3 py-1.5 text-sm text-foreground/65 transition-colors duration-200 hover:bg-muted hover:text-foreground"
            >
              <LinkIcon className="size-4" />
              {link.label}
            </Link>
          )
        })}
      </div>
    </SpotlightInfoCard>
  )
}
