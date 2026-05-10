export type Interaction = {
  slug: string
  title: string
  description: string
  playbackId: string
  duration?: string
  tags?: string[]
  poster?: string
  date: string
}

export const interactions: Interaction[] = [
  {
    slug: "magnetic-dock-cursor",
    title: "Magnetic dock cursor",
    description:
      "A pointer that gently snaps to nearby targets, then lets go without overshooting.",
    playbackId: "",
    duration: "12s",
    date: "2025-11",
  },
  {
    slug: "springy-folder-unfurl",
    title: "Springy folder unfurl",
    description: "Nested folders that open in a soft, settled spring rather than a hard cut.",
    playbackId: "",
    duration: "09s",
    date: "2025-10",
  },
  {
    slug: "token-streaming-text",
    title: "Token-by-token streaming text",
    description: "Each token settles into the line with its own quiet, frame-perfect micro-motion.",
    playbackId: "",
    duration: "18s",
    date: "2025-09",
  },
  {
    slug: "inline-command-bar",
    title: "Inline command bar",
    description: "Slash, type, run — a command surface that lives inside the line you're writing.",
    playbackId: "",
    duration: "11s",
    date: "2025-08",
  },
  {
    slug: "drag-to-summon-palette",
    title: "Drag-to-summon palette",
    description: "Pull from the edge of the canvas to surface a contextual palette of actions.",
    playbackId: "",
    duration: "14s",
    date: "2025-06",
  },
  {
    slug: "soft-snap-scrubber",
    title: "Soft-snap timeline scrubber",
    description: "Frame-aware scrubbing that gently lands on the beats you actually care about.",
    playbackId: "",
    duration: "08s",
    date: "2025-05",
  },
  {
    slug: "multi-cursor-presence",
    title: "Multi-cursor presence",
    description: "Live cursors that feel like people in the room, not labels parked on the page.",
    playbackId: "",
    duration: "22s",
    date: "2025-04",
  },
  {
    slug: "scroll-pinned-chapter-index",
    title: "Scroll-pinned chapter index",
    description: "A quiet index that follows you down the page and stays where you can find it.",
    playbackId: "",
    duration: "10s",
    date: "2025-03",
  },
  {
    slug: "gesture-driven-zoom",
    title: "Gesture-driven zoom",
    description:
      "Pinch and pan flow as one continuous, deceleration-aware motion across the canvas.",
    playbackId: "",
    duration: "15s",
    date: "2025-01",
  },
  {
    slug: "toast-stack-choreography",
    title: "Toast stack choreography",
    description:
      "Notifications that politely make room for each other instead of stacking like cards.",
    playbackId: "",
    duration: "07s",
    date: "2024-12",
  },
  {
    slug: "ambient-audio-meter",
    title: "Ambient audio meter",
    description: "A level meter that responds with motion and weight rather than running numbers.",
    playbackId: "",
    duration: "13s",
    date: "2024-11",
  },
  {
    slug: "keyboard-first-reorder",
    title: "Keyboard-first reorder",
    description: "Reordering long lists without ever lifting your hands from the keyboard.",
    playbackId: "",
    duration: "19s",
    date: "2024-10",
  },
]
