import type { Project, ProjectCta } from "@/data/projects"

import { ArrowRight } from "lucide-react"
import { LayoutGroup, motion } from "motion/react"
import { Fragment, useState } from "react"

import { MarkdownText } from "@/components/markdown-text"
import { StoryBars, StoryHero, useStoryCarousel } from "@/components/work-story"

const ctaSpring = { type: "spring", duration: 0.3, bounce: 0.1 } as const

function CtaLink({
  cta,
  active,
  onActivate,
  onFocus,
  onBlur,
}: {
  cta: ProjectCta
  active: boolean
  onActivate: () => void
  onFocus: () => void
  onBlur: () => void
}) {
  const external = /^https?:\/\//.test(cta.href)
  const state = active ? "hover" : "idle"
  return (
    <motion.a
      layout
      href={cta.href}
      {...(external ? { target: "_blank", rel: "noopener noreferrer" } : {})}
      initial="idle"
      animate={state}
      onMouseEnter={onActivate}
      onFocus={onFocus}
      onBlur={onBlur}
      transition={ctaSpring}
      className={`inline-flex items-center text-base transition-colors duration-150 ease-in-out ${active ? "text-brand" : "text-stone-700 dark:text-stone-300"}`}
    >
      <motion.span
        aria-hidden="true"
        className="inline-flex overflow-hidden"
        variants={{ idle: { width: 0 }, hover: { width: "1.25em" } }}
        transition={ctaSpring}
      >
        <motion.span
          className="inline-flex"
          variants={{ idle: { x: "-100%" }, hover: { x: 0 } }}
          transition={ctaSpring}
        >
          <ArrowRight className="size-[1em] shrink-0" />
        </motion.span>
      </motion.span>
      <motion.span layout="position" transition={ctaSpring}>
        {cta.label}
      </motion.span>
    </motion.a>
  )
}

function CtaList({ ctas }: { ctas: ProjectCta[] }) {
  const [hovered, setHovered] = useState<number | null>(null)
  const [focused, setFocused] = useState<number | null>(null)
  const active = hovered ?? focused
  return (
    <LayoutGroup>
      <ul
        onMouseLeave={() => setHovered(null)}
        className="-mx-2.5 mt-4 flex flex-wrap items-center"
      >
        {ctas.map((cta, i) => (
          <motion.li
            layout
            key={cta.href + cta.label}
            transition={ctaSpring}
            onMouseEnter={() => setHovered(i)}
            className="px-2.5 py-1"
          >
            <CtaLink
              cta={cta}
              active={active === i}
              onActivate={() => setHovered(i)}
              onFocus={() => setFocused(i)}
              onBlur={() => setFocused((f) => (f === i ? null : f))}
            />
          </motion.li>
        ))}
      </ul>
    </LayoutGroup>
  )
}

type WorkItemProps = {
  project: Project
}

export function WorkItem({ project }: WorkItemProps) {
  const story = useStoryCarousel(project.media)

  return (
    <article className="grid gap-8">
      <div className="relative">
        <StoryHero story={story} />
      </div>
      <div className="grid items-start gap-x-[var(--container-gutter)] gap-y-8 cols:grid-cols-2">
        <div>
          <StoryBars story={story} />
          <h3 className="text-work-title">
            {project.title} <span className="text-muted-foreground">— {project.role}</span>
          </h3>
          <div className="mt-3.5 flex flex-wrap items-center gap-x-2.5 text-[13.5px] text-muted-foreground">
            {project.tags.map((tag, i) => (
              <Fragment key={tag}>
                {i > 0 ? (
                  <svg
                    aria-hidden="true"
                    width="3"
                    height="3"
                    viewBox="0 0 3 3"
                    className="text-brand"
                  >
                    <circle cx="1.5" cy="1.5" r="1.5" fill="currentColor" />
                  </svg>
                ) : null}
                <span>{tag}</span>
              </Fragment>
            ))}
          </div>
        </div>
        <div>
          <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
            <MarkdownText>{project.description}</MarkdownText>
          </p>
          {project.ctas?.length ? <CtaList ctas={project.ctas} /> : null}
        </div>
      </div>
    </article>
  )
}
