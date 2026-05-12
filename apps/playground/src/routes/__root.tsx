import { HeadContent, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"

import appCss from "@workspace/ui/globals.css?url"

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      { title: "Playground" },
    ],
    links: [{ rel: "stylesheet", href: appCss }],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
    </main>
  ),
  shellComponent: RootDocument,
})

function RootDocument({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en">
      <head>
        <HeadContent />
      </head>
      <body>
        <DevTitle />
        {children}
        <Scripts />
      </body>
    </html>
  )
}

function DevTitle() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => {
    if (!import.meta.env.DEV) return
    const label = import.meta.env.VITE_DEV_LABEL
    if (!label) return
    document.title = `${label} — ${pathname}`
  }, [pathname])
  return null
}
