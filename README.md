# afirooz.github.io

Ali Firooz's resume as a website: <https://afirooz.github.io>

Static single page built with [Astro](https://astro.build). No client framework, no backend.

## Edit the content

Everything the page shows lives in one file: `src/data/resume.ts`. It mirrors the MS CS variant of the LaTeX resume.
Wrap text in `**double asterisks**` to bold it.

| What                                   | Where                              |
| -------------------------------------- | ---------------------------------- |
| Text, links, email, section content    | `src/data/resume.ts`               |
| Section order and markup               | `src/pages/index.astro`            |
| Colors, fonts, layout, print styles    | `src/styles/global.css`            |
| `<head>`, SEO tags, JSON-LD            | `src/layouts/Base.astro`           |
| Interactions and the terminal          | `src/scripts/`                     |
| Avatar, original portrait, logo        | `src/assets/`                      |
| Favicon, social card, robots, sitemap  | `public/`                          |
| Plain-text resume for LLM crawlers     | `src/pages/llms.txt.ts`            |

## Run locally

Requires Node 22.23+ and pnpm.

```sh
pnpm install
pnpm dev       # http://localhost:4321, live reload
pnpm build     # static output in dist/
pnpm preview   # serve dist/
```

## Deploy

`.github/workflows/deploy.yml` builds and publishes to GitHub Pages on every push to `master`.
The repository's Pages source must be set to **GitHub Actions** (Settings → Pages → Build and deployment → Source).

## Features

- Hero with a typed "I build ..." rotator, animated circuit traces, and a scrolling tech strip
- Resume terminal (button bottom right, or Cmd/Ctrl+K): named commands plus keyword search over the resume, all client-side (`src/scripts/terminal.ts`)
- Count-up stats, scroll progress bar, active-section nav, cursor spotlight on cards, tabs, copy-email button (`src/scripts/site.ts`)
- Light and dark themes (follows the system, toggle remembers the choice)
- Print stylesheet: the "Save as PDF" button prints the page as a paper resume
- Everything animated respects `prefers-reduced-motion`, and the page reads fine with JavaScript off
- `Person` JSON-LD, Open Graph card, `sitemap.xml`, `robots.txt`, `llms.txt`

## Profile picture

`src/assets/avatar.png` is `src/assets/portrait.jpg` with the background removed (macOS Vision subject mask) and
replaced by a charcoal backdrop with blue and copper glows, matching the LinkedIn banner. To use a different photo, replace `avatar.png` with any square image.
