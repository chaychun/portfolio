import { Link, createFileRoute, notFound } from "@tanstack/react-router"

import { MarkdownText } from "@/components/markdown-text"
import { interactions } from "@/data/interactions"
import { getComponent } from "@/interactions/registry"

export const Route = createFileRoute("/interactions/$slug")({
  loader: ({ params }) => {
    const data = interactions.find((i) => i.slug === params.slug)
    // Two gates: author intent (demo flag) + a registered component must exist.
    if (!data?.demo || !getComponent(params.slug)) throw notFound()
    return { title: data.title, description: data.description }
  },
  component: DemoPage,
})

function DemoPage() {
  const { slug } = Route.useParams()
  const { title, description } = Route.useLoaderData()
  const Component = getComponent(slug)
  if (!Component) return null

  return (
    <main className="mx-auto max-w-3xl p-6">
      <Link to="/" className="mb-4 block text-sm text-muted-foreground">
        ← back
      </Link>
      <header className="mb-6">
        <h1 className="text-2xl font-medium">{title}</h1>
        <p className="text-sm text-muted-foreground">
          <MarkdownText>{description}</MarkdownText>
        </p>
      </header>
      <div className="relative flex min-h-[480px] items-center justify-center overflow-hidden rounded-lg border">
        <Component />
      </div>
    </main>
  )
}
