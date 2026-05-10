import type { ComponentProps, ElementType } from "react"

import { cn } from "@workspace/ui/lib/utils"

type ContainerProps<T extends ElementType> = {
  as?: T
} & ComponentProps<T>

export function Container<T extends ElementType = "div">({
  as,
  className,
  ...props
}: ContainerProps<T>) {
  const Tag = (as ?? "div") as ElementType
  return (
    <Tag
      className={cn(
        "mx-auto w-full max-w-[var(--container-max)] px-[var(--container-gutter)]",
        className,
      )}
      {...props}
    />
  )
}
