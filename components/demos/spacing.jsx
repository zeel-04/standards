"use client"

import { Check, Copy, Pencil, Share2, Trash2 } from "lucide-react"

export function DropdownSpacingDemo() {
  return (
    <div className="flex flex-col items-center gap-3">
      <span className="text-xs font-medium text-muted-foreground">
        Inline · rung 2 (8px)
      </span>
      <div className="bg-popover text-popover-foreground min-w-[14rem] rounded-md border p-1 shadow-md">
        <div className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
          <Pencil className="size-4 text-muted-foreground" />
          <span>Rename</span>
        </div>
        <div className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm bg-accent text-accent-foreground">
          <Copy className="size-4 text-muted-foreground" />
          <span>Duplicate</span>
          <Check className="ml-auto size-4 text-muted-foreground" />
        </div>
        <div className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm">
          <Share2 className="size-4 text-muted-foreground" />
          <span>Share</span>
        </div>
        <div className="bg-border -mx-1 my-1 h-px" />
        <div className="relative flex cursor-default items-center gap-2 rounded-sm px-2 py-1.5 text-sm text-destructive">
          <Trash2 className="size-4" />
          <span>Delete</span>
        </div>
      </div>
    </div>
  )
}
