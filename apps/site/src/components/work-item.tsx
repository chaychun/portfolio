import type { Project } from "@/data/projects"

import { Fragment } from "react"

import { MarkdownText } from "@/components/markdown-text"
import { Placeholder } from "@/components/placeholder"
import { WorkIndex } from "@/components/work-index"
import { WorkProgress } from "@/components/work-progress"

type WorkItemProps = {
  project: Project
  index: number
  total: number
}

export function WorkItem({ project, index, total }: WorkItemProps) {
  return (
    <article className="grid gap-8">
      <div className="relative aspect-[16/9] overflow-hidden">
        <Placeholder label={`${project.slug} · hero · 2400 × 1350`} />
        <WorkIndex index={index} total={total} />
      </div>
      <div className="grid items-start gap-x-[var(--container-gutter)] gap-y-8 cols:grid-cols-2">
        <div>
          <WorkProgress active={index - 1} total={Math.max(7, total)} />
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
        </div>
      </div>
    </article>
  )
}
