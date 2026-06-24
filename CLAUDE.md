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

## Editing documentation copy - Verification Layer

For any addition or modification to the copy of a docs page you must critique and verify your changes against the following rules:

- **No redundancy**
- **No explanation needed.** 
- **Simple and easy to understand.** 
- **Voice: professional and direct.** State rules plainly. No hedging, editorializing, or filler ("the decision is straightforward", "feels cramped"). This is documentation, not UI copy — don't apply the product Voice page's UI conventions (second person, contractions) here.
- **One home per rule.** Each rule lives in exactly one normative section. Other sections (tables, Do/Don't) must add specifics — decision lookups, edge cases, examples — not restate rules in different words. Cut anything that only rewords what another section already says.
- **Cross-link instead of repeat.** If another page owns a concept, link to it rather than restating it.
- **Lead with scope.** Before rewriting, briefly map the redundancy and propose what to cut, merge, or keep — then proceed with the tightening (voice + de-duplication) by default. Only pause for direction if adding new coverage that introduces claims you can't verify.


Ask questions whenever in doubt instead of providing formulaic responses. Do it when you think the go-to response is vague, and you could use some clarification to create a better response. Always use AskUserQuestion tool for questions instead of numbering them.