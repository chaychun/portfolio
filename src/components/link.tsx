import type { ComponentProps } from "react"

import { cn } from "@/lib/utils"

type LinkProps = ComponentProps<"a"> & {
  variant?: "default" | "quiet"
}

const base = "transition-colors duration-150 ease-[ease] hover:text-brand"

const variants = {
  default: "text-stone-700 dark:text-stone-300",
  quiet: "",
}

export function Link({ variant = "default", className, href, ...props }: LinkProps) {
  const external = typeof href === "string" && /^https?:\/\//.test(href)
  const externalProps = external ? { target: "_blank", rel: "noopener noreferrer" } : {}
  return (
    <a
      className={cn(base, variants[variant], className)}
      href={href}
      {...externalProps}
      {...props}
    />
  )
}
