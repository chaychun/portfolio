import type { ComponentProps } from "react"

import { cn } from "@workspace/ui/lib/utils"

export function Divider({ className, ...props }: ComponentProps<"hr">) {
  return <hr className={cn("h-px w-full border-0 bg-border", className)} {...props} />
}
