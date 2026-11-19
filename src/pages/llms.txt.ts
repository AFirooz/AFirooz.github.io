// Plain-text version of the resume for LLM crawlers (https://llmstxt.org).
import type { APIRoute } from 'astro';
import {
  profile,
  summary,
  experience,
  projects,
  skills,
  education,
  publications,
  honors,
  certificates,
  leadership,
} from '../data/resume';
import { plain } from '../lib/fmt';
import { getPosts, postUrl } from '../lib/posts';

const list = (items: string[]) => items.map((i) => `- ${plain(i)}`).join('\n');

export const GET: APIRoute = async ({ site }) => {
  const posts = await getPosts();
  const body = [
    `# ${profile.name}`,
    `> ${profile.role} (${profile.focus}). ${plain(profile.tagline)}`,
    list([
      `Location: ${profile.location} (${profile.availability})`,
      `Website: ${profile.site}`,
      `GitHub: ${profile.github}`,
      `LinkedIn: ${profile.linkedin}`,
      `Email: ${profile.email}`,
    ]),
    `## Summary\n${list(summary)}`,
    `## Experience\n${experience
      .map((j) => `### ${j.role}, ${j.company} (${j.start} – ${j.end}, ${j.location})\n${list(j.bullets)}`)
      .join('\n\n')}`,
    `## Selected projects\n${list(projects.map((p) => `${p.title}: ${p.description}`))}`,
    `## Skills\n${list(
      skills.map((s) => `${s.group}: ${[...s.items, ...(s.familiar ?? []).map((f) => `${f} (familiar)`)].join(', ')}`),
    )}`,
    `## Education\n${list(education.map((e) => `${e.degree}, ${e.school} (${e.start} – ${e.end})`))}`,
    `## Publications\n${list(
      publications.map((p) => `${p.authors} "${p.title}", ${p.venue}, ${p.year}.${p.url ? ` ${p.url}` : ''}`),
    )}`,
    `## Honors & awards\n${list(honors.map((h) => `${h.title}, ${h.issuer} (${h.year})`))}`,
    `## Certificates\n${list(certificates.map((c) => `${c.title}, ${c.issuer} (${c.year}): ${c.url}`))}`,
    `## Leadership & volunteering\n${list(leadership.map((l) => `${l.text} (${l.year})`))}`,
    ...(posts.length
      ? [
          `## Blog\n${list(
            posts.map((p) => `[${p.data.title}](${new URL(postUrl(p), site).href}): ${p.data.description}`),
          )}`,
        ]
      : []),
  ].join('\n\n');

  return new Response(`${body}\n`, { headers: { 'Content-Type': 'text/plain; charset=utf-8' } });
};
