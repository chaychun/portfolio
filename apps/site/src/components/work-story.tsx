import { cn } from "@workspace/ui/lib/utils"
import { motion } from "motion/react"
import { useEffect, useRef, useState } from "react"

import { Placeholder } from "@/components/placeholder"
import { Video } from "@/components/video"

export type StorySlide = string

type SlideKind = "image" | "video" | "placeholder"

function detectKind(slide: StorySlide | undefined): SlideKind {
  if (!slide) return "placeholder"
  if (slide.includes("/") || slide.includes(".")) return "image"
  return "video"
}

export type StoryCarousel = {
  active: number
  total: number
  current: StorySlide | undefined
  slides: StorySlide[]
  next: () => void
  prev: () => void
  goTo: (index: number) => void
}

export function useStoryCarousel(slides: StorySlide[]): StoryCarousel {
  const [active, setActive] = useState(0)
  const total = slides.length
  const current = slides[active]

  return {
    active,
    total,
    current,
    slides,
    next: () => setActive((i) => (i + 1) % total),
    prev: () => setActive((i) => (i === 0 ? total - 1 : i - 1)),
    goTo: (i: number) => setActive(Math.max(0, Math.min(total - 1, i))),
  }
}

type StoryHeroProps = {
  story: StoryCarousel
  className?: string
}

type Layer = {
  key: number
  index: number
  slide: StorySlide | undefined
}

const FADE_MS = 400

export function StoryHero({ story, className }: StoryHeroProps) {
  const { active, total, slides, next, prev } = story

  const keyRef = useRef(1)
  const initialKeyRef = useRef(0)
  const [layers, setLayers] = useState<Layer[]>(() => [
    { key: initialKeyRef.current, index: 0, slide: slides[0] },
  ])

  useEffect(() => {
    setLayers((curr) => {
      const last = curr[curr.length - 1]
      if (last && last.index === active) return curr
      return [...curr, { key: keyRef.current++, index: active, slide: slides[active] }]
    })
  }, [active, slides])

  useEffect(() => {
    if (typeof window === "undefined") return
    for (const s of slides) {
      if (detectKind(s) === "image") {
        const img = new window.Image()
        img.src = s
      }
    }
  }, [slides])

  const handleEntered = (key: number) => {
    setLayers((curr) => {
      const idx = curr.findIndex((l) => l.key === key)
      if (idx <= 0) return curr
      return curr.slice(idx)
    })
  }

  return (
    <div className={cn("relative aspect-[16/9] overflow-hidden", className)}>
      {layers.map((layer) => (
        <CrossfadeLayer
          key={layer.key}
          slide={layer.slide}
          index={layer.index}
          total={total}
          animate={layer.key !== initialKeyRef.current}
          onEntered={() => handleEntered(layer.key)}
        />
      ))}
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

type CrossfadeLayerProps = {
  slide: StorySlide | undefined
  index: number
  total: number
  animate: boolean
  onEntered: () => void
}

function CrossfadeLayer({ slide, index, total, animate, onEntered }: CrossfadeLayerProps) {
  const [opacity, setOpacity] = useState(animate ? 0 : 1)

  useEffect(() => {
    if (!animate) return
    const id = requestAnimationFrame(() => requestAnimationFrame(() => setOpacity(1)))
    return () => cancelAnimationFrame(id)
  }, [animate])

  const kind = detectKind(slide)

  return (
    <div
      className="absolute inset-0"
      style={{
        opacity,
        transition: animate ? `opacity ${FADE_MS}ms ease-out` : undefined,
      }}
      onTransitionEnd={(e) => {
        if (e.propertyName !== "opacity") return
        if (opacity === 1) onEntered()
      }}
    >
      {kind === "image" && slide ? (
        <img src={slide} alt="" className="absolute inset-0 h-full w-full object-cover" />
      ) : kind === "video" && slide ? (
        <Video
          playbackId={slide}
          className="absolute inset-0 h-full w-full"
          style={{ "--media-object-fit": "cover" }}
        />
      ) : (
        <Placeholder label={`slide ${index + 1}/${total}`} />
      )}
    </div>
  )
}

type StoryBarsProps = {
  story: StoryCarousel
  className?: string
}

const BAR_GAP = 6

export function StoryBars({ story, className }: StoryBarsProps) {
  const { total, active, goTo } = story

  return (
    <motion.div
      className={cn("mb-[18px] flex gap-1.5", className)}
      style={{ "--bar-i": active } as React.CSSProperties}
      initial={false}
      animate={{ "--bar-i": active } as never}
      transition={{ type: "spring", duration: 0.3, bounce: 0.1 }}
    >
      {Array.from({ length: total }, (_, i) => (
        <button
          key={i}
          type="button"
          aria-label={`Go to slide ${i + 1}`}
          aria-current={i === active ? "true" : undefined}
          onClick={() => goTo(i)}
          className="relative h-[3px] flex-1 cursor-pointer before:absolute before:inset-x-0 before:-top-3 before:-bottom-3 before:content-['']"
        >
          <span
            aria-hidden="true"
            className="pointer-events-none absolute inset-0 overflow-hidden rounded-full bg-stone-300"
          >
            <span
              className="absolute inset-0 bg-brand"
              style={{
                transform: `translateX(calc((var(--bar-i) - ${i}) * (100% + ${BAR_GAP}px)))`,
              }}
            />
          </span>
        </button>
      ))}
    </motion.div>
  )
}
