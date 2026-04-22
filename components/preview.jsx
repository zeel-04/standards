"use client"

import { cn } from "@/lib/utils"

export function Preview({ children, className }) {
  return (
    <div
      className={cn(
        "not-prose mt-6 flex min-h-[200px] items-center justify-center rounded-lg border bg-background p-8",
        className
      )}
    >
      {children}
    </div>
  )
}
