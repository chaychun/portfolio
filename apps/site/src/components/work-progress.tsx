import { cn } from "@workspace/ui/lib/utils"

type WorkProgressProps = {
  active: number
  total?: number
}

export function WorkProgress({ active, total = 7 }: WorkProgressProps) {
  return (
    <div className="mb-[18px] flex gap-1.5" aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-[2px] flex-1 rounded-[2px]",
            i === active ? "flex-[0_0_36px] bg-brand" : "bg-border",
          )}
        />
      ))}
    </div>
  )
}
