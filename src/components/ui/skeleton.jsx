
import React from "react"
import { cn } from "@/lib/utils"

function Skeleton({
  className,
  ...props
}) {
  return (
    <div
      className={cn("animate-pulse rounded-md bg-tan/20", className)}
      {...props}
    />
  )
}

export { Skeleton }
