import { defineCollection, z } from 'astro:content';

const articles = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    category: z.string().optional(),
    summary: z.string().optional(),
  }),
});

const projects = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    status: z.enum(['active', 'paused', 'done', 'planned']),
    summary: z.string().optional(),
    start: z.date().optional(),
    url: z.string().optional(),
    timeline: z
      .array(z.object({ date: z.date(), event: z.string() }))
      .optional(),
  }),
});

const insights = defineCollection({
  type: 'content',
  schema: z.object({
    title: z.string(),
    date: z.date(),
    summary: z.string().optional(),
  }),
});

export const collections = { articles, projects, insights };
