"use client"

import Divider from "@/components/ui/Divider"
import { cn } from "@/lib/utils"
import {
  BadgeCheck,
  ChevronDown,
  ChevronRight,
  CircleHelp,
  FolderKanban,
  UserRound,
  Wrench,
} from "lucide-react"
import { AnimatePresence, motion } from "motion/react"
import Link from "next/link"

const itemIconMap = {
  about: UserRound,
  certifications: BadgeCheck,
  projects: FolderKanban,
  "tech-stack": Wrench,
  faq: CircleHelp,
}

export function NavRouteDropdown({
  route,
  isOpen,
  isActive,
  onToggle,
  onOpen,
  onClose,
  onNavigate,
  variant = "desktop",
  dropdownPrefix,
}) {
  const mobile = variant === "mobile"

  return (
    <div
      className={cn(
        mobile ? "rounded-lg overflow-hidden" : "relative",
        mobile && isOpen ? "border border-border bg-background" : undefined,
        mobile && isActive && !isOpen
          ? "border border-border bg-sidebar/75"
          : undefined,
      )}
      onMouseEnter={!mobile ? onOpen : undefined}
      onMouseLeave={!mobile ? onClose : undefined}
    >
      <button
        type="button"
        onClick={onToggle}
        className={cn(
          "w-full inline-flex items-center justify-between gap-1.5 cursor-pointer transition-colors duration-300",
          mobile
            ? cn(
                "px-3 py-2 text-left",
                isOpen
                  ? "bg-sidebar/60 text-foreground py-2.5"
                  : "text-foreground/55",
              )
            : cn(
                "rounded-md border px-3 py-1.5 text-sm",
                isOpen || isActive
                  ? "border-border bg-sidebar/75 text-foreground"
                  : "border-transparent text-foreground/55 hover:text-foreground/80 hover:bg-sidebar/45",
              ),
        )}
      >
        <span
          className={cn(
            mobile ? "text-sm" : undefined,
            mobile && isOpen ? "font-semibold" : undefined,
          )}
        >
          {route.name}
        </span>
        <ChevronDown
          className={cn(
            "size-3.5 transition-transform duration-200",
            isOpen && "rotate-180",
          )}
        />
      </button>

      <AnimatePresence initial={false}>
        {isOpen &&
          (mobile ? (
            <motion.div
              initial={{ height: 0, opacity: 0 }}
              animate={{ height: "auto", opacity: 1 }}
              exit={{ height: 0, opacity: 0 }}
              transition={{ duration: 0.25, ease: [0.25, 0.75, 0.25, 1] }}
              className="overflow-hidden"
            >
              <div className="p-2.5 flex flex-col gap-1">
                <Link
                  href={route.href}
                  onClick={onNavigate}
                  className={cn(
                    "group flex items-center justify-between rounded-md p-2.5 transition-colors duration-200 border border-transparent",
                    isActive
                      ? "border-border/70 bg-sidebar/55"
                      : "hover:border-border/70 hover:bg-sidebar/55",
                  )}
                >
                  <span className="text-xs font-semibold text-foreground/85 group-hover:text-foreground">
                    {dropdownPrefix} {route.name}
                  </span>
                  <ChevronRight className="size-3.5 text-foreground/35 group-hover:text-foreground/60 transition-colors" />
                </Link>

                <Divider className="w-full my-1.5" />

                {route.items.map((item) => {
                  const Icon = itemIconMap[item.icon] ?? CircleHelp
                  return (
                    <Link
                      key={item.href}
                      href={item.href}
                      onClick={onNavigate}
                      className="group flex items-start gap-2.5 rounded-md p-2.5 transition-colors duration-200 border border-transparent hover:border-border/70 hover:bg-sidebar/55"
                    >
                      <span className="inline-flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-background/70 text-foreground/60">
                        <Icon className="size-3.5" />
                      </span>
                      <span className="flex-1">
                        <span className="block text-xs font-semibold text-foreground/85 group-hover:text-foreground">
                          {item.name}
                        </span>
                        <span className="block text-xs text-foreground/45 mt-0.5 leading-snug">
                          {item.description}
                        </span>
                      </span>
                      <ChevronRight className="mt-1 size-3.5 text-foreground/35 group-hover:text-foreground/60 transition-colors" />
                    </Link>
                  )
                })}
              </div>
            </motion.div>
          ) : (
            <motion.div
              initial={{ opacity: 0, y: 8, scale: 0.98 }}
              animate={{ opacity: 1, y: 0, scale: 1 }}
              exit={{ opacity: 0, y: 6, scale: 0.98 }}
              transition={{ duration: 0.18, ease: [0.25, 0.75, 0.25, 1] }}
              className="absolute z-10 left-0 top-full pt-3 w-90"
            >
              <div className="rounded-lg border border-border bg-background p-2 shadow-md shadow-black/5">
                <div className="flex flex-col gap-1">
                  <Link
                    href={route.href}
                    onClick={onNavigate}
                    className={cn(
                      "group rounded-md px-2.5 py-2 transition-colors duration-200 border border-transparent",
                      isActive
                        ? "bg-sidebar/70 border-border"
                        : "hover:bg-sidebar/70 hover:border-border",
                    )}
                  >
                    <div className="flex items-center gap-2.5">
                      <span className="text-sm font-medium text-foreground/85 group-hover:text-foreground">
                        {route.name}
                      </span>
                      <ChevronRight className="size-3.5 text-foreground/35 group-hover:text-foreground/60 transition-colors" />
                    </div>
                  </Link>

                  <Divider className="w-full my-0" />

                  {route.items.map((item) => {
                    const Icon = itemIconMap[item.icon] ?? CircleHelp
                    return (
                      <Link
                        key={item.href}
                        href={item.href}
                        onClick={onNavigate}
                        className="group rounded-md px-2.5 py-2.5 transition-colors duration-200 hover:bg-sidebar/70 hover:border-border border border-transparent"
                      >
                        <div className="flex items-start gap-3">
                          <span className="mt-0.5 inline-flex size-7 shrink-0 items-center justify-center rounded-sm border border-border bg-background/70 text-foreground/60">
                            <Icon className="size-3.5" />
                          </span>
                          <span className="flex-1">
                            <span className="block text-sm font-medium text-foreground/85 group-hover:text-foreground">
                              {item.name}
                            </span>
                            <span className="block text-xs text-foreground/45 mt-0.5 leading-relaxed">
                              {item.description}
                            </span>
                          </span>
                          <ChevronRight className="mt-1 size-3.5 text-foreground/35 group-hover:text-foreground/60 transition-colors" />
                        </div>
                      </Link>
                    )
                  })}
                </div>
              </div>
            </motion.div>
          ))}
      </AnimatePresence>
    </div>
  )
}

