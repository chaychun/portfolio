import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type SectionProps = ComponentProps<"section"> & {
  screenLabel?: string
}

export function Section({ className, screenLabel, ...props }: SectionProps) {
  return (
    <section
      data-screen-label={screenLabel}
      className={cn("py-18 cols:py-24", className)}
      {...props}
    />
  )
}
