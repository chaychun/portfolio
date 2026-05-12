import MuxPlayer from "@mux/mux-player-react/lazy"
import { useEffect, useState, type ComponentProps, type ComponentRef } from "react"

type MuxPlayerProps = ComponentProps<typeof MuxPlayer>

export type VideoProps = Omit<
  MuxPlayerProps,
  | "autoPlay"
  | "muted"
  | "loop"
  | "nohotkeys"
  | "playsInline"
  | "envKey"
  | "disableTracking"
  | "disableCookies"
  | "metadata"
> & {
  playbackId: string
}

export function Video({ style, ...props }: VideoProps) {
  const [el, setEl] = useState<ComponentRef<typeof MuxPlayer> | null>(null)

  useEffect(() => {
    if (!el) return

    const observer = new IntersectionObserver(
      (entries) => {
        const entry = entries.at(-1)
        if (!entry) return
        if (entry.isIntersecting) {
          void el.play().catch(() => {})
        } else {
          el.pause()
        }
      },
      { threshold: 0.5 },
    )

    observer.observe(el)
    return () => observer.disconnect()
  }, [el])

  return (
    <MuxPlayer
      ref={setEl}
      autoPlay="muted"
      muted
      loop
      nohotkeys
      playsInline
      disableTracking
      disableCookies
      streamType="on-demand"
      thumbnailTime={0}
      style={{
        "--controls": "none",
        "--media-background-color": "#fafaf9",
        "--controls-backdrop-color": "transparent",
        backgroundColor: "#fafaf9",
        ...style,
      }}
      {...props}
    />
  )
}
