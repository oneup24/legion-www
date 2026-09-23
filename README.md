# LegionOne Marketing Site

Next.js 15 (App Router) + TypeScript + Tailwind v4 marketing site for LegionOne. zh-HK primary, EN scaffolded.

## Stack

- Next.js 15 App Router, React 19, TypeScript strict
- Tailwind CSS v4 (CSS variables via `@theme`)
- `next-intl` for i18n (`zh-HK` shippable, `en` empty scaffolding)
- Radix UI primitives (Dialog)
- framer-motion for scroll animations (gated by `prefers-reduced-motion`)
- Resend + Google Sheets for lead capture
- Vercel Analytics + GA4 ready

## Quick start

```bash
pnpm install
cp .env.example .env.local        # fill in keys (optional in dev)
pnpm dev                          # http://localhost:3000  (redirects to /zh-HK)
```

## Build

```bash
pnpm build
pnpm start
```

## Environment

See `.env.example`. Without `RESEND_API_KEY` / `GOOGLE_SHEETS_ID`, lead capture falls back to console logging and still returns `200 { ok: true }` so the UX works in dev.

## Project structure

```
app/[locale]/        # locale-prefixed routes (default zh-HK, as-needed)
  layout.tsx         # chrome + providers
  page.tsx           # Home
  product/           # /product
  use-cases/         # hub + trading + professional-services
  partners/          # /partners + application form
  pricing/           # /pricing + FAQ
  about/             # /about + team
  privacy/terms/    # stub pages
app/api/
  lead/              # POST: Resend + Sheets
  partner-application/
app/sitemap.ts
app/robots.ts
app/og/              # dynamic OG card generation
components/
  chrome/            # GlobalNav, SubNav, Footer, FAB, Modal
  brand/             # Wordmark, LogoMark, mockups
  sections/          # page-level compositions
  ui/                # Button, TextLink
lib/
  i18n/              # next-intl config
  email/             # Resend wrapper
  sheets/            # googleapis wrapper
  seo/               # metadata + JSON-LD helpers
messages/
  zh-HK.json         # primary copy
  en.json            # empty {} (translate later)
```

## Adding a page

1. Create `app/[locale]/<route>/page.tsx`
2. Export `generateMetadata()` using `buildMetadata({ title, description, path: "/<route>" })`
3. Add the route to `app/sitemap.ts`
4. Add nav entry in `components/chrome/GlobalNav.tsx` + `SubNavFrosted.tsx`
5. Add copy keys in `messages/zh-HK.json`

## Editing copy

All copy lives in `messages/zh-HK.json` (and `messages/en.json` for EN, currently `{}`). Keys are namespaced by page.

## Design system

Tokens in `app/globals.css` under `@theme`. Single Action Blue `#0066cc` is the only accent color. Typography uses Inter + Noto Sans TC (auto-loaded via `next/font/google`). CJK copy uses `text-body-cjk` for line-height 1.7.

## Mockups

The 3 product mockups are inline SVG components (`components/brand/mockups/*`) — they scale crisply, ship zero raster, and accept theme colors via `currentColor`.

## Deployment

Default: **GitHub Pages** via `.github/workflows/pages.yml` — see [`GITHUB_PAGES.md`](./GITHUB_PAGES.md).

Alternative: **Vercel** for full server features (forms API, dynamic OG) — see [`DEPLOY.md`](./DEPLOY.md).

Local production preview of the static export:

```bash
pnpm build:static      # outputs to out/
pnpm serve:static      # serves out/ at http://localhost:3000
```

## What works in static export (GitHub Pages)

- All pages render
- BookDemoModal opens, validates, submits via `mailto:` fallback
- Bilingual (`/` = zh-HK, `/en/` = EN)

## What requires a backend (Vercel etc.)

- Server-side form capture (email + Sheets archive)
- Dynamic OG image generation per page

## Out-of-scope placeholders (post-launch)

- Pricing numbers marked `TBC` — fill in `messages/zh-HK.json` `pricing.tiers[].price`
- Team member bios use `lib/data/team.ts` placeholders (currently inline in `AboutPage.tsx`)
- WhatsApp number placeholder `85200000000`
- Sales email `sales@legionone.hk`
- EN translations empty `{}` — translate later by mirroring zh-HK keys