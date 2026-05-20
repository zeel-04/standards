"use client"

import * as React from "react"
import { ChevronLeft } from "lucide-react"

export function StickyAnatomyDemo() {
  return (
    <div className="grid h-64 w-full max-w-sm grid-rows-[auto_1fr_auto] overflow-hidden rounded-lg border bg-background shadow-sm text-xs">
      <div className="flex items-center justify-between border-b bg-muted/40 px-4 py-2.5">
        <span className="font-medium text-foreground">sticky top</span>
        <span className="text-muted-foreground">title · context · top-right actions</span>
      </div>
      <div className="flex flex-col items-center justify-center gap-1.5 overflow-y-auto bg-muted/10 px-4 py-3">
        <div className="flex flex-col items-center gap-1 text-muted-foreground">
          <span className="font-medium text-foreground">scrollable middle</span>
          <span>the only region that scrolls</span>
        </div>
        <div className="mt-2 flex flex-col gap-1 w-full opacity-30">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="h-2 rounded bg-muted-foreground/40" style={{ width: `${70 + (i % 3) * 10}%` }} />
          ))}
        </div>
      </div>
      <div className="flex items-center justify-between border-t bg-muted/40 px-4 py-2.5">
        <span className="text-muted-foreground">optional</span>
        <span className="font-medium text-foreground">sticky bottom · commit actions</span>
      </div>
    </div>
  )
}

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

function FormBody({ idPrefix }) {
  return (
    <div className="space-y-4">
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-name`}>Name</Label>
        <Input id={`${idPrefix}-name`} defaultValue="Untitled project" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-slug`}>Slug</Label>
        <Input id={`${idPrefix}-slug`} defaultValue="untitled-project" />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-visibility`}>Visibility</Label>
        <select
          id={`${idPrefix}-visibility`}
          className="flex h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          defaultValue="Private"
        >
          <option>Private</option>
          <option>Team</option>
          <option>Public</option>
        </select>
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-desc`}>Description</Label>
        <textarea
          id={`${idPrefix}-desc`}
          rows={4}
          className="flex w-full rounded-md border border-input bg-background px-3 py-2 text-sm shadow-sm focus-visible:outline-none focus-visible:ring-1 focus-visible:ring-ring"
          defaultValue="Internal design system & standards for product teams."
        />
      </div>
      <div className="space-y-1.5">
        <Label htmlFor={`${idPrefix}-owner`}>Owner email</Label>
        <Input
          id={`${idPrefix}-owner`}
          type="email"
          defaultValue="frontier@frontierstrategies.ai"
        />
      </div>
    </div>
  )
}

export function StickyActionBarDesktopDemo() {
  return (
    <div className="grid h-110 w-full max-w-2xl grid-rows-[auto_1fr_auto] overflow-hidden rounded-lg border bg-background shadow-sm">
      <header className="flex items-center justify-between border-b bg-background px-5 py-3">
        <h3 className="text-sm font-semibold">Edit project</h3>
      </header>
      <main className="overflow-y-auto bg-muted/30 px-5 py-5">
        <div className="mx-auto max-w-md">
          <FormBody idPrefix="sticky-desktop" />
        </div>
      </main>
      <footer className="flex items-center justify-end gap-2 border-t bg-background px-5 py-3">
        <Button variant="outline" size="sm">
          Cancel
        </Button>
        <Button size="sm">Save</Button>
      </footer>
    </div>
  )
}

function MobileFrame({ children }) {
  return (
    <div className="grid h-130 w-[320px] grid-rows-[auto_1fr_auto] overflow-hidden rounded-xl border bg-background shadow-sm">
      {children}
    </div>
  )
}

export function StickyActionBarMobileTopDemo() {
  return (
    <MobileFrame>
      <header className="flex items-center justify-between gap-2 border-b bg-background px-3 py-2.5">
        <div className="flex min-w-0 items-center gap-1.5">
          <Button
            variant="ghost"
            size="icon"
            className="h-8 w-8"
            aria-label="Back"
          >
            <ChevronLeft className="h-4 w-4" />
          </Button>
          <h3 className="truncate text-sm font-semibold">Edit project</h3>
        </div>
        <div className="flex shrink-0 items-center gap-1">
          <Button variant="ghost" size="sm" className="h-8 px-2">
            Cancel
          </Button>
          <Button size="sm" className="h-8 px-3">
            Save
          </Button>
        </div>
      </header>
      <main className="overflow-y-auto bg-muted/30 px-4 py-4">
        <FormBody idPrefix="sticky-mobile-top" />
      </main>
      <div />
    </MobileFrame>
  )
}

export function StickyActionBarMobileFooterDemo() {
  return (
    <MobileFrame>
      <header className="flex items-center gap-1.5 border-b bg-background px-3 py-2.5">
        <Button
          variant="ghost"
          size="icon"
          className="h-8 w-8"
          aria-label="Back"
        >
          <ChevronLeft className="h-4 w-4" />
        </Button>
        <h3 className="truncate text-sm font-semibold">Review order</h3>
      </header>
      <main className="overflow-y-auto bg-muted/30 px-4 py-4">
        <FormBody idPrefix="sticky-mobile-footer" />
      </main>
      <footer className="border-t bg-background px-4 pb-5 pt-3">
        <Button className="h-11 w-full">Save changes</Button>
      </footer>
    </MobileFrame>
  )
}
