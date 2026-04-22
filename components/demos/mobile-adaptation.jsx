"use client"

import * as React from "react"
import { Menu, MoreHorizontal, X } from "lucide-react"

import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetTrigger,
} from "@/components/ui/sheet"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"

function VariantFrame({ label, width, children }) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-xs font-medium text-muted-foreground">{label}</span>
      <div
        className="relative overflow-hidden rounded-lg border bg-background shadow-sm"
        style={{ width, maxWidth: "100%" }}
      >
        {children}
      </div>
    </div>
  )
}

const rows = [
  { id: "REQ-2039", requester: "Alex Park", amount: "$128.40", status: "Pending" },
  { id: "REQ-2040", requester: "Jordan Lee", amount: "$42.00", status: "Approved" },
  { id: "REQ-2041", requester: "Sam Kim", amount: "$312.15", status: "Pending" },
]

export function TableToCardsDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <VariantFrame label="Desktop · data table" width={460}>
        <table className="w-full">
          <thead>
            <tr className="border-b text-left text-xs text-muted-foreground">
              <th className="px-3 py-2 font-medium">Requester</th>
              <th className="px-3 py-2 font-medium">Amount</th>
              <th className="px-3 py-2 font-medium">Status</th>
            </tr>
          </thead>
          <tbody>
            {rows.map((r) => (
              <tr key={r.id} className="border-b last:border-0 text-sm">
                <td className="px-3 py-2">{r.requester}</td>
                <td className="px-3 py-2">{r.amount}</td>
                <td className="px-3 py-2 text-muted-foreground">{r.status}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </VariantFrame>

      <VariantFrame label="Mobile · stacked cards" width={280}>
        <ul className="divide-y">
          {rows.map((r) => (
            <li
              key={r.id}
              className="flex items-center justify-between px-4 py-3"
            >
              <div className="min-w-0">
                <p className="truncate text-sm font-medium">{r.requester}</p>
                <p className="text-xs text-muted-foreground">{r.id}</p>
              </div>
              <div className="text-right">
                <p className="text-sm font-medium">{r.amount}</p>
                <span className="text-xs text-muted-foreground">{r.status}</span>
              </div>
            </li>
          ))}
        </ul>
      </VariantFrame>
    </div>
  )
}

export function SidebarToSheetDemo() {
  return (
    <Sheet>
      <SheetTrigger asChild>
        <button
          aria-label="Open menu"
          className="grid h-11 w-11 place-items-center rounded-md border hover:bg-accent"
        >
          <Menu className="h-5 w-5" />
        </button>
      </SheetTrigger>
      <SheetContent side="left" className="w-80 p-0">
        <SheetHeader>
          <SheetTitle>Navigation</SheetTitle>
          <SheetDescription>Same nav component as the desktop sidebar.</SheetDescription>
        </SheetHeader>
        <nav className="px-4 pb-4 text-sm">
          <ul className="space-y-1">
            <li className="rounded-md px-3 py-2 bg-accent font-medium">Requests</li>
            <li className="rounded-md px-3 py-2 hover:bg-accent">Approvals</li>
            <li className="rounded-md px-3 py-2 hover:bg-accent">Settings</li>
          </ul>
        </nav>
      </SheetContent>
    </Sheet>
  )
}

function ModalSurface({ children }) {
  return (
    <div className="rounded-md border bg-background p-4 shadow-lg">
      {children}
    </div>
  )
}

function FormPreview() {
  return (
    <div className="space-y-3">
      <div className="flex items-start justify-between">
        <div>
          <p className="text-sm font-medium">New request</p>
          <p className="text-xs text-muted-foreground">Submit for approval</p>
        </div>
        <X className="h-4 w-4 text-muted-foreground" />
      </div>
      <div className="space-y-2">
        <div className="h-2 w-16 rounded bg-muted" />
        <div className="h-8 rounded-md border bg-background" />
      </div>
      <div className="space-y-2">
        <div className="h-2 w-20 rounded bg-muted" />
        <div className="h-8 rounded-md border bg-background" />
      </div>
      <div className="h-9 rounded-md bg-primary" />
    </div>
  )
}

export function ModalToSheetDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <VariantFrame label="Desktop · centered Dialog" width={420}>
        <div className="relative h-[260px] bg-muted/30 p-4">
          <div className="space-y-2 opacity-40">
            <div className="h-2 w-24 rounded bg-foreground/40" />
            <div className="h-2 w-40 rounded bg-foreground/20" />
            <div className="h-2 w-32 rounded bg-foreground/20" />
          </div>
          <div className="absolute inset-0 flex items-center justify-center bg-foreground/30 backdrop-blur-[1px]">
            <div className="w-64">
              <ModalSurface>
                <FormPreview />
              </ModalSurface>
            </div>
          </div>
        </div>
      </VariantFrame>

      <VariantFrame label="Mobile · full-screen Sheet" width={260}>
        <div className="h-[380px] bg-background p-4">
          <FormPreview />
        </div>
      </VariantFrame>
    </div>
  )
}

