"use client"

import { Button } from "@/components/ui/button"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { ArrowUpRight, BadgeCheck } from "lucide-react"
import Image from "next/image"
import Link from "next/link"

export function CertificationCard({ certification, labels }) {
  return (
    <SurfacePanel
      as="article"
      className="group flex h-full flex-col gap-4 overflow-hidden p-3.5 sm:p-4"
    >
      <div className="relative aspect-video overflow-hidden rounded-lg border border-border/70 bg-foreground dark:bg-background/60">
        {certification.badgeUrl ? (
          <Image
            src={certification.badgeUrl}
            alt={certification.badgeAlt ?? certification.title}
            fill
            sizes="(min-width: 1024px) 40vw, (min-width: 768px) 48vw, 100vw"
            className="object-contain max-w-1/2 mx-auto p-5 transition-transform duration-500 group-hover:scale-[1.05]"
          />
        ) : (
          <div className="flex h-full flex-col items-center justify-center gap-3 px-6 text-center text-white/65">
            <BadgeCheck className="size-8 md:size-12" />
          </div>
        )}
        {certification.credentialUrl ? (
          <div className="absolute bottom-2 left-1/2 -translate-x-1/2">
            <Button
              asChild
              variant="outline"
              size="xs"
              className="rounded-full"
            >
              <Link
                href={certification.credentialUrl}
                target="_blank"
                rel="noopener noreferrer"
              >
                {labels.credential}
                <ArrowUpRight className="size-3.5" />
              </Link>
            </Button>
          </div>
        ) : null}
      </div>

      <div className="flex flex-1 flex-col gap-4 px-1 pb-1">
        <div className="flex items-start justify-between gap-4">
          <div className="min-w-0">
            <h3 className="text-lg font-semibold leading-tight text-foreground sm:text-xl">
              {certification.title}
            </h3>
            <p className="mt-1 text-sm text-foreground/50">
              {certification.issuer || "-"}
            </p>
          </div>

          <div className="shrink-0 text-right flex flex-col justify-end h-full">
            <span className="block text-xs uppercase tracking-[0.16em] text-foreground/40">
              {labels.date}
            </span>
            <span className="mt-0.5 block text-sm font-semibold text-foreground/75">
              {certification.issued || "-"}
            </span>
          </div>
        </div>
      </div>
    </SurfacePanel>
  )
}
