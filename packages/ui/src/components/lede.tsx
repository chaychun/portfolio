import type { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

type LedeProps = ComponentProps<"p"> & {
  variant?: "default" | "lead"
}

export function Lede({ className, variant = "default", ...props }: LedeProps) {
  return (
    <p className={cn(variant === "lead" ? "text-about-lead" : "text-lede", className)} {...props} />
  )
}
