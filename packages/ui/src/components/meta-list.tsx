import type { ComponentProps, ReactNode } from "react"

import { cn } from "@workspace/ui/lib/utils"

export type MetaItem = {
  label: string
  value: ReactNode
}

type MetaListProps = ComponentProps<"dl"> & {
  items: MetaItem[]
}

export function MetaList({ items, className, ...props }: MetaListProps) {
  return (
    <dl className={cn("grid gap-5", className)} {...props}>
      {items.map((item) => (
        <div key={item.label} className="grid grid-cols-[120px_1fr] gap-4 text-sm leading-6">
          <dt className="pt-[3px] text-sm text-foreground">{item.label}</dt>
          <dd className="m-0 text-muted-foreground">{item.value}</dd>
        </div>
      ))}
    </dl>
  )
}
