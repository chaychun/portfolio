import { Container } from "@workspace/ui/components/container"
import { Section } from "@workspace/ui/components/section"

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
              <a
                key={link.label}
                href={link.href}
                className="underline decoration-border underline-offset-4 transition-colors hover:decoration-muted-foreground"
              >
                {link.label}
              </a>
            ))}
          </span>
        </div>
      </Container>
    </Section>
  )
}
