const root = document.documentElement;

export type Theme = 'light' | 'dark';

export const getTheme = (): Theme => (root.dataset.theme === 'dark' ? 'dark' : 'light');

export function setTheme(next: Theme) {
  root.dataset.theme = next;
  try {
    localStorage.setItem('theme', next);
  } catch {}
}

export const toggleTheme = () => {
  const next: Theme = getTheme() === 'dark' ? 'light' : 'dark';
  setTheme(next);
  return next;
};
