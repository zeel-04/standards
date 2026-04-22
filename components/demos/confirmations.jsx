"use client"

import * as React from "react"
import { toast } from "sonner"

import { Button } from "@/components/ui/button"
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
  AlertDialogTrigger,
} from "@/components/ui/alert-dialog"

export function DestructiveDialogDemo() {
  return (
    <AlertDialog>
      <AlertDialogTrigger asChild>
        <Button variant="destructive">Delete request</Button>
      </AlertDialogTrigger>
      <AlertDialogContent>
        <AlertDialogHeader>
          <AlertDialogTitle>Delete request REQ-2039?</AlertDialogTitle>
          <AlertDialogDescription>
            This can&apos;t be undone. Any attached receipts are also removed.
          </AlertDialogDescription>
        </AlertDialogHeader>
        <AlertDialogFooter>
          <AlertDialogCancel>Cancel</AlertDialogCancel>
          <AlertDialogAction className="bg-destructive text-white hover:bg-destructive/90">
            Delete request
          </AlertDialogAction>
        </AlertDialogFooter>
      </AlertDialogContent>
    </AlertDialog>
  )
}

export function UndoToastDemo() {
  const [archived, setArchived] = React.useState(false)

  const archive = () => {
    setArchived(true)
    toast("Request archived", {
      action: {
        label: "Undo",
        onClick: () => setArchived(false),
      },
      duration: 8000,
    })
  }

  return (
    <div className="flex items-center gap-3">
      <Button variant="outline" onClick={archive} disabled={archived}>
        {archived ? "Archived" : "Archive request"}
      </Button>
      {archived && (
        <span className="text-sm text-muted-foreground">
          Toast shown at bottom-right
        </span>
      )}
    </div>
  )
}
