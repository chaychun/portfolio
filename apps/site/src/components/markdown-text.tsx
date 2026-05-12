import { Fragment, type ReactNode } from "react"

import { Link } from "@/components/link"

const LINK_RE = /\[([^\]]+)\]\(([^)]+)\)/g

export function MarkdownText({ children }: { children: string }) {
  const nodes: ReactNode[] = []
  let lastIndex = 0
  let match: RegExpExecArray | null
  let key = 0

  LINK_RE.lastIndex = 0
  while ((match = LINK_RE.exec(children)) !== null) {
    const [full, text, href] = match
    if (match.index > lastIndex) {
      nodes.push(<Fragment key={key++}>{children.slice(lastIndex, match.index)}</Fragment>)
    }
    nodes.push(
      <Link key={key++} href={href}>
        {text}
      </Link>,
    )
    lastIndex = match.index + full.length
  }
  if (lastIndex < children.length) {
    nodes.push(<Fragment key={key++}>{children.slice(lastIndex)}</Fragment>)
  }

  return <>{nodes}</>
}
