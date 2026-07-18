import { createFileRoute } from "@tanstack/react-router"
import { motion } from "motion/react"

export const Route = createFileRoute("/test")({
  component: Test,
})

function Test() {
  return (
    <main className="grid min-h-screen place-items-center bg-stone-950 text-stone-50">
      <motion.button
        className="rounded-full bg-orange-500 px-6 py-3 text-sm font-medium shadow-lg shadow-orange-500/20"
        initial={{ opacity: 0, scale: 0.8 }}
        animate={{ opacity: 1, scale: 1 }}
        whileHover={{ scale: 1.08 }}
        whileTap={{ scale: 0.94 }}
        transition={{ type: "spring", stiffness: 400, damping: 20 }}
      >
        Tailwind + Motion
      </motion.button>
    </main>
  )
}
