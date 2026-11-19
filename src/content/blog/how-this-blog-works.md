---
title: How this blog works
description: A tour of everything a post can contain, and the three steps to publish one.
date: 2026-11-19
tags: [meta, markdown]
draft: true
---

> **Example post.** This is placeholder content so you can see the layout. It is marked `draft: true`, so it shows
> up in `pnpm dev` but is never published. Edit it, or delete the file.

## Writing a post

Every post is one Markdown file in `src/content/blog/`. The file name becomes the URL, so `my-first-post.md` is
served at `/blog/my-first-post/`.

1. Create `src/content/blog/my-first-post.md`.
2. Start it with the frontmatter block below.
3. Write Markdown underneath. Set `draft: false` (or remove the line) when it is ready to go live.

```yaml
---
title: My first post
description: One sentence that shows up in the post list and in link previews.
date: 2026-11-19
tags: [python, azure]
draft: true
---
```

## Text

Paragraphs are plain text. You get **bold**, _italic_, `inline code`, ~~strikethrough~~ and
[links](https://afirooz.github.io) without any extra syntax. Headings at level two and three are collected into the
"On this page" list on wide screens, and each one gets a link you can copy by hovering over it.

### Lists

- Unordered lists use a dash.
- They can nest:
  - like this,
  - and this.

1. Ordered lists use numbers.
2. The numbers are restyled to match the site.

### Quotes

> The math of time is simple: you have less than you think and need more than you know.

## Code

Fenced code blocks are highlighted at build time, follow the light or dark theme, and get a copy button.

```python
from pathlib import Path


def count_words(path: Path) -> int:
    """Return the number of whitespace-separated words in a file."""
    return len(path.read_text(encoding="utf-8").split())


if __name__ == "__main__":
    print(count_words(Path("post.md")))
```

```bash
pnpm dev      # preview, drafts included
pnpm build    # what gets published, drafts excluded
```

## Tables

| Syntax        | Renders as          | Notes                         |
| ------------- | ------------------- | ----------------------------- |
| `**text**`    | **text**            | Use for the one key phrase    |
| `` `code` ``  | `code`              | Identifiers, commands, paths  |
| `[a](url)`    | [a](https://astro.build) | External links are fine  |

Wide tables scroll sideways on a phone instead of breaking the page.

## Images

Put the image next to the post and reference it with a relative path. It is resized and converted to WebP for you.

```md
![Architecture diagram](./architecture.png)
```

---

That is the whole system: Markdown in, a static page out.
