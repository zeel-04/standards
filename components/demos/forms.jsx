"use client"

import * as React from "react"
import { Loader2 } from "lucide-react"

import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"

export function EmailFieldDemo() {
  const [value, setValue] = React.useState("")
  const [touched, setTouched] = React.useState(false)

  const hasError = touched && !/^\S+@\S+\.\S+$/.test(value)

  return (
    <div className="w-full max-w-sm space-y-1.5">
      <Label htmlFor="email-field-demo">Work email</Label>
      <Input
        id="email-field-demo"
        type="email"
        value={value}
        onChange={(e) => setValue(e.target.value)}
        onBlur={() => setTouched(true)}
        aria-invalid={hasError}
        aria-describedby="email-field-demo-hint email-field-demo-error"
      />
      {!hasError && (
        <p
          id="email-field-demo-hint"
          className="text-xs text-muted-foreground"
        >
          We&apos;ll send a verification link.
        </p>
      )}
      {hasError && (
        <p id="email-field-demo-error" className="text-xs text-destructive">
          Enter a valid work email.
        </p>
      )}
    </div>
  )
}

export function FormLevelErrorDemo() {
  return (
    <div
      role="alert"
      className="w-full max-w-md rounded-md border border-destructive/30 bg-destructive/5 px-3 py-2 text-sm text-destructive"
    >
      This request conflicts with request #422. Review before resubmitting.
    </div>
  )
}

export function SubmitStateDemo() {
  const [isSubmitting, setIsSubmitting] = React.useState(false)

  return (
    <button
      type="button"
      disabled={isSubmitting}
      onClick={() => {
        setIsSubmitting(true)
        setTimeout(() => setIsSubmitting(false), 1400)
      }}
      className="inline-flex items-center justify-center gap-2 h-11 md:h-9 rounded-md bg-primary px-4 text-sm font-medium text-primary-foreground disabled:opacity-60 disabled:pointer-events-none"
    >
      {isSubmitting && <Loader2 className="h-4 w-4 animate-spin" aria-hidden />}
      {isSubmitting ? "Submitting…" : "Submit request"}
    </button>
  )
}
