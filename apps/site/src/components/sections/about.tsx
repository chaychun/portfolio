import { Container } from "@workspace/ui/components/container"
import { Lede } from "@workspace/ui/components/lede"
import { MetaList } from "@workspace/ui/components/meta-list"
import { Section } from "@workspace/ui/components/section"

import { Link } from "@/components/link"
import { WaveName } from "@/components/wave-name"

const REACH_OUT_LINKS = [
  {
    label: "Email",
    href: "mailto:chun.chayut@gmail.com",
  },
  {
    label: "X",
    href: "https://x.com/chayutc_",
  },
  {
    label: "GitHub",
    href: "https://github.com/chaychun",
  },
  {
    label: "Contra",
    href: "https://contra.com/chunchayut?utm_campaign=HireMeOnContra&utm_medium=2a14c090-a68c-4e2a-be3f-f6649d266c80",
  },
]

const META = [
  { label: "Based", value: "Bangkok, Thailand" },
  {
    label: "Open to",
    value: "Software & design engineering roles",
  },
  {
    label: "Reach out",
    value: (
      <span className="flex flex-wrap items-center gap-4">
        {REACH_OUT_LINKS.map((link) => (
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
        <div className="grid gap-x-[var(--container-gutter)] gap-y-8 cols:grid-cols-2 cols:grid-rows-[auto_1fr] cols:items-end">
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
              end — design, frontend, and backend where there is one. If they feel like what you
              need, let's talk.
            </Lede>
          </div>
        </div>
      </Container>
    </Section>
  )
}
