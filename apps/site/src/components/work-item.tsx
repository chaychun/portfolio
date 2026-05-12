import type { Project } from "@/data/projects"

import { Fragment } from "react"

import { MarkdownText } from "@/components/markdown-text"
import { StoryBars, StoryHero, useStoryCarousel } from "@/components/work-story"

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
        </div>
      </div>
    </article>
  )
}
