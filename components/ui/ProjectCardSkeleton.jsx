"use client"

import { Skeleton } from "@/components/ui/Skeleton"
import SurfacePanel from "@/components/ui/SurfacePanel"
import { cn } from "@/lib/utils"

export function ProjectCardSkeleton({ compact = false, className }) {
  return (
    <SurfacePanel
      className={cn(
        "flex h-full flex-col gap-4 border-foreground/5 p-5",
        className,
      )}
    >
      <div className="flex flex-col gap-4">
        <Skeleton className="size-11 rounded-xl" />
        <div className="flex-1 space-y-2">
          <Skeleton className="h-6 w-2/3" />
          <Skeleton className="h-3 w-1/3" />
        </div>
      </div>

      <Skeleton className="h-16 w-full" />

      <div className="flex items-center justify-between gap-4">
        <Skeleton className="h-6 w-16 rounded-full" />
        <Skeleton className="h-2 w-10 rounded-full" />
      </div>

      <div className="flex flex-wrap gap-2">
        {Array.from({ length: 4 }, (_, index) => (
          <Skeleton
            key={`project-skeleton-chip-${index}`}
            className="h-4 w-15 rounded-full"
          />
        ))}
      </div>

      {!compact ? <Skeleton className="h-32 w-full" /> : null}

      <div className="mt-auto flex flex-wrap gap-3 pt-1">
        <Skeleton className="h-6 w-24 rounded-full" />
        <Skeleton className="h-6 w-28 rounded-full" />
      </div>
    </SurfacePanel>
  )
}
