"use client"

import Divider from "@/components/ui/Divider"
import SpotlightCard from "@/components/ui/SpotlightCard"
import { cn } from "@/lib/utils"

export function SpotlightInfoCard({
  icon,
  title,
  subtitle,
  description,
  children,
  className,
  iconWrapperClassName,
  iconWrapperStyle,
  titleClassName,
  subtitleClassName,
  descriptionClassName,
  spotlightColor = "rgba(120, 120, 120, 0.15)",
  divider = false,
}) {
  return (
    <SpotlightCard
      spotlightColor={spotlightColor}
      className={cn("group flex h-full flex-col gap-3", className)}
    >
      {icon ? (
        <div
          className={cn(
            "inline-flex size-9 items-center justify-center rounded-md border border-border bg-background/80 text-foreground/60 transition-transform duration-300 group-hover:scale-105",
            iconWrapperClassName,
          )}
          style={iconWrapperStyle}
        >
          {icon}
        </div>
      ) : null}

      {(title || subtitle) && (
        <div className="flex flex-col gap-0.5">
          {title ? (
            <span
              className={cn("text-sm font-semibold text-foreground/85", titleClassName)}
            >
              {title}
            </span>
          ) : null}
          {subtitle ? (
            <span className={cn("text-sm text-foreground/55", subtitleClassName)}>
              {subtitle}
            </span>
          ) : null}
        </div>
      )}

      {divider ? <Divider /> : null}

      {description ? (
        <p
          className={cn(
            "mt-auto text-sm leading-relaxed text-foreground/50",
            descriptionClassName,
          )}
        >
          {description}
        </p>
      ) : null}

      {children}
    </SpotlightCard>
  )
}
