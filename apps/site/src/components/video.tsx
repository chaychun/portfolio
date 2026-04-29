import type { ComponentProps } from "react"

import MuxPlayer from "@mux/mux-player-react/lazy"

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

export function Video(props: VideoProps) {
  return (
    <MuxPlayer
      autoPlay="muted"
      muted
      loop
      nohotkeys
      playsInline
      disableTracking
      disableCookies
      streamType="on-demand"
      style={{ "--controls": "none" }}
      {...props}
    />
  )
}
