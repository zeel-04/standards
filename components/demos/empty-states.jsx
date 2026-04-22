"use client"

import * as React from "react"
import { FileText, SearchX, Lock, Settings } from "lucide-react"

import { Button } from "@/components/ui/button"
import { EmptyState } from "@/components/ui/empty-state"

export function NoRecordsEmptyDemo() {
  return (
    <EmptyState
      icon={<FileText className="h-10 w-10 text-muted-foreground" />}
      title="No requests yet"
      description="When someone on your team submits a reimbursement request, it'll show up here."
      action={<Button>Create request</Button>}
    />
  )
}

export function NoFilterMatchesDemo() {
  const query = "coffee"
  return (
    <EmptyState
      icon={<SearchX className="h-10 w-10 text-muted-foreground" />}
      title="No matches"
      description={`No requests match "${query}". Try a broader search or clear your filters.`}
      action={<Button variant="ghost">Clear filters</Button>}
    />
  )
}

export function PermissionGatedEmptyDemo() {
  return (
    <EmptyState
      icon={<Lock className="h-10 w-10 text-muted-foreground" />}
      title="No assigned approvals"
      description="You'll see approvals here when a request is routed to you."
    />
  )
}

export function BlockedSetupEmptyDemo() {
  return (
    <EmptyState
      icon={<Settings className="h-10 w-10 text-muted-foreground" />}
      title="Add a payment method to continue"
      description="Reimbursements need a verified payment method before they can be issued."
      action={
        <Button asChild>
          <a href="#">Go to settings</a>
        </Button>
      }
    />
  )
}
