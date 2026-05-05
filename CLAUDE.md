# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build (runs contentlayer + next build)
pnpm preview      # Build then start production server
pnpm lint         # ESLint via next lint
```

## Architecture

This is a multilingual personal blog built with **Next.js 14 App Router**, **Contentlayer** (MDX content), and **next-intl** (i18n).

### Content Pipeline

1. MDX files live in `content/{locale}/{type}/` (e.g. `content/ko/posts/`, `content/en/pages/`)
2. Contentlayer processes them into typed objects at `.contentlayer/generated/`
3. Components import `allPosts` / `allPages` from `contentlayer/generated`
4. Runtime filtering by locale and slug happens in page components

Post frontmatter schema:
```yaml
title: ""
description: ""
date: 2024-01-01
tags:
  - TagName
```

`slugAsParams` is computed as `posts/algorithm-heap` — the `posts/` prefix is already included (locale segment is stripped).

### i18n Routing

- Supported locales: `ko` (default), `en`, `ja`
- URL pattern: `/` for Korean, `/en/`, `/ja/` for others (`as-needed` prefix strategy)
- Translation strings live in `messages/{locale}.json`
- Always use the locale-aware `Link` from `@/i18n/navigation`, not Next.js's built-in `Link`
- Server components use `getTranslations()`, client components use `useTranslations()`

### Key Directories

- `src/app/[locale]/` — all page routes (locale is dynamic segment)
- `src/components/` — React components
- `src/i18n/` — routing config, middleware helpers, constants
- `content/` — MDX source files by locale
- `messages/` — i18n JSON translation strings

### Styling & Design

Tailwind CSS with a **warm minimalist aesthetic** (see `DESIGN.md` for full spec):
- Background: `#f2f1ed` (warm cream), Text: `#26251e`, Accent: `#f54e00` (orange)
- Dark mode via `class` strategy — CSS variables defined in `src/app/globals.css`
- Typography: CursorGothic (display), jjannon (body), berkeleyMono (code)
- 8px base spacing system

### Formatter

**Biome** is the formatter/linter (not Prettier). Rules: 2-space indent, double quotes, no semicolons. Run via `biome check` or let the editor extension handle it.

### Deployment

Vercel. `SITE_URL` env var sets the canonical base URL (default: `https://blog.wichan.dev`).
