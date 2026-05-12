import { Link, createFileRoute } from "@tanstack/react-router"

import { getEntry } from "../lib/registry"

export const Route = createFileRoute("/$slug")({
  loader: ({ params }) => getEntry(params.slug),
  component: SlugPage,
})

function SlugPage() {
  const { module } = Route.useLoaderData()
  const Component = module.default

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link to="/" className="mb-4 block text-sm text-muted-foreground">
        ← back
      </Link>
      <header className="mb-6">
        <h1 className="text-2xl font-medium">{module.meta.title}</h1>
        {module.meta.description && (
          <p className="text-sm text-muted-foreground">{module.meta.description}</p>
        )}
      </header>
      <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-lg border">
        <Component />
      </div>
    </main>
  )
}
