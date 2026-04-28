import { Link, createFileRoute } from "@tanstack/react-router"

import { entries } from "../lib/registry"

export const Route = createFileRoute("/")({
  component: Index,
})

function Index() {
  return (
    <main className="mx-auto max-w-2xl p-6">
      <h1 className="mb-6 text-2xl font-medium">Interactions</h1>
      {entries.length === 0 ? (
        <p className="text-sm text-muted-foreground">
          No interactions yet. Add files at{" "}
          <code className="rounded bg-muted px-1 py-0.5 text-xs">
            packages/interactions/src/items/&lt;slug&gt;/index.tsx
          </code>
          .
        </p>
      ) : (
        <ul className="flex flex-col gap-2">
          {entries.map(({ slug, module: { meta } }) => (
            <li key={slug}>
              <Link
                to="/$slug"
                params={{ slug }}
                className="block rounded border p-3 hover:bg-muted"
              >
                <div className="font-medium">{meta.title}</div>
                {meta.description && (
                  <div className="text-sm text-muted-foreground">{meta.description}</div>
                )}
              </Link>
            </li>
          ))}
        </ul>
      )}
    </main>
  )
}
