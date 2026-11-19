// Blog post behaviour: external links in new tabs, heading links, copy buttons on code, and the active "On this page" entry.
const body = document.querySelector<HTMLElement>('[data-post-body]');

if (body) {
  /* Links that leave the site open in a new tab */
  for (const a of body.querySelectorAll<HTMLAnchorElement>('a[href]')) {
    if (/^https?:$/.test(a.protocol) && a.host !== location.host) {
      a.target = '_blank';
      a.rel = 'noopener';
    }
  }

  /* A "#" link next to each section heading */
  for (const heading of body.querySelectorAll<HTMLElement>('h2[id], h3[id]')) {
    const a = document.createElement('a');
    a.className = 'anchor';
    a.href = `#${heading.id}`;
    a.textContent = '#';
    a.setAttribute('aria-label', `Link to "${heading.textContent}"`);
    heading.append(a);
  }

  /* Copy button on every code block */
  for (const pre of body.querySelectorAll('pre')) {
    const wrap = document.createElement('div');
    wrap.className = 'code';
    pre.replaceWith(wrap);

    const btn = document.createElement('button');
    btn.type = 'button';
    btn.className = 'code-copy';
    btn.textContent = 'Copy';
    btn.addEventListener('click', async () => {
      try {
        await navigator.clipboard.writeText(pre.querySelector('code')?.textContent ?? '');
        btn.textContent = 'Copied';
        btn.classList.add('is-copied');
        setTimeout(() => {
          btn.textContent = 'Copy';
          btn.classList.remove('is-copied');
        }, 1600);
      } catch {}
    });
    wrap.append(pre, btn);
  }

  /* Highlight the section being read in the table of contents */
  const links = [...document.querySelectorAll<HTMLAnchorElement>('.toc a')];
  if (links.length) {
    const headings = links
      .map((link) => document.getElementById(decodeURIComponent(link.hash.slice(1))))
      .filter((h): h is HTMLElement => h !== null);
    let ticking = false;
    const update = () => {
      ticking = false;
      const line = innerHeight * 0.3;
      let current = headings[0]?.id;
      for (const h of headings) {
        if (h.getBoundingClientRect().top <= line) current = h.id;
      }
      for (const link of links) {
        link.classList.toggle('is-active', decodeURIComponent(link.hash.slice(1)) === current);
      }
    };
    addEventListener(
      'scroll',
      () => {
        if (ticking) return;
        ticking = true;
        requestAnimationFrame(update);
      },
      { passive: true },
    );
    update();
  }
}
