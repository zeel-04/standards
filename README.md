# Standards

Documentation site for internal standards across design, requirements, and more — powered by [Nextra](https://nextra.site/) on Next.js. The Design domain is built on **shadcn/ui** + **Tailwind v4**.

## Getting started

```bash
pnpm install
pnpm dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

- `pnpm dev` — start the dev server
- `pnpm build` — production build (runs Pagefind indexing after)
- `pnpm start` — serve the production build

## Structure

- `content/` — MDX docs, organised by domain (`design/`, `requirements/`, …)
- `components/` — shared UI and MDX components
- `app/` — Next.js App Router entry
