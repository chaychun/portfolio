import { createFileRoute } from "@tanstack/react-router"

import { AboutSection } from "@/components/sections/about"
import { ContactSection } from "@/components/sections/contact"
import { WorkSection } from "@/components/sections/work"

export const Route = createFileRoute("/")({ component: Home })

function Home() {
  return (
    <main>
      <AboutSection />
      <WorkSection />
      <ContactSection />
    </main>
  )
}
