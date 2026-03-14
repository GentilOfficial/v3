"use client"

import SurfacePanel from "@/components/ui/SurfacePanel"

export default function ContentEmptyState({ title, description, className }) {
  return (
    <SurfacePanel className={className}>
      <div className="flex min-h-48 flex-col items-center justify-center px-6 py-10 text-center">
        <p className="text-sm font-semibold">{title}</p>
        {description ? (
          <p className="mt-2 max-w-md text-sm text-foreground/55">
            {description}
          </p>
        ) : null}
      </div>
    </SurfacePanel>
  )
}
