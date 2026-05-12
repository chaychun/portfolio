import type { StorySlide } from "@/components/work-story"

export type Project = {
  slug: string
  title: string
  role: string
  tags: string[]
  description: string
  link?: string
  thumb?: string
  date: string
  media: StorySlide[]
}

const placeholderSlides = (count: number): StorySlide[] =>
  Array.from({ length: count }, (_, i) => ({
    kind: "image" as const,
    label: `slide ${i + 1}/${count}`,
  }))

export const projects: Project[] = [
  {
    slug: "generated-wiki",
    title: "Generated.Wiki",
    role: "Encyclopedia that adapts its explanation to your persona and reading level.",
    tags: ["Product", "Engineering"],
    description:
      "Prototype of an encyclopedia where all articles are generated on-demand by LLMs. No permanent knowledge base or storage. Every entry can be tailored to the reader's persona and reading level on a subject-to-subject basis.",
    link: "#",
    date: "2026-05",
    media: placeholderSlides(5),
  },
  {
    slug: "mula",
    title: "Mula",
    role: "Tailored experience for learning how to code.",
    tags: ["Product", "Design", "Engineering"],
    description:
      "Mula is designed to help you learn how to code by providing tailored lessons and in-flow coding exercises. Powered by Claude Agent SDK, Mula adapts to your learning style and progress as you learn and complete exercises. Built to replace passive tutorial-watching with active, tailored practice.",
    link: "#",
    date: "2025-07",
    media: placeholderSlides(8),
  },
]
