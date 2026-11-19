// A small shell over the resume data: named commands plus free-text search.
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
import { toggleTheme, setTheme } from './theme';

const panel = document.querySelector<HTMLElement>('#terminal');
const out = panel?.querySelector<HTMLElement>('[data-term-out]');
const form = panel?.querySelector<HTMLFormElement>('[data-term-form]');
const input = panel?.querySelector<HTMLInputElement>('input');

if (panel && out && form && input) {
  const isMac = /Mac|iPhone|iPad/.test(navigator.platform);
  document.querySelectorAll('[data-term-kbd]').forEach((el) => (el.textContent = isMac ? '⌘K' : 'Ctrl K'));

  /* ---------- output helpers ---------- */
  let delay = 0;
  function line(cls = '') {
    const el = document.createElement('div');
    el.className = `t-line ${cls}`;
    el.style.animationDelay = `${delay}ms`;
    delay += 18;
    out!.append(el);
    return el;
  }
  const print = (text = '', cls = '') => (line(cls).textContent = text);
  const head = (text: string) => print(text, 't-head');
  const dim = (text: string) => print(text, 't-dim');
  const item = (text: string) => print(`• ${plain(text)}`, 't-item');
  function link(label: string, href: string) {
    const a = document.createElement('a');
    a.href = href;
    a.textContent = label;
    if (/^https?:/.test(href)) a.rel = 'noopener';
    line('t-link').append('→ ', a);
  }
  /** Print text with the matched terms wrapped in <mark>. */
  function marked(text: string, terms: string[], cls = '') {
    const el = line(cls);
    const re = new RegExp(`(${terms.map((t) => t.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')).join('|')})`, 'gi');
    for (const part of text.split(re)) {
      if (!part) continue;
      if (terms.some((t) => t.toLowerCase() === part.toLowerCase())) {
        const m = document.createElement('mark');
        m.textContent = part;
        el.append(m);
      } else {
        el.append(part);
      }
    }
  }
  const jump = (id: string, label: string) => link(`jump to ${label}`, `#${id}`);

  /* ---------- commands ---------- */
  type Command = { desc: string; run: (args: string[]) => void };
  const commands: Record<string, Command> = {
    help: {
      desc: 'list commands',
      run() {
        head('Commands');
        for (const [name, cmd] of Object.entries(commands)) {
          const el = line('t-kv');
          const key = document.createElement('button');
          key.type = 'button';
          key.className = 't-cmd';
          key.textContent = name;
          key.addEventListener('click', () => execute(name));
          const val = document.createElement('span');
          val.textContent = cmd.desc;
          el.append(key, val);
        }
        dim('Anything else is searched across the resume. Try: azure, rag, pytorch');
      },
    },
    about: {
      desc: 'who is Ali?',
      run() {
        head(`${profile.name} · ${profile.role}, ${profile.focus}`);
        print(plain(profile.tagline));
        summary.forEach(item);
        dim(`${profile.location} · ${profile.availability} · ${profile.degrees}`);
        dim(profile.motto.join(' · '));
      },
    },
    experience: {
      desc: 'work history',
      run() {
        for (const job of experience) {
          head(`${job.role} @ ${job.company}`);
          dim(`${job.start} – ${job.end} · ${job.location}`);
          job.bullets.forEach(item);
        }
        jump('experience', 'Experience');
      },
    },
    projects: {
      desc: 'selected projects',
      run() {
        for (const p of projects) {
          head(p.title);
          print(plain(p.description));
          dim(p.tags.join(' · '));
        }
        jump('projects', 'Projects');
      },
    },
    skills: {
      desc: 'tech stack by area',
      run() {
        for (const s of skills) {
          const el = line('t-kv');
          const key = document.createElement('b');
          key.textContent = s.group;
          const val = document.createElement('span');
          val.textContent = [...s.items, ...(s.familiar ?? []).map((f) => `${f} (familiar)`)].join(', ');
          el.append(key, val);
        }
        jump('skills', 'Skills');
      },
    },
    education: {
      desc: 'degrees',
      run() {
        for (const e of education) {
          head(e.degree);
          dim(`${e.school} · ${e.start} – ${e.end}`);
          e.details.forEach(item);
        }
      },
    },
    publications: {
      desc: 'papers and abstracts',
      run() {
        publications.forEach((p, i) => {
          print(`[${i + 1}] ${p.title}`, 't-item');
          dim(`    ${plain(p.authors)} ${p.venue}, ${p.year}.`);
          if (p.url) link(p.url.replace(/^https?:\/\//, ''), p.url);
        });
      },
    },
    awards: {
      desc: 'honors and certificates',
      run() {
        head('Honors & awards');
        honors.forEach((h) => item(`${h.title}, ${h.issuer} (${h.year})`));
        head('Certificates');
        certificates.forEach((c) => item(`${c.title}, ${c.issuer} (${c.year})`));
        head('Leadership & volunteering');
        leadership.forEach((l) => item(`${l.text} (${l.year})`));
      },
    },
    contact: {
      desc: 'how to reach Ali',
      run() {
        head('Contact');
        link(profile.email, `mailto:${profile.email}`);
        link('LinkedIn', profile.linkedin);
        link('GitHub', profile.github);
        dim(`${profile.location} · ${profile.availability}`);
      },
    },
    email: {
      desc: 'copy the email address',
      run() {
        navigator.clipboard?.writeText(profile.email).then(
          () => print(`Copied ${profile.email} to the clipboard.`, 't-ok'),
          () => print(profile.email),
        );
      },
    },
    pdf: {
      desc: 'print / save the resume as PDF',
      run() {
        print('Opening the print dialog…', 't-ok');
        setTimeout(() => window.print(), 300);
      },
    },
    theme: {
      desc: 'toggle light / dark (theme dark|light)',
      run([mode]) {
        if (mode === 'dark' || mode === 'light') setTheme(mode);
        else mode = toggleTheme();
        print(`Theme set to ${mode}.`, 't-ok');
      },
    },
    clear: {
      desc: 'clear the screen',
      run() {
        out!.replaceChildren();
      },
    },
    exit: { desc: 'close the terminal', run: () => close() },
  };

  const aliases: Record<string, string> = {
    '?': 'help',
    ls: 'help',
    whoami: 'about',
    work: 'experience',
    jobs: 'experience',
    stack: 'skills',
    papers: 'publications',
    pubs: 'publications',
    certs: 'awards',
    honors: 'awards',
    resume: 'pdf',
    cv: 'pdf',
    print: 'pdf',
    mail: 'email',
    hire: 'contact',
    quit: 'exit',
    cls: 'clear',
  };

  /* ---------- search ---------- */
  type Doc = { where: string; text: string };
  const corpus: Doc[] = [
    ...summary.map((text) => ({ where: 'About', text: plain(text) })),
    ...experience.flatMap((job) => job.bullets.map((b) => ({ where: `${job.role} @ ${job.company}`, text: plain(b) }))),
    ...projects.map((p) => ({ where: `Project · ${p.title}`, text: plain(p.description) })),
    ...skills.map((s) => ({ where: `Skills · ${s.group}`, text: [...s.items, ...(s.familiar ?? [])].join(', ') })),
    ...education.map((e) => ({ where: 'Education', text: `${e.degree}, ${e.school}. ${e.details.join('. ')}` })),
    ...publications.map((p) => ({ where: 'Publication', text: `${p.title}. ${p.venue}, ${p.year}` })),
    ...honors.map((h) => ({ where: 'Honor', text: `${h.title}, ${h.issuer} (${h.year})` })),
    ...certificates.map((c) => ({ where: 'Certificate', text: `${c.title}, ${c.issuer} (${c.year})` })),
    ...leadership.map((l) => ({ where: 'Leadership', text: plain(l.text) })),
  ];
  const stopwords = new Set(
    'a an and are about any can did do does for has have he his how i in is it know me of on or tell the to used using was what when where which who with you your ali experience worked work'.split(
      ' ',
    ),
  );
  function search(query: string) {
    const terms = [...new Set(query.toLowerCase().match(/[a-z0-9+#./-]{2,}/g) ?? [])].filter((t) => !stopwords.has(t));
    if (!terms.length) return dim('Type `help` to see what this shell can do.');
    const hits = corpus
      .map((doc) => ({ doc, score: terms.filter((t) => doc.text.toLowerCase().includes(t)).length }))
      .filter((h) => h.score > 0)
      .sort((a, b) => b.score - a.score);
    if (!hits.length) {
      print(`No matches for "${terms.join(' ')}".`, 't-err');
      return dim('Try a technology or topic (azure, etl, shap), or `help`.');
    }
    const shown = hits.slice(0, 6);
    head(`${hits.length} match${hits.length === 1 ? '' : 'es'} for "${terms.join(' ')}"`);
    for (const { doc } of shown) {
      dim(doc.where);
      marked(doc.text, terms);
    }
    if (hits.length > shown.length) dim(`…and ${hits.length - shown.length} more. Narrow it down with another word.`);
  }

  /* ---------- run loop ---------- */
  const history: string[] = [];
  let cursor = 0;
  function execute(raw: string) {
    const text = raw.trim();
    if (!text) return;
    delay = 0;
    history.push(text);
    cursor = history.length;
    const echo = line('t-echo');
    const prompt = document.createElement('span');
    prompt.className = 't-prompt';
    prompt.textContent = '❯ ';
    echo.append(prompt, text);

    const [word, ...args] = text.toLowerCase().split(/\s+/);
    const name = aliases[word] ?? word;
    if (word === 'sudo') print('visitor is not in the sudoers file. Nice try.', 't-err');
    else if (name in commands) commands[name].run(args);
    else search(text);

    requestAnimationFrame(() => echo.scrollIntoView({ block: 'start', behavior: 'smooth' }));
  }

  form.addEventListener('submit', (e) => {
    e.preventDefault();
    execute(input.value);
    input.value = '';
  });

  input.addEventListener('keydown', (e) => {
    if (e.key === 'ArrowUp' || e.key === 'ArrowDown') {
      if (!history.length) return;
      e.preventDefault();
      cursor = Math.max(0, Math.min(history.length, cursor + (e.key === 'ArrowUp' ? -1 : 1)));
      input.value = history[cursor] ?? '';
    } else if (e.key === 'Tab' && input.value) {
      const names = [...Object.keys(commands), ...Object.keys(aliases)];
      const match = names.find((n) => n.startsWith(input.value.toLowerCase()));
      if (match) {
        e.preventDefault();
        input.value = match;
      }
    }
  });

  panel.querySelectorAll<HTMLButtonElement>('[data-term-run]').forEach((chip) =>
    chip.addEventListener('click', () => {
      execute(chip.dataset.termRun ?? '');
      input.focus({ preventScroll: true });
    }),
  );

  /* ---------- open / close ---------- */
  let opener: HTMLElement | null = null;
  let greeted = false;
  const isOpen = () => !panel.hidden;
  function open() {
    if (isOpen()) return;
    opener = document.activeElement as HTMLElement | null;
    panel!.hidden = false;
    document.documentElement.classList.add('term-open');
    if (!greeted) {
      greeted = true;
      print('AF resume shell', 't-head');
      dim('Type a command, or any keyword to search this resume.');
      dim('Start with `help`, or try: azure, rag, pytorch');
    }
    input!.focus({ preventScroll: true });
  }
  function close() {
    if (!isOpen()) return;
    panel!.hidden = true;
    document.documentElement.classList.remove('term-open');
    opener?.focus({ preventScroll: true });
  }

  document.querySelectorAll('[data-term-open]').forEach((el) => el.addEventListener('click', () => (isOpen() ? close() : open())));
  panel.querySelectorAll('[data-term-close]').forEach((el) => el.addEventListener('click', close));
  // Following a "jump to" link on a phone should reveal the page behind the sheet.
  out.addEventListener('click', (e) => {
    const a = (e.target as HTMLElement).closest('a');
    if (a?.getAttribute('href')?.startsWith('#') && matchMedia('(max-width: 760px)').matches) close();
  });
  addEventListener('keydown', (e) => {
    if ((e.metaKey || e.ctrlKey) && e.key.toLowerCase() === 'k') {
      e.preventDefault();
      isOpen() ? close() : open();
    } else if (e.key === 'Escape' && isOpen()) {
      close();
    }
  });
}
