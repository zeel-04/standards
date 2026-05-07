"use client"

import { useState } from "react"
import { ChevronDown, ChevronRight } from "lucide-react"
import { Pre, withIcons } from "nextra/components"

const NexPre = withIcons(Pre)

export function CodeBlock(props) {
  const [open, setOpen] = useState(false)

  return (
    <div className="not-prose my-4 rounded-lg border border-neutral-200 dark:border-neutral-800 overflow-hidden">
      <button
        onClick={() => setOpen((v) => !v)}
        className="flex w-full items-center gap-2 px-4 py-2.5 text-sm text-neutral-500 dark:text-neutral-400 hover:bg-neutral-50 dark:hover:bg-neutral-900 transition-colors select-none"
        aria-expanded={open}
      >
        {open ? (
          <ChevronDown className="h-3.5 w-3.5 shrink-0" />
        ) : (
          <ChevronRight className="h-3.5 w-3.5 shrink-0" />
        )}
        <span>{open ? "Hide code" : "View code"}</span>
      </button>

      {open && (
        <div className="border-t border-neutral-200 dark:border-neutral-800 [&_.nextra-code]:!mt-0 [&_pre]:!rounded-none [&_pre]:!border-0">
          <NexPre {...props} />
        </div>
      )}
    </div>
  )
}
