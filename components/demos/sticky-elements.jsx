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

const TABLE_ROWS = [
  { id: 1,  name: "Alice Johnson",   role: "Designer",         status: "Active",   joined: "Jan 2023" },
  { id: 2,  name: "Ben Carter",      role: "Engineer",         status: "Active",   joined: "Mar 2023" },
  { id: 3,  name: "Clara Diaz",      role: "Product Manager",  status: "On leave", joined: "Jun 2022" },
  { id: 4,  name: "David Kim",       role: "Engineer",         status: "Active",   joined: "Sep 2023" },
  { id: 5,  name: "Eva Müller",      role: "Designer",         status: "Active",   joined: "Nov 2022" },
  { id: 6,  name: "Frank O'Brien",   role: "Engineer",         status: "Inactive", joined: "Feb 2021" },
  { id: 7,  name: "Grace Lee",       role: "QA Engineer",      status: "Active",   joined: "Apr 2023" },
  { id: 8,  name: "Henry Patel",     role: "Engineer",         status: "Active",   joined: "Jul 2022" },
  { id: 9,  name: "Isla Nguyen",     role: "Product Manager",  status: "Active",   joined: "Oct 2023" },
  { id: 10, name: "James Wright",    role: "Designer",         status: "Inactive", joined: "Dec 2021" },
  { id: 11, name: "Kira Santos",     role: "Engineer",         status: "Active",   joined: "Jan 2024" },
  { id: 12, name: "Liam Torres",     role: "Engineer",         status: "Active",   joined: "Mar 2022" },
  { id: 13, name: "Maya Chen",       role: "QA Engineer",      status: "On leave", joined: "Aug 2023" },
  { id: 14, name: "Noah Okafor",     role: "Designer",         status: "Active",   joined: "May 2023" },
  { id: 15, name: "Olivia Park",     role: "Engineer",         status: "Active",   joined: "Feb 2024" },
  { id: 16, name: "Pedro Alves",     role: "Product Manager",  status: "Inactive", joined: "Jun 2021" },
  { id: 17, name: "Quinn Blake",     role: "Engineer",         status: "Active",   joined: "Sep 2022" },
  { id: 18, name: "Rita Kovač",      role: "Designer",         status: "Active",   joined: "Nov 2023" },
  { id: 19, name: "Sam Fernandez",   role: "QA Engineer",      status: "Active",   joined: "Jan 2022" },
  { id: 20, name: "Tara Walsh",      role: "Engineer",         status: "Active",   joined: "Apr 2024" },
  { id: 21, name: "Uma Krishnan",    role: "Product Manager",  status: "Active",   joined: "May 2022" },
  { id: 22, name: "Victor Nwosu",    role: "Engineer",         status: "Active",   joined: "Jul 2023" },
  { id: 23, name: "Wendy Larsson",   role: "Designer",         status: "On leave", joined: "Sep 2021" },
  { id: 24, name: "Xander Bell",     role: "QA Engineer",      status: "Active",   joined: "Dec 2023" },
  { id: 25, name: "Yara Hassan",     role: "Engineer",         status: "Active",   joined: "Feb 2023" },
  { id: 26, name: "Zoe Tanaka",      role: "Designer",         status: "Inactive", joined: "Apr 2022" },
  { id: 27, name: "Aaron Mills",     role: "Engineer",         status: "Active",   joined: "Jun 2023" },
  { id: 28, name: "Bella Rossi",     role: "Product Manager",  status: "Active",   joined: "Aug 2022" },
  { id: 29, name: "Carlos Vega",     role: "QA Engineer",      status: "Active",   joined: "Oct 2021" },
  { id: 30, name: "Diana Osei",      role: "Engineer",         status: "On leave", joined: "Mar 2024" },
]

const ROWS_PER_PAGE = 10

const STATUS_CLASSES = {
  "Active":   "bg-green-100 text-green-800",
  "Inactive": "bg-neutral-100 text-neutral-600",
  "On leave": "bg-amber-100 text-amber-800",
}

export function StickyTableDemo() {
  const [page, setPage] = React.useState(0)
  const totalPages = Math.ceil(TABLE_ROWS.length / ROWS_PER_PAGE)
  const start = page * ROWS_PER_PAGE
  const visibleRows = TABLE_ROWS.slice(start, start + ROWS_PER_PAGE)

  return (
    <div className="w-full max-w-2xl overflow-hidden rounded-lg border bg-background shadow-sm text-sm">
      <div className="h-64 overflow-auto">
        <table className="w-full border-collapse">
          <thead className="sticky top-0 z-10 bg-background">
            <tr className="border-b">
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide w-10">#</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Name</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Role</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Status</th>
              <th className="px-4 py-2.5 text-left text-xs font-semibold text-muted-foreground uppercase tracking-wide">Joined</th>
            </tr>
          </thead>
          <tbody>
            {visibleRows.map((row) => (
              <tr key={row.id} className="border-b last:border-0 hover:bg-muted/40 transition-colors">
                <td className="px-4 py-3 text-muted-foreground">{row.id}</td>
                <td className="px-4 py-3 font-medium">{row.name}</td>
                <td className="px-4 py-3 text-muted-foreground">{row.role}</td>
                <td className="px-4 py-3">
                  <span className={`inline-flex items-center rounded-full px-2 py-0.5 text-xs font-medium ${STATUS_CLASSES[row.status]}`}>
                    {row.status}
                  </span>
                </td>
                <td className="px-4 py-3 text-muted-foreground">{row.joined}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
      <div className="flex items-center justify-between border-t bg-background px-4 py-3">
        <span className="text-xs text-muted-foreground">
          Showing {start + 1}–{Math.min(start + ROWS_PER_PAGE, TABLE_ROWS.length)} of {TABLE_ROWS.length}
        </span>
        <div className="flex items-center gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p - 1)}
            disabled={page === 0}
          >
            Prev
          </Button>
          <Button
            variant="outline"
            size="sm"
            onClick={() => setPage((p) => p + 1)}
            disabled={page === totalPages - 1}
          >
            Next
          </Button>
        </div>
      </div>
    </div>
  )
}
