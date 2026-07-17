import { Link } from "@/components/link"
import { Container } from "@/components/ui/container"
import { Lede } from "@/components/ui/lede"
import { MetaList } from "@/components/ui/meta-list"
import { Section } from "@/components/ui/section"
import { WaveName } from "@/components/wave-name"
import { SOCIAL_LINKS } from "@/data/social-links"

const META = [
  { label: "Based", value: "Bangkok, Thailand" },
  {
    label: "Focus",
    value: "Interaction & interface design",
  },
  {
    label: "Reach out",
    value: (
      <span className="flex flex-wrap items-center gap-4">
        {SOCIAL_LINKS.map((link) => (
          <Link key={link.label} href={link.href}>
            {link.label}
          </Link>
        ))}
      </span>
    ),
  },
]

export function AboutSection() {
  return (
    <Section id="about" screenLabel="About" className="pt-24 pb-20 cols:pt-30">
      <Container>
        <div className="grid gap-x-(--container-gutter) gap-y-8 cols:grid-cols-2 cols:grid-rows-[auto_1fr] cols:items-end">
          <div
            aria-hidden
            className="order-1 size-5 rounded-full bg-brand cols:col-start-1 cols:row-start-1"
          />
          <MetaList
            items={META}
            className="order-3 cols:col-start-1 cols:row-start-2 cols:self-end"
          />
          <div className="order-2 cols:col-start-2 cols:row-span-2 cols:row-start-1">
            <Lede
              variant="lead"
              className="mb-7 [text-box-edge:cap_alphabetic] [text-box-trim:trim-start]"
            >
              Hi, I'm <WaveName>Chayut</WaveName>. I design and build calm, opinionated software.
            </Lede>
            <Lede className="mb-4">
              I believe great software should enhance human cognition, not deplete it. My goal is to
              build interfaces that are intuitive, efficient, and delightful, using motion and
              interaction as means for improving communication and usability.
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
