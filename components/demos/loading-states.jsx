"use client"

import * as React from "react"
import { Search } from "lucide-react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Spinner } from "@/components/ui/spinner"
import { cn } from "@/lib/utils"

export function ButtonLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Button disabled>
        <Spinner />
        Saving…
      </Button>
      <Button variant="outline" disabled>
        Refresh
        <Spinner />
      </Button>
    </div>
  )
}

function Badge({ className, children }) {
  return (
    <span
      className={cn(
        "inline-flex items-center gap-1.5 rounded-md border bg-secondary px-2 py-0.5 text-xs font-medium text-secondary-foreground",
        className
      )}
    >
      {children}
    </span>
  )
}

export function BadgeLoadingDemo() {
  return (
    <div className="flex flex-wrap items-center gap-3">
      <Badge>
        <Spinner className="size-3" />
        Syncing
      </Badge>
      <Badge className="border-amber-200 bg-amber-50 text-amber-900 dark:border-amber-900/40 dark:bg-amber-950/40 dark:text-amber-200">
        Pending
        <Spinner className="size-3" />
      </Badge>
    </div>
  )
}

export function InputGroupLoadingDemo() {
  return (
    <div className="w-full max-w-sm">
      <div className="relative">
        <Search
          aria-hidden
          className="pointer-events-none absolute top-1/2 left-3 size-4 -translate-y-1/2 text-muted-foreground"
        />
        <Input
          placeholder="Search requests…"
          defaultValue="coffee"
          className="pr-9 pl-9"
        />
        <Spinner className="absolute top-1/2 right-3 -translate-y-1/2 text-muted-foreground" />
      </div>
      <p className="mt-2 text-xs text-muted-foreground">
        Searching as you type — results update inline.
      </p>
    </div>
  )
}

export function InlineRefreshDemo() {
  return (
    <div className="w-full max-w-sm rounded-lg border bg-card">
      <div className="flex items-center justify-between gap-3 border-b px-4 py-2.5">
        <p className="text-sm font-medium">Activity</p>
        <span className="inline-flex items-center gap-1.5 text-xs text-muted-foreground">
          <Spinner className="size-3" />
          Refreshing
        </span>
      </div>
      <ul className="divide-y text-sm">
        <li className="px-4 py-2.5">Dana approved your request</li>
        <li className="px-4 py-2.5">Receipt added to #1042</li>
        <li className="px-4 py-2.5">You submitted a new request</li>
      </ul>
    </div>
  )
}
