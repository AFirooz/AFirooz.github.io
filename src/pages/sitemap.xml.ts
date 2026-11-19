import type { APIRoute } from 'astro';
import { getPosts, postUrl } from '../lib/posts';

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const pages = [
    { path: '/' },
    ...(posts.length ? [{ path: '/blog/' }] : []),
    ...posts.map((post) => ({ path: postUrl(post), lastmod: post.data.updated ?? post.data.date })),
  ];
  const urls = pages
    .map(
      (page) =>
        `  <url>\n    <loc>${new URL(page.path, site).href}</loc>${
          'lastmod' in page ? `\n    <lastmod>${page.lastmod.toISOString().slice(0, 10)}</lastmod>` : ''
        }\n  </url>`,
    )
    .join('\n');

  const xml = `<?xml version="1.0" encoding="UTF-8"?>
<urlset xmlns="http://www.sitemaps.org/schemas/sitemap/0.9">
${urls}
</urlset>
`;
  return new Response(xml, { headers: { 'Content-Type': 'application/xml; charset=utf-8' } });
};
