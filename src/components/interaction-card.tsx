import type { Interaction } from "@/data/interactions"

import { Link } from "@tanstack/react-router"

import { MarkdownText } from "@/components/markdown-text"
import { Video } from "@/components/video"
import { hasDemo } from "@/interactions/registry"

type InteractionCardProps = {
  interaction: Interaction
}

export function InteractionCard({ interaction }: InteractionCardProps) {
  const hasVideo = interaction.playbackId !== ""
  const linkable = interaction.demo && hasDemo(interaction.slug)

  const inner = (
    <>
      <div className="relative aspect-[4/3] overflow-hidden">
        {hasVideo ? (
          <Video
            playbackId={interaction.playbackId}
            className="absolute inset-0 h-full w-full"
            style={{ "--media-object-fit": "cover" }}
          />
        ) : (
          <div className="absolute inset-[14%_18%] rounded-[10px] border border-border bg-background bg-[repeating-linear-gradient(135deg,transparent_0_12px,color-mix(in_oklab,var(--foreground)_4%,transparent)_12px_13px)] shadow-[0_18px_40px_-28px_oklch(0.2_0.01_60_/_0.35)]">
            <div className="flex h-full items-center justify-center">
              <span className="rounded-full border border-border bg-background px-2 py-1 text-[10.5px] text-muted-foreground">
                video · 4:3
              </span>
            </div>
          </div>
        )}
      </div>
      <div className="grid gap-2 px-1">
        <span className="text-xl leading-tight font-normal tracking-[-0.012em]">
          {interaction.title}
        </span>
        <span className="text-[14.5px] leading-[1.55] [text-wrap:pretty] text-muted-foreground">
          <MarkdownText>{interaction.description}</MarkdownText>
        </span>
      </div>
    </>
  )

  return linkable ? (
    <Link to="/interactions/$slug" params={{ slug: interaction.slug }} className="grid gap-5">
      {inner}
    </Link>
  ) : (
    <div className="grid gap-5">{inner}</div>
  )
}
