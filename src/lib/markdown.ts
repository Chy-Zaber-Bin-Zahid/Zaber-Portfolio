import { marked } from "marked";

marked.use({ gfm: true, breaks: false });

/** Render a Markdown string to HTML at build time. */
export function renderMarkdown(source: string): string {
  return marked.parse(source, { async: false });
}

/** Render Markdown without wrapping the result in a paragraph. */
export function renderInlineMarkdown(source: string): string {
  return marked.parseInline(source, { async: false });
}
