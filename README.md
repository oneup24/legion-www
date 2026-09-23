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

Auto-deploys to **Vercel** on every push to `main`. See [`DEPLOY.md`](./DEPLOY.md) for full setup.

Quick path: https://vercel.com/new → Import `oneup24/legion-www` → Deploy. ~2 minutes.

Required env vars in production (set in Vercel dashboard):

- `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO_SALES`, `RESEND_TO_PARTNERS`
- `GOOGLE_SERVICE_ACCOUNT_JSON` (single-line JSON string), `GOOGLE_SHEETS_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL`

## Out-of-scope placeholders (post-launch)

- Pricing numbers marked `TBC` — fill in `messages/zh-HK.json` `pricing.tiers[].price`
- Team member bios use `lib/data/team.ts` placeholders (currently inline in `AboutPage.tsx`)
- WhatsApp number placeholder `85200000000`
- Sales email `sales@legionone.hk`
- EN translations empty `{}` — translate later by mirroring zh-HK keys