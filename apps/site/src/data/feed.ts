import type { Interaction } from "@/data/interactions"
import type { Project } from "@/data/projects"

import { interactions } from "@/data/interactions"
import { projects } from "@/data/projects"

export type FeedEntry =
  | { kind: "project"; data: Project }
  | { kind: "interaction"; data: Interaction }

// Projects first, ordered by date desc.
// Interactions are undated; shown as a single bucket at the bottom.
export const feed: FeedEntry[] = [
  ...projects
    .slice()
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .map<FeedEntry>((p) => ({ kind: "project", data: p })),
  ...interactions.map<FeedEntry>((i) => ({ kind: "interaction", data: i })),
]
