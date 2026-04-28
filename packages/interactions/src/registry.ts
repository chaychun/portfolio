import type { ComponentType } from "react"

export type InteractionMeta = {
  title: string
  description?: string
  tags?: string[]
}

export type InteractionModule = {
  default: ComponentType
  meta: InteractionMeta
}
