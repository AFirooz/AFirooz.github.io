import { defineCollection } from 'astro:content';
import { glob } from 'astro/loaders';
import { z } from 'astro/zod';

// One Markdown file per post in src/content/blog/. The file name is the URL slug.
const blog = defineCollection({
  loader: glob({ pattern: '**/*.md', base: './src/content/blog' }),
  schema: z.object({
    title: z.string(),
    description: z.string(),
    date: z.coerce.date(),
    updated: z.coerce.date().optional(),
    tags: z.array(z.string()).default([]),
    // Drafts show up in `pnpm dev` only; they are left out of the published site.
    draft: z.boolean().default(false),
  }),
});

export const collections = { blog };