function HoverRow({ requester, amount, hoverOnly }) {
  return (
    <div className="group flex items-center justify-between px-4 py-3">
      <div>
        <p className="text-sm font-medium">{requester}</p>
        <p className="text-xs text-muted-foreground">{amount}</p>
      </div>
      <div
        className={
          hoverOnly
            ? "opacity-0 transition-opacity group-hover:opacity-100 flex gap-1"
            : "flex gap-1"
        }
      >
        <button className="rounded-md border px-2 py-1 text-xs">View</button>
        <button className="rounded-md border px-2 py-1 text-xs">Edit</button>
      </div>
    </div>
  )
}

export function HoverActionsToMenuDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <VariantFrame label="Desktop · hover to reveal actions" width={360}>
        <div className="divide-y">
          <HoverRow requester="Alex Park" amount="REQ-2039 · $128.40" hoverOnly />
          <HoverRow requester="Jordan Lee" amount="REQ-2040 · $42.00" hoverOnly />
        </div>
        <p className="border-t bg-muted/40 px-4 py-2 text-[11px] text-muted-foreground">
          Hover a row to see the affordance.
        </p>
      </VariantFrame>

      <VariantFrame label="Mobile · always-visible menu" width={280}>
        <div className="divide-y">
          {[
            { id: "REQ-2039", who: "Alex Park · $128.40" },
            { id: "REQ-2040", who: "Jordan Lee · $42.00" },
          ].map((r) => (
            <div key={r.id} className="flex items-center justify-between px-4 py-3">
              <div>
                <p className="text-sm font-medium">{r.id}</p>
                <p className="text-xs text-muted-foreground">{r.who}</p>
              </div>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <button
                    aria-label="Row actions"
                    className="grid h-9 w-9 place-items-center rounded-md hover:bg-accent"
                  >
                    <MoreHorizontal className="h-5 w-5" />
                  </button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuItem>View</DropdownMenuItem>
                  <DropdownMenuItem>Duplicate</DropdownMenuItem>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem variant="destructive">Delete</DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          ))}
        </div>
      </VariantFrame>
    </div>
  )
}

export function BottomBarDemo() {
  return (
    <div className="flex flex-wrap items-start gap-6">
      <VariantFrame label="Desktop · top toolbar" width={420}>
        <div className="flex flex-col h-[260px]">
          <div className="flex items-center justify-end gap-2 border-b bg-muted/30 px-4 py-2">
            <button className="rounded-md border px-3 py-1.5 text-xs">Cancel</button>
            <button className="rounded-md bg-primary px-3 py-1.5 text-xs font-medium text-primary-foreground">
              Submit request
            </button>
          </div>
          <main className="flex-1 space-y-2 p-4">
            <div className="h-2 w-20 rounded bg-muted" />
            <div className="h-8 rounded-md border" />
            <div className="h-2 w-16 rounded bg-muted" />
            <div className="h-8 rounded-md border" />
          </main>
        </div>
      </VariantFrame>

      <VariantFrame label="Mobile · sticky bottom action bar" width={260}>
        <div className="flex flex-col h-[380px]">
          <main className="flex-1 space-y-2 p-4">
            <div className="h-2 w-20 rounded bg-muted" />
            <div className="h-8 rounded-md border" />
            <div className="h-2 w-16 rounded bg-muted" />
            <div className="h-8 rounded-md border" />
            <div className="h-2 w-24 rounded bg-muted" />
            <div className="h-8 rounded-md border" />
          </main>
          <div className="border-t bg-background px-4 py-3">
            <button className="h-11 w-full rounded-md bg-primary text-sm font-medium text-primary-foreground">
              Submit request
            </button>
          </div>
        </div>
      </VariantFrame>
    </div>
  )
}
