import { cn } from "@/lib/utils"

export function Skeleton({ className, ...props }) {
  return (
    <div
      aria-hidden="true"
      className={cn("animate-pulse rounded-md bg-foreground/5", className)}
      {...props}
    />
  )
}
