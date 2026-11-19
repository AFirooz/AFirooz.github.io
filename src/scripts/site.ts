// Page behaviour. Everything here is progressive: the page reads fine without it.

const reduceMotion = matchMedia('(prefers-reduced-motion: reduce)').matches;
const $$ = <T extends Element = HTMLElement>(sel: string, scope: ParentNode = document) => [
  ...scope.querySelectorAll<T>(sel),
];

/* Print */
$$('[data-print]').forEach((el) => el.addEventListener('click', () => window.print()));

/* Reveal on scroll */
const reveals = $$('.reveal');
if ('IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        entry.target.classList.add('is-in');
        io.unobserve(entry.target);
      }
    },
    { rootMargin: '0px 0px -8% 0px' },
  );
  reveals.forEach((el) => io.observe(el));
} else {
  reveals.forEach((el) => el.classList.add('is-in'));
}

/* Scroll progress bar + active nav link */
const progress = document.querySelector<HTMLElement>('[data-progress]');
const navLinks = $$<HTMLAnchorElement>('.nav a[href^="#"]');
const spied = $$('[data-spy]').filter((s) => navLinks.some((l) => l.hash === `#${s.id}`));
let ticking = false;
function onScroll() {
  ticking = false;
  const doc = document.documentElement;
  const max = doc.scrollHeight - innerHeight;
  progress?.style.setProperty('--progress', max > 0 ? String(Math.min(1, scrollY / max)) : '0');

  // The active section is the last linked one whose top has crossed 35% of the
  // viewport; at the very bottom it is the last one, which may be too short to cross.
  const line = innerHeight * 0.35;
  let current = '';
  for (const section of spied) {
    if (section.getBoundingClientRect().top <= line) current = section.id;
  }
  if (max > 0 && scrollY >= max - 2) current = spied.at(-1)?.id ?? current;
  for (const link of navLinks) {
    link.classList.toggle('is-active', link.hash === `#${current}`);
  }
}
addEventListener(
  'scroll',
  () => {
    if (ticking) return;
    ticking = true;
    requestAnimationFrame(onScroll);
  },
  { passive: true },
);
onScroll();

/* Count-up stats */
const counters = $$('[data-count]');
const counterText = (el: HTMLElement, progress = 1) =>
  (Number(el.dataset.count) * progress).toFixed(Number(el.dataset.decimals ?? 0)) + (el.dataset.suffix ?? '');
function runCounter(el: HTMLElement) {
  const duration = 1400;
  const start = performance.now();
  const tick = (now: number) => {
    if (el.dataset.done) return;
    const t = Math.min(1, (now - start) / duration);
    el.textContent = counterText(el, 1 - Math.pow(1 - t, 4));
    if (t < 1) requestAnimationFrame(tick);
  };
  requestAnimationFrame(tick);
}
// A printout must never catch a counter mid-run.
addEventListener('beforeprint', () => {
  for (const el of counters) {
    el.dataset.done = 'true';
    el.textContent = counterText(el);
  }
});
if (!reduceMotion && 'IntersectionObserver' in window) {
  const io = new IntersectionObserver(
    (entries) => {
      for (const entry of entries) {
        if (!entry.isIntersecting) continue;
        runCounter(entry.target as HTMLElement);
        io.unobserve(entry.target);
      }
    },
    { threshold: 0.6 },
  );
  counters.forEach((el) => io.observe(el));
}

/* Hero: type through the "I build ..." phrases */
const rotator = document.querySelector<HTMLElement>('[data-rotator]');
if (rotator && !reduceMotion) {
  const phrases: string[] = JSON.parse(rotator.dataset.rotator ?? '[]');
  const text = rotator.querySelector<HTMLElement>('[data-rotator-text]');
  if (text && phrases.length > 1) {
    let phrase = 0;
    let chars = phrases[0].length;
    let deleting = true;
    const step = () => {
      const current = phrases[phrase];
      let delay: number;
      if (deleting) {
        chars -= 1;
        delay = 28;
        if (chars === 0) {
          deleting = false;
          phrase = (phrase + 1) % phrases.length;
          delay = 320;
        }
      } else {
        chars += 1;
        delay = 55 + Math.random() * 45;
        if (chars === phrases[phrase].length) {
          deleting = true;
          delay = 2400;
        }
      }
      text.textContent = (deleting ? current : phrases[phrase]).slice(0, chars);
      setTimeout(step, delay);
    };
    setTimeout(step, 2600);
  }
}

/* Cursor spotlight on cards */
if (matchMedia('(hover: hover)').matches) {
  for (const card of $$('.spot')) {
    card.addEventListener('pointermove', (e) => {
      const rect = card.getBoundingClientRect();
      card.style.setProperty('--mx', `${e.clientX - rect.left}px`);
      card.style.setProperty('--my', `${e.clientY - rect.top}px`);
    });
  }
}

/* Tabs (arrow keys move between tabs) */
for (const tabs of $$('[data-tabs]')) {
  const buttons = $$<HTMLButtonElement>('[role="tab"]', tabs);
  const panels = $$('[role="tabpanel"]', tabs);
  const select = (index: number, focus = false) => {
    buttons.forEach((btn, i) => {
      const on = i === index;
      btn.setAttribute('aria-selected', String(on));
      btn.tabIndex = on ? 0 : -1;
      panels[i].classList.toggle('is-active', on);
      if (on && focus) btn.focus();
    });
  };
  buttons.forEach((btn, i) => {
    btn.addEventListener('click', () => select(i));
    btn.addEventListener('keydown', (e) => {
      const dir = e.key === 'ArrowRight' ? 1 : e.key === 'ArrowLeft' ? -1 : 0;
      if (!dir) return;
      e.preventDefault();
      select((i + dir + buttons.length) % buttons.length, true);
    });
  });
  tabs.classList.add('is-ready');
  select(0);
}

/* Copy to clipboard buttons */
for (const btn of $$('[data-copy]')) {
  const label = btn.querySelector<HTMLElement>('[data-copy-label]');
  const original = label?.textContent ?? '';
  btn.addEventListener('click', async () => {
    try {
      await navigator.clipboard.writeText(btn.dataset.copy ?? '');
      btn.classList.add('is-copied');
      if (label) label.textContent = 'Copied';
      setTimeout(() => {
        btn.classList.remove('is-copied');
        if (label) label.textContent = original;
      }, 1800);
    } catch {}
  });
}
