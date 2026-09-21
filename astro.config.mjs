// @ts-check
import { defineConfig, fontProviders } from "astro/config";
import react from "@astrojs/react";
import mdx from "@astrojs/mdx";
import sitemap from "@astrojs/sitemap";
import tailwindcss from "@tailwindcss/vite";
import { DATA } from "./src/data/resume";
import { codeTitleTransformer } from "./src/lib/shiki-code-title";


export default defineConfig({
  site: DATA.url,
  output: "static",
  integrations: [
    react(),
    mdx(),
    // The blog has no posts yet, so keep its empty pages out of search.
    sitemap({ filter: (page) => !page.includes("/blog") }),
  ],
  vite: {
    plugins: [tailwindcss()],
  },
  markdown: {
    shikiConfig: {
      themes: {
        light: "github-light",
        dark: "github-dark",
      },
      defaultColor: false,
      transformers: [codeTitleTransformer()],
    },
  },
  fonts: [
    {
      provider: fontProviders.google(),
      name: "Geist",
      cssVariable: "--font-geist",
      weights: [400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-sans-serif", "system-ui", "sans-serif"],
    },
    {
      provider: fontProviders.google(),
      name: "Geist Mono",
      cssVariable: "--font-geist-mono",
      weights: [300, 400, 500, 600, 700],
      styles: ["normal"],
      subsets: ["latin"],
      fallbacks: ["ui-monospace", "SFMono-Regular", "monospace"],
    },
  ],
});
