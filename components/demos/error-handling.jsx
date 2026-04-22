"use client"

import * as React from "react"
import { AlertTriangle } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function InlineFieldErrorDemo() {
  return (
    <div className="w-full max-w-sm space-y-1.5">
      <Label htmlFor="email-err-demo">Work email</Label>
      <Input
        id="email-err-demo"
        type="email"
        defaultValue="alex@gmail"
        aria-invalid
        aria-describedby="email-err-demo-error"
        className="aria-invalid:border-destructive"
      />
      <p id="email-err-demo-error" className="text-xs text-destructive">
        Enter a valid work email.
      </p>
    </div>
  )
}

export function SectionErrorDemo() {
  const [loading, setLoading] = React.useState(false)

  return (
    <div className="w-full max-w-md flex flex-col items-center gap-2 rounded-lg border bg-card px-6 py-8 text-center">
      <AlertTriangle className="h-8 w-8 text-muted-foreground" aria-hidden />
      <p className="text-sm font-medium">Couldn&apos;t load activity</p>
      <p className="text-xs text-muted-foreground max-w-sm">
        The feed didn&apos;t respond. This hasn&apos;t affected your other data.
      </p>
      <button
        onClick={() => {
          setLoading(true)
          setTimeout(() => setLoading(false), 800)
        }}
        className="mt-2 h-9 rounded-md border px-4 text-sm hover:bg-accent disabled:opacity-60"
        disabled={loading}
      >
        {loading ? "Retrying…" : "Retry"}
      </button>
    </div>
  )
}
