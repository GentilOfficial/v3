"use client"

import SurfacePanel from "@/components/ui/SurfacePanel"
import { cn } from "@/lib/utils"

const variants = {
  warning: "border-amber-500/30 bg-amber-500/10",
  error: "border-destructive/30 bg-destructive/10",
}

export default function ContentNotice({
  title,
  description,
  variant = "warning",
  className,
}) {
  return (
    <SurfacePanel
      className={cn(
        "px-4 py-3",
        variants[variant] ?? variants.warning,
        className,
      )}
    >
      <p className="text-xs font-mono uppercase tracking-[0.16em] text-foreground">
        {title}
      </p>
      {description ? (
        <p className="mt-1 text-sm text-foreground/75">{description}</p>
      ) : null}
    </SurfacePanel>
  )
}
