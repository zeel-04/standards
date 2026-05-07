# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm install     # Install dependencies
pnpm dev         # Start dev server at http://localhost:3000
pnpm build       # Production build + Pagefind indexing + llms.txt generation
pnpm start       # Serve production build
```

No lint or test scripts are configured.

## Architecture

This is a **documentation site** for an internal design system, built with:

- **Next.js 16** (App Router) + **Nextra 4** — MDX-based docs framework with built-in sidebar navigation, search, and theming
- **shadcn/ui** + **Tailwind CSS v4** — component styling foundation
- **Pagefind** — static search index generated post-build from `.next/server/app`

### Key directories

- `content/` — MDX documentation pages; Nextra reads this directory for navigation. `_meta.ts` files control sidebar order and labels.
  - `foundations/` — design tokens, spacing, iconography
  - `patterns/` — UX patterns
  - `writing/` — tone/voice guidelines
- `components/` — React components used inside MDX files
  - `ui/` — shadcn/ui base components (Button, Card, Dialog, etc.)
  - `demos/` — interactive component demo wrappers rendered in docs
  - `preview.jsx` — wraps demo components for consistent live preview display
  - `code-block.jsx` — syntax-highlighted code block used in MDX
- `app/` — minimal Next.js App Router entry; Nextra wraps the layout
- `scripts/generate-llms-txt.mjs` — runs after build to produce `llms.txt` for LLM context

### Adding documentation

New MDX pages go in `content/` (or a subdirectory). Update the nearest `_meta.ts` to control where the page appears in the sidebar.

### Adding components

Use the shadcn CLI or add files manually to `components/ui/`. Path alias `@/` maps to the repo root. Component variants use `class-variance-authority`; utility merging uses `tailwind-merge` + `clsx` via `lib/utils`.

### Nextra configuration

`next.config.mjs` wraps Next.js config with Nextra. `mdx-components.js` registers custom MDX components globally (making them available in all `.mdx` files without imports). `components.json` is the shadcn/ui config (Tailwind CSS variables enabled, Lucide icons).
