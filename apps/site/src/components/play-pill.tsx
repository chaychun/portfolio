export function PlayPill() {
  return (
    <span className="absolute bottom-4 left-4 z-[2] inline-flex items-center gap-1.5 rounded-full border border-border bg-[color-mix(in_oklab,var(--background)_85%,transparent)] py-1 pr-2.5 pl-2 text-[11px] text-muted-foreground backdrop-blur-md">
      <svg viewBox="0 0 8 8" className="h-[9px] w-[9px] fill-foreground" aria-hidden="true">
        <polygon points="1,1 7,4 1,7" />
      </svg>
      Play
    </span>
  )
}
