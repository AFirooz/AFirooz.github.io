import { getCollection, type CollectionEntry } from 'astro:content';

export type Post = CollectionEntry<'blog'>;

/** Posts, newest first. Drafts are included only while developing. */
export async function getPosts(): Promise<Post[]> {
  const posts = await getCollection('blog', ({ data }) => !import.meta.env.PROD || !data.draft);
  return posts.sort((a, b) => b.data.date.valueOf() - a.data.date.valueOf());
}

export const postUrl = (post: Post) => `/blog/${post.id}/`;

export const readingTime = (post: Post) => {
  const words = (post.body ?? '').split(/\s+/).filter(Boolean).length;
  return `${Math.max(1, Math.round(words / 220))} min read`;
};

// Frontmatter dates are plain days, so format them in UTC to avoid an off-by-one.
export const formatDate = (date: Date) =>
  date.toLocaleDateString('en-US', { year: 'numeric', month: 'short', day: 'numeric', timeZone: 'UTC' });
