import type { Project } from "@/data/projects"

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
      <div className="relative aspect-[16/9] overflow-hidden rounded-2xl border border-border bg-muted">
        <Placeholder label={`${project.slug} · hero · 2400 × 1350`} />
        <WorkIndex index={index} total={total} />
      </div>
      <div className="grid items-start gap-x-[var(--container-gutter)] gap-y-8 cols:grid-cols-2">
        <div>
          <WorkProgress active={index - 1} total={Math.max(7, total)} />
          <h3 className="text-work-title">
            {project.title} <span className="text-muted-foreground">— {project.role}</span>
          </h3>
          <div className="mt-3.5 text-[13.5px] text-muted-foreground">
            {project.tags.join(" · ")}
          </div>
        </div>
        <div>
          <p className="text-base leading-relaxed [text-wrap:pretty] text-muted-foreground">
            {project.description}
          </p>
          {project.link ? (
            <a
              href={project.link}
              className="mt-6 inline-flex items-center gap-2 border-b border-border pb-0.5 text-sm text-foreground transition-[gap,border-color] duration-150 hover:gap-3 hover:border-foreground"
            >
              <span>Read the case study</span>
              <svg width="14" height="14" viewBox="0 0 14 14" fill="none" aria-hidden="true">
                <path
                  d="M3 11L11 3M11 3H5M11 3V9"
                  stroke="currentColor"
                  strokeWidth="1.4"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </a>
          ) : null}
        </div>
      </div>
    </article>
  )
}
