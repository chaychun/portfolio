import type { FeedEntry } from "@/data/feed"
import type { Interaction } from "@/data/interactions"

import { Container } from "@workspace/ui/components/container"
import { Section } from "@workspace/ui/components/section"

import { InteractionGrid } from "@/components/interaction-grid"
import { WorkItem } from "@/components/work-item"
import { feed } from "@/data/feed"

type Group =
  | { kind: "project"; slug: string; project: FeedEntry & { kind: "project" } }
  | { kind: "interactions"; key: string; items: Interaction[] }

function groupFeed(entries: FeedEntry[]): Group[] {
  const groups: Group[] = []
  let buffer: Interaction[] = []
  const flush = () => {
    if (buffer.length === 0) return
    groups.push({
      kind: "interactions",
      key: `i-${buffer[0]!.slug}`,
      items: buffer,
    })
    buffer = []
  }
  for (const entry of entries) {
    if (entry.kind === "interaction") {
      buffer.push(entry.data)
    } else {
      flush()
      groups.push({ kind: "project", slug: entry.data.slug, project: entry })
    }
  }
  flush()
  return groups
}

export function WorkSection() {
  const groups = groupFeed(feed)

  return (
    <Section id="work" screenLabel="Work">
      <Container>
        <div className="grid gap-22 cols:gap-[180px]">
          {groups.map((group) =>
            group.kind === "project" ? (
              <WorkItem key={group.slug} project={group.project.data} />
            ) : (
              <InteractionGrid key={group.key} interactions={group.items} />
            ),
          )}
        </div>
      </Container>
    </Section>
  )
}
