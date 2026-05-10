import { Container } from "@workspace/ui/components/container"
import { Lede } from "@workspace/ui/components/lede"
import { MetaList } from "@workspace/ui/components/meta-list"
import { Section } from "@workspace/ui/components/section"

const REACH_OUT_LINKS = [
  {
    label: "Email",
    href: "mailto:chun.chayut@gmail.com",
  },
  {
    label: "Threads",
    href: "https://www.threads.com/@chun.chayut",
  },
  {
    label: "GitHub",
    href: "https://github.com/chaychun",
  },
]

const META = [
  { label: "Based", value: "Bangkok, Thailand" },
  {
    label: "Open to",
    value: "Frontend/design engineering roles, project-based commissions",
  },
  {
    label: "Reach out",
    value: (
      <span className="flex flex-wrap items-center gap-4">
        {REACH_OUT_LINKS.map((link) => (
          <a
            key={link.label}
            href={link.href}
            className="underline decoration-border underline-offset-4 transition-colors hover:decoration-muted-foreground"
          >
            {link.label}
          </a>
        ))}
      </span>
    ),
  },
]

export function AboutSection() {
  return (
    <Section id="about" screenLabel="About" className="pt-24 pb-20 cols:pt-30">
      <Container>
        <div className="grid items-end gap-x-[var(--container-gutter)] gap-y-8 cols:grid-cols-2">
          <MetaList items={META} className="order-2 cols:order-1" />
          <div className="order-1 cols:order-2">
            <Lede variant="lead" className="mb-7">
              Hi, I'm <em className="text-muted-foreground not-italic">Chayut</em>. I design and
              build calm, opinionated software.
            </Lede>
            <Lede className="mb-4">
              I believe great software should enhance human cognition, not deplete it. My goal is to
              build interfaces that are intuitive, efficient, and delightful.
            </Lede>
            <Lede>
              You can see some of my work below. Every project here was designed and built end to
              end — design, frontend, and backend where there is one.
            </Lede>
          </div>
        </div>
      </Container>
    </Section>
  )
}
