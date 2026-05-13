import { Container } from "@workspace/ui/components/container"
import { Section } from "@workspace/ui/components/section"

import { GhostEgg } from "@/components/ghost-egg"
import { Link } from "@/components/link"

const FOOTER_LINKS = [
  { label: "Email", href: "mailto:chun.chayut@gmail.com" },
  { label: "Threads", href: "https://www.threads.com/@chun.chayut" },
  { label: "GitHub", href: "https://github.com/chaychun" },
  { label: "Resume", href: "/resume" },
]

export function ContactSection() {
  return (
    <Section screenLabel="Contact" className="pt-24 pb-16">
      <Container>
        <div className="flex flex-col gap-4 border-t border-border pt-6 text-[12px] text-muted-foreground sm:flex-row sm:items-center sm:justify-between sm:gap-6">
          <span>© 2026 Chayut Chunsamphran</span>
          <span className="flex flex-col items-start gap-2 sm:flex-row sm:items-center sm:gap-x-4 sm:gap-y-2">
            <GhostEgg />
            {FOOTER_LINKS.map((link) => (
              <Link key={link.label} href={link.href} variant="quiet">
                {link.label}
              </Link>
            ))}
          </span>
        </div>
      </Container>
    </Section>
  )
}
