# Zaber Bin Zahid — Portfolio

Personal portfolio and blog, live at [portfolio-zaber.vercel.app](https://portfolio-zaber.vercel.app).

Built with [Astro 7](https://astro.build), [Tailwind CSS 4](https://tailwindcss.com), and React 19 islands
for the interactive pieces (dock navbar, work-experience accordion, project cards, recommendations carousel,
flickering-grid background). Everything else is static HTML rendered at build time.

## Features

- Single config file for all content: [`src/data/resume.ts`](./src/data/resume.ts)
- Sections: hero, about, work, education, skills, projects, **open-source contributions**, recommendations, contact
- MDX blog with content collections, Shiki dual-theme highlighting, code titles, and a copy button
- OpenGraph images generated at build time with Satori (`/og.png`, `/blog/og.png`, `/blog/<slug>/og.png`)
- Light/dark theme (persisted in `localStorage`), self-hosted Geist fonts via the Astro Fonts API
- Fully static output, deployable to Vercel or any static host (`vercel.json` adds security headers)

## Getting Started

```bash
pnpm install
pnpm dev      # http://localhost:4321
pnpm build    # outputs to dist/
pnpm preview  # serve the production build
pnpm check    # type-check .astro/.ts files
```

## Editing Content

- **Profile, work, projects, recommendations, open-source contributions**: edit `src/data/resume.ts`.
  Icons are referenced by string key; the maps live in `src/data/icons.ts` (skills) and
  `src/components/nav-icons.tsx` (navbar).
- **Blog posts**: add `.mdx` files to `src/content/blog/`. Frontmatter schema is in `src/content.config.ts`.
  Use ` ```ts title="file.ts" ` for a titled code block and `<MediaContainer src="..." />` for media.
- **Styles / theme tokens**: `src/styles/global.css`.

## Project Structure

```
src/
  components/     Astro components + React islands (section/, magicui/, ui/, mdx/)
  content/blog/   MDX posts
  data/           resume.ts (content) and icons.ts (icon maps)
  layouts/        BaseLayout.astro (head, fonts, theme script, navbar)
  lib/            markdown, posts, OG image rendering, Shiki transformer
  pages/          index, 404, blog routes, OG image endpoints
  styles/         global.css (Tailwind v4 theme)
```

Originally based on [dillionverma/portfolio](https://github.com/dillionverma/portfolio) (MIT).
