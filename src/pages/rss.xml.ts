import type { APIRoute } from 'astro';
import { profile } from '../data/resume';
import { getPosts, postUrl } from '../lib/posts';

const esc = (s: string) => s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const url = (path: string) => new URL(path, site).href;
  const items = posts
    .map(
      (post) => `    <item>
      <title>${esc(post.data.title)}</title>
      <link>${url(postUrl(post))}</link>
      <guid>${url(postUrl(post))}</guid>
      <pubDate>${post.data.date.toUTCString()}</pubDate>
      <description>${esc(post.data.description)}</description>
    </item>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<rss version="2.0" xmlns:atom="http://www.w3.org/2005/Atom">
  <channel>
    <title>${esc(profile.name)} · Blog</title>
    <link>${url('/blog/')}</link>
    <description>Posts by ${esc(profile.name)}</description>
    <language>en</language>
    <atom:link href="${url('/rss.xml')}" rel="self" type="application/rss+xml" />
${items}
  </channel>
</rss>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/rss+xml; charset=utf-8' } });
};
