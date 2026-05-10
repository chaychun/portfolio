import type { Interaction } from "@/data/interactions"

import { PlayPill } from "@/components/play-pill"
import { Video } from "@/components/video"

type InteractionCardProps = {
  interaction: Interaction
}

export function InteractionCard({ interaction }: InteractionCardProps) {
  const hasVideo = interaction.playbackId !== ""
  return (
    <a href="#" className="group grid cursor-pointer gap-5">
      <div className="relative aspect-[5/4] overflow-hidden rounded-[18px] bg-muted transition-colors duration-200 ease-out group-hover:bg-[color-mix(in_oklab,var(--muted)_88%,var(--foreground)_4%)]">
        {hasVideo ? (
          <Video playbackId={interaction.playbackId} poster={interaction.poster} />
        ) : (
          <div className="absolute inset-[14%_18%] rounded-[10px] border border-border bg-background bg-[repeating-linear-gradient(135deg,transparent_0_12px,color-mix(in_oklab,var(--foreground)_4%,transparent)_12px_13px)] shadow-[0_18px_40px_-28px_oklch(0.2_0.01_60_/_0.35)]">
            <div className="flex h-full items-center justify-center">
              <span className="rounded-full border border-border bg-background px-2 py-1 text-[10.5px] text-muted-foreground">
                {interaction.duration ? `video · 4:3 · ${interaction.duration}` : "video · 4:3"}
              </span>
            </div>
          </div>
        )}
        <PlayPill />
      </div>
      <div className="grid gap-2 px-1">
        <span className="text-xl leading-tight font-normal tracking-[-0.012em]">
          {interaction.title}
        </span>
        <span className="max-w-[44ch] text-[14.5px] leading-[1.55] [text-wrap:pretty] text-muted-foreground">
          {interaction.description}
        </span>
      </div>
    </a>
  )
}
