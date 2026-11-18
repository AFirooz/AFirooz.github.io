const escapeHtml = (s: string) =>
  s.replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');

/** Escape text, then turn **bold** markers into <strong>. Use with set:html. */
export const fmt = (s: string) => escapeHtml(s).replace(/\*\*(.+?)\*\*/g, '<strong>$1</strong>');

/** Drop **bold** markers for plain-text contexts (meta tags, llms.txt). */
export const plain = (s: string) => s.replace(/\*\*(.+?)\*\*/g, '$1');
