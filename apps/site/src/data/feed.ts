import type { Interaction } from "@/data/interactions"
import type { Project } from "@/data/projects"

import { interactions } from "@/data/interactions"
import { projects } from "@/data/projects"

export type FeedEntry =
  | { kind: "project"; date: string; data: Project }
  | { kind: "interaction"; date: string; data: Interaction }

export const feed: FeedEntry[] = [
  ...projects.map<FeedEntry>((p) => ({ kind: "project", date: p.date, data: p })),
  ...interactions.map<FeedEntry>((i) => ({
    kind: "interaction",
    date: i.date,
    data: i,
  })),
].sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
