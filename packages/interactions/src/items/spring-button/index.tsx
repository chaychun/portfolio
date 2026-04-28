import type { InteractionMeta } from "@workspace/interactions/registry"

import { motion } from "motion/react"

export const meta: InteractionMeta = {
  title: "Spring button",
  description: "Tap target with spring scale-down on press.",
  tags: ["motion", "button"],
}

export default function SpringButton() {
  return (
    <motion.button
      whileTap={{ scale: 0.92 }}
      transition={{ type: "spring", stiffness: 400, damping: 17 }}
      className="rounded-md bg-foreground px-4 py-2 text-sm font-medium text-background"
    >
      Press me
    </motion.button>
  )
}
