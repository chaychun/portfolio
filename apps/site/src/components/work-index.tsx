type WorkIndexProps = {
  index: number
  total: number
}

export function WorkIndex({ index, total }: WorkIndexProps) {
  const fmt = (n: number) => String(n).padStart(2, "0")
  return (
    <div className="absolute top-[18px] left-5 rounded-full border border-border bg-[color-mix(in_oklab,var(--background)_80%,transparent)] px-2 py-1 text-[11px] text-muted-foreground backdrop-blur-md">
      {fmt(index)} / {fmt(total)}
    </div>
  )
}
