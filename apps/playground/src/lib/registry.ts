import type { InteractionModule } from "@workspace/interactions/registry"

const modules = import.meta.glob<InteractionModule>(
  "/../../packages/interactions/src/items/*/index.tsx",
  { eager: true },
)

function slugFromPath(path: string): string {
  const match = path.match(/items\/([^/]+)\/index\.tsx$/)
  if (!match) throw new Error(`Cannot derive slug from path: ${path}`)
  return match[1]
}

export type Entry = {
  slug: string
  module: InteractionModule
}

export const entries: Entry[] = Object.entries(modules).map(([path, module]) => ({
  slug: slugFromPath(path),
  module,
}))

const bySlug = new Map(entries.map((e) => [e.slug, e]))

export function getEntry(slug: string): Entry {
  const entry = bySlug.get(slug)
  if (!entry) throw new Error(`No interaction: ${slug}`)
  return entry
}
