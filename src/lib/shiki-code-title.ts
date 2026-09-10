import type { ShikiTransformer } from "shiki";

/**
 * Reads the ``` fence meta string (e.g. `title="file.ts"`) and exposes it as
 * `data-title` on the rendered <pre>, replacing the old remark-code-meta plugin.
 * Works with both the Sätteri and unified pipelines.
 */
export function codeTitleTransformer(): ShikiTransformer {
  return {
    name: "code-title",
    pre(node) {
      const meta = this.options.meta as
        | string
        | { __raw?: string }
        | undefined;
      const raw = typeof meta === "string" ? meta : meta?.__raw;
      if (!raw) return;
      const match = raw.match(/title="([^"]+)"/);
      if (match?.[1]) {
        node.properties["data-title"] = match[1];
      }
    },
  };
}
