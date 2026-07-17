import type { ComponentType } from "react"

export type InteractionModule = { default: ComponentType }

const modules = import.meta.glob<InteractionModule>("/src/interactions/items/*/index.tsx", {
  eager: true,
})

function slugFromPath(path: string): string {
  const match = path.match(/items\/([^/]+)\/index\.tsx$/)
  if (!match) throw new Error(`Cannot derive slug from path: ${path}`)
  return match[1]
}

const bySlug = new Map<string, ComponentType>(
  Object.entries(modules).map(([path, mod]) => [slugFromPath(path), mod.default]),
)

export function hasDemo(slug: string): boolean {
  return bySlug.has(slug)
}

export function getComponent(slug: string): ComponentType | undefined {
  return bySlug.get(slug)
}
