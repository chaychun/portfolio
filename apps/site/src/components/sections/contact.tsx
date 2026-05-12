import { Container } from "@workspace/ui/components/container"
import { Section } from "@workspace/ui/components/section"

import { Link } from "@/components/link"

const FOOTER_LINKS = [
  { label: "Email", href: "mailto:chun.chayut@gmail.com" },
  { label: "Threads", href: "https://www.threads.com/@chun.chayut" },
  { label: "GitHub", href: "https://github.com/chaychun" },
]

export function ContactSection() {
  return (
    <Section screenLabel="Contact" className="pt-24 pb-16">
      <Container>
        <div className="flex items-center justify-between border-t border-border pt-6 text-[12px] text-muted-foreground">
          <span>© 2026 Chayut Chunsamphran</span>
          <span className="flex items-center gap-4">
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
