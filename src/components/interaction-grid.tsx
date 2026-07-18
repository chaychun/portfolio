import type { Interaction } from "@/data/interactions"

import { InteractionCard } from "@/components/interaction-card"
import { Lede } from "@/components/ui/lede"
import { interactionsSection } from "@/data/interactions"

type InteractionGridProps = {
  interactions: Interaction[]
}

export function InteractionGrid({ interactions }: InteractionGridProps) {
  return (
    <div className="grid gap-16">
      <div className="border-t border-border pt-6">
        <div className="grid items-start gap-x-[var(--container-gutter)] cols:grid-cols-2">
          <div className="cols:col-start-2">
            <h3 className="text-work-title">{interactionsSection.title}</h3>
            <Lede className="mt-3.5">{interactionsSection.description}</Lede>
          </div>
        </div>
      </div>
      <div className="grid grid-cols-1 items-start gap-x-[var(--container-gutter)] gap-y-10 cols:grid-cols-2">
        {interactions.map((interaction) => (
          <InteractionCard key={interaction.slug} interaction={interaction} />
        ))}
      </div>
    </div>
  )
}
