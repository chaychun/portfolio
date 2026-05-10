import type { Interaction } from "@/data/interactions"

import { InteractionCard } from "@/components/interaction-card"

type InteractionGridProps = {
  interactions: Interaction[]
}

export function InteractionGrid({ interactions }: InteractionGridProps) {
  return (
    <div className="grid grid-cols-1 gap-x-[var(--container-gutter)] gap-y-10 cols:grid-cols-2">
      {interactions.map((interaction) => (
        <InteractionCard key={interaction.slug} interaction={interaction} />
      ))}
    </div>
  )
}
