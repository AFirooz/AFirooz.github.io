import { defineConfig } from 'astro/config';

export default defineConfig({
  site: 'https://afirooz.github.io',
  markdown: {
    // Both themes are emitted as CSS variables; global.css picks one with light-dark().
    shikiConfig: {
      themes: { light: 'github-light', dark: 'github-dark' },
      defaultColor: false,
    },
  },
});
