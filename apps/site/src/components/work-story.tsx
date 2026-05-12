import { useState } from "react"

import { cn } from "@workspace/ui/lib/utils"

import { Placeholder } from "@/components/placeholder"

export type StorySlide =
  | {
      kind: "image"
      src?: string
      label?: string
    }
  | {
      kind: "video"
      playbackId?: string
      label?: string
    }

export type StoryCarousel = {
  active: number
  total: number
  current: StorySlide | undefined
  next: () => void
  prev: () => void
}

export function useStoryCarousel(slides: StorySlide[]): StoryCarousel {
  const [active, setActive] = useState(0)
  const total = slides.length
  const current = slides[active]

  return {
    active,
    total,
    current,
    next: () => setActive((i) => (i + 1) % total),
    prev: () => setActive((i) => (i === 0 ? total - 1 : i - 1)),
  }
}

type StoryHeroProps = {
  story: StoryCarousel
  className?: string
}

export function StoryHero({ story, className }: StoryHeroProps) {
  const { current, active, total, next, prev } = story
  const label =
    current?.label ?? `slide ${active + 1}/${total} · ${current?.kind ?? "image"}`

  return (
    <div className={cn("relative aspect-[16/9] overflow-hidden", className)}>
      <div key={active} className="absolute inset-0 animate-in fade-in duration-300 ease-out">
        <Placeholder label={label} />
      </div>
      <button
        type="button"
        aria-label="Previous slide"
        onClick={prev}
        className="absolute inset-y-0 left-0 z-10 w-[35%] cursor-w-resize"
      />
      <button
        type="button"
        aria-label="Next slide"
        onClick={next}
        className="absolute inset-y-0 right-0 z-10 w-[65%] cursor-e-resize"
      />
    </div>
  )
}

type StoryBarsProps = {
  story: StoryCarousel
  className?: string
}

export function StoryBars({ story, className }: StoryBarsProps) {
  const { total, active } = story
  return (
    <div className={cn("mb-[18px] flex gap-1.5", className)} aria-hidden="true">
      {Array.from({ length: total }, (_, i) => (
        <span
          key={i}
          className={cn(
            "h-[2px] flex-1 rounded-[2px] transition-colors duration-150 ease-in-out",
            i === active ? "bg-brand" : "bg-stone-300",
          )}
        />
      ))}
    </div>
  )
}
