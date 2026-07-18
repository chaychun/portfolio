import { createFileRoute } from "@tanstack/react-router"

export const Route = createFileRoute("/")({
  component: Scratch,
})

function Scratch() {
  return null
}
