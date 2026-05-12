import { HeadContent, Scripts, createRootRoute, useRouterState } from "@tanstack/react-router"
import { useEffect } from "react"

import appCss from "@workspace/ui/globals.css?url"

const DEV_LABEL_ACTIVE = !!(import.meta.env.DEV && import.meta.env.VITE_DEV_LABEL)

export const Route = createRootRoute({
  head: () => ({
    meta: [
      { charSet: "utf-8" },
      { name: "viewport", content: "width=device-width, initial-scale=1" },
      ...(DEV_LABEL_ACTIVE ? [] : [{ title: "Chayut Chunsamphran — Portfolio" }]),
    ],
    links: [
      {
        rel: "stylesheet",
        href: appCss,
      },
    ],
  }),
  notFoundComponent: () => (
    <main className="container mx-auto p-4 pt-16">
      <h1>404</h1>
      <p>The requested page could not be found.</p>
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

const LOCAL_HOSTS = new Set(["localhost", "127.0.0.1", "0.0.0.0", "::1"])

function DevTitle() {
  const pathname = useRouterState({ select: (s) => s.location.pathname })
  useEffect(() => {
    if (!DEV_LABEL_ACTIVE) return
    if (!LOCAL_HOSTS.has(window.location.hostname)) return
    document.title = `${import.meta.env.VITE_DEV_LABEL} - ${window.location.href}`
  }, [pathname])
  return null
}
