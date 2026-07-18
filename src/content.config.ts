import { file } from "astro/loaders"
import { z } from "astro/zod"
import { defineCollection } from "astro:content"

const projects = defineCollection({
  loader: file("src/data/projects.yaml"),
  schema: z.object({
    title: z.string(),
    role: z.string(),
    tags: z.array(z.string()),
    description: z.string(),
    date: z.string(),
    media: z.array(
      z.union([
        z.string(),
        z.object({
          src: z.string(),
          objectPosition: z.string().optional(),
        }),
      ]),
    ),
    ctas: z
      .array(
        z.object({
          label: z.string(),
          href: z.string(),
        }),
      )
      .optional(),
  }),
})

const interactions = defineCollection({
  loader: file("src/data/interactions.yaml"),
  schema: z.object({
    order: z.number(),
    title: z.string(),
    description: z.string(),
    playbackId: z.string(),
  }),
})

const socialLinks = defineCollection({
  loader: file("src/data/social-links.yaml"),
  schema: z.object({
    order: z.number(),
    label: z.string(),
    href: z.string(),
  }),
})

export const collections = { projects, interactions, socialLinks }
