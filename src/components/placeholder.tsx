import { cn } from "@/lib/utils"

type PlaceholderProps = {
  label?: string
  className?: string
}

export function Placeholder({ label, className }: PlaceholderProps) {
  return (
    <div
      className={cn(
        "absolute inset-0 flex items-center justify-center bg-muted",
        "bg-[repeating-linear-gradient(135deg,transparent_0_12px,color-mix(in_oklab,var(--foreground)_4%,transparent)_12px_13px)]",
        className,
      )}
    >
      {label ? (
        <span className="rounded-full border border-border bg-background px-2.5 py-1.5 text-[11px] tracking-wide text-muted-foreground">
          {label}
        </span>
      ) : null}
    </div>
  )
}
