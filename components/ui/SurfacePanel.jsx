"use client"

import { cn } from "@/lib/utils"

export default function SurfacePanel({
  as: Comp = "div",
  className,
  children,
  ...props
}) {
  return (
    <Comp
      className={cn(
        "rounded-2xl border border-border bg-background",
        className,
      )}
      {...props}
    >
      {children}
    </Comp>
  )
}
