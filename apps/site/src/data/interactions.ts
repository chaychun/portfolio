export type Interaction = {
  slug: string
  title: string
  description: string
  playbackId: string
  tags?: string[]
  poster?: string
}

export const interactions: Interaction[] = []
