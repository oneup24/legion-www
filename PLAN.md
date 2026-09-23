# LegionOne Marketing Site — Implementation Plan

**Workspace:** `/Users/user/Legionone` (currently empty except `Apple-DESIGN.md`)
**Deliverable:** Next.js 15 (App Router) + TypeScript marketing site, zh-HK primary, EN scaffolded
**Source brief:** user-provided `LegionOne UI/UX Brief v1.0` (in chat)
**Design language:** `Apple-DESIGN.md` (in workspace) — Apple's tile-based, single-accent, photography-first system, adapted to LegionOne's brand

---

## 1. Goal

Ship a Phase-1 marketing site for LegionOne that lets a Hong Kong SME owner decide within ~10 seconds whether to book a demo. Seven core routes + a global "Book a Demo" modal. PageSpeed 90+ mobile and desktop. Bilingual-ready (zh-HK shippable, EN scaffolding live).

### Non-goals (Phase 1)
- Resource center / blog (deferred to Phase 2)
- Customer testimonials with real content (placeholder slots only — no real customers yet)
- Live interactive product demo (we ship 3 static high-fidelity dashboard mockups)
- Authentication, dashboard app, any product UI beyond static mockups
- Real pricing numbers (3-tier table with plausible placeholders, marked TBC)
- EN translations (scaffolding only)

---

## 2. Decisions Resolved

| Decision | Choice | Rationale |
|---|---|---|
| Stack | Next.js 15 App Router, TypeScript, Tailwind CSS | Brief Section 7; SEO + i18n + perf |
| Design language | Apple-design-system (`Apple-DESIGN.md`) | User provided as reference |
| Accent color | **Action Blue `#0066cc`** | Brief's gold rejected to honor Apple's single-accent rule |
| Default theme | White/parchment hero, dark tile alternation below | Apple default; brief's "dark hero + particles" rejected |
| Brand assets | Design both logo mark + wordmark | User chose option 2 |
| Product imagery | 3 high-fidelity static Dashboard mockups (HTML+CSS → PNG/WebP) | Product doesn't exist yet; brief allowed mockups |
| Pricing page | 3-tier table with plausible placeholder HKD numbers | Brief allowed; marked TBC |
| Form backend | Resend (email) + Google Sheets (archive) via Next.js Route Handler | Zero infra beyond API keys |
| Core values | Propose 6 L.E.G.I.O.N. definitions; user edits later | Brief left undefined |
| Use cases | Trade + Professional Services fully built; Retail/E-commerce + Light Manufacturing as "coming soon" cards | Brief priority |
| Team section | Included with 4–6 placeholder slots in a data file | User chose option 1 |
| Booking | Custom modal on every page (brief's specified fields) → submits to Resend+Sheets | No external tool needed |
| i18n | Scaffold next-intl now; ship zh-HK; EN `messages/en.json` empty | Future EN is a translation pass, not a refactor |

---

## 3. Architecture

### 3.1 Stack
- **Framework:** Next.js 15 (App Router), React 19, TypeScript 5 (strict)
- **Styling:** Tailwind CSS v4 (CSS variables for design tokens, `@theme` block)
- **i18n:** `next-intl` (App Router compatible, `messages/zh-HK.json` + empty `messages/en.json`)
- **Forms:** `react-hook-form` + `zod` resolver
- **Headless UI primitives:** `@radix-ui/react-dialog`, `@radix-ui/react-select`, `@radix-ui/react-tabs` (style with Tailwind, no shadcn)
- **Animation:** `framer-motion` for scroll-triggered fade/slide-up, count-up, modal enter/exit. All wrapped in a `useReducedMotion` gate.
- **Fonts:** `next/font/google` → Inter (variable) + Noto Sans TC (variable) self-hosted
- **Email:** `resend` SDK + `RESEND_API_KEY`
- **Sheets:** `googleapis` service account JSON, server-side only
- **Analytics:** `@next/third-parties/google` GA4 + `Vercel Analytics` (web vitals)
- **Icons:** `lucide-react` (line icon set, 1.5px stroke, 24px viewport)
- **Linting:** ESLint (Next.js preset) + Prettier + `tailwindcss-plugin-iso-sort` for class order
- **Deployment:** Vercel (env vars for Resend key + Google service account JSON)

### 3.2 File layout
```
/Users/user/Legionone/
├── app/
│   ├── [locale]/
│   │   ├── layout.tsx               # html lang, fonts, providers
│   │   ├── page.tsx                 # Home
│   │   ├── product/page.tsx
│   │   ├── use-cases/
│   │   │   ├── page.tsx             # Hub
│   │   │   ├── trading/page.tsx
│   │   │   └── professional-services/page.tsx
│   │   ├── partners/page.tsx
│   │   ├── pricing/page.tsx
│   │   ├── about/page.tsx
│   │   ├── contact/page.tsx
│   │   └── book/page.tsx            # Fallback route for direct /book visits
│   ├── api/
│   │   ├── lead/route.ts            # POST handler → Resend + Sheets
│   │   └── partner-application/route.ts
│   └── globals.css                  # @theme tokens
├── components/
│   ├── chrome/
│   │   ├── GlobalNav.tsx            # surface-black, 44px
│   │   ├── SubNavFrosted.tsx        # backdrop-blur, 52px
│   │   ├── Footer.tsx               # canvas-parchment
│   │   ├── FloatingStickyBar.tsx    # mobile-only, bottom 60px
│   │   ├── WhatsAppFAB.tsx          # fixed bottom-right
│   │   └── BookDemoModal.tsx        # Radix Dialog, focus-trapped
│   ├── ui/
│   │   ├── Button.tsx               # primary | secondary-pill | dark-utility | pearl-capsule | store-hero | icon-circular
│   │   ├── TextLink.tsx             # primary | primary-on-dark
│   │   ├── ProductTile.tsx          # light | parchment | dark | dark-2 | dark-3
│   │   ├── StoreUtilityCard.tsx
│   │   ├── SearchInput.tsx
│   │   ├── CapabilityCard.tsx       # 4-capability grid card
│   │   ├── PainPointSplit.tsx       # Before/After two-column
│   │   ├── CountUpStat.tsx          # IntersectionObserver + framer-motion
│   │   ├── ValueCard.tsx            # L.E.G.I.O.N. cards
│   │   ├── TeamMember.tsx           # headshot + name + role + bio
│   │   ├── PricingTier.tsx          # 3-tier table row
│   │   └── UseCaseEntry.tsx
│   ├── sections/                    # Page-specific compositions
│   │   ├── home/Hero.tsx
│   │   ├── home/PainPoints.tsx
│   │   ├── home/Capabilities.tsx
│   │   ├── home/ProductPreview.tsx  # Tab-switcher on 3 mockup images
│   │   ├── home/SocialProof.tsx
│   │   ├── home/PartnerCTA.tsx
│   │   └── home/FinalCTA.tsx
│   └── brand/
│       ├── Wordmark.tsx             # SVG, Inter Tight 600, tight tracking
│       └── LogoMark.tsx             # SVG mark
├── lib/
│   ├── i18n/
│   │   ├── config.ts                # locales = ['zh-HK', 'en'], default = 'zh-HK'
│   │   ├── request.ts               # next-intl server config
│   │   └── navigation.ts
│   ├── data/
│   │   ├── pricing.ts               # 3-tier placeholder structure
│   │   ├── team.ts                  # 6 placeholder slots
│   │   ├── testimonials.ts          # empty array, structure documented
│   │   ├── partners.ts              # placeholder logos (initials on canvas-parchment)
│   │   └── values.ts                # L.E.G.I.O.N. proposed definitions
│   ├── motion/
│   │   ├── variants.ts              # fade-up, count-up presets
│   │   └── use-reduced-motion.ts
│   ├── seo/
│   │   ├── metadata.ts              # per-page title + description factory
│   │   └── jsonld.ts                # Organization + Product schema
│   ├── email/
│   │   └── send.ts                  # Resend client
│   └── sheets/
│       └── append.ts                # googleapis wrapper
├── messages/
│   ├── zh-HK.json                   # primary copy
│   └── en.json                      # {} (empty object, keys scaffolded)
├── public/
│   ├── images/
│   │   ├── mockups/                 # 3 dashboard PNG/WebP exports
│   │   ├── wordmark.svg
│   │   ├── logo-mark.svg
│   │   └── og/                      # OG card per page
│   └── fonts/                       # next/font outputs here at build
├── middleware.ts                    # next-intl locale routing
├── tailwind.config.ts
├── next.config.ts
├── tsconfig.json                    # strict: true
├── package.json
└── .env.example                     # RESEND_API_KEY, SHEETS_SPREADSHEET_ID, etc.
```

### 3.3 Routing
- All routes under `/[locale]/...`. Default `locale = 'zh-HK'`. `/` redirects to `/zh-HK`.
- `Book Demo` CTA button → opens `BookDemoModal` (Radix Dialog) on any page. Modal URL is `?book=1` so deep-linking and back-button work.
- `/zh-HK/book` exists as a fallback full-page route for direct visits.
- Form submits go to `/api/lead` (Book a Demo) or `/api/partner-application` (Partners form).

---

## 4. Design System

### 4.1 Color tokens (Tailwind `@theme`)
Adopt `Apple-DESIGN.md` tokens verbatim, with the brand-specific swap below:

```css
/* globals.css @theme */
--color-primary: #0066cc;          /* Action Blue — chosen over brief's gold */
--color-primary-focus: #0071e3;
--color-primary-on-dark: #2997ff;
--color-ink: #1d1d1f;
--color-body: #1d1d1f;
--color-body-on-dark: #ffffff;
--color-body-muted: #cccccc;
--color-ink-muted-80: #333333;
--color-ink-muted-48: #7a7a7a;
--color-divider-soft: #f0f0f0;
--color-hairline: #e0e0e0;
--color-canvas: #ffffff;
--color-canvas-parchment: #f5f5f7;
--color-surface-pearl: #fafafc;
--color-surface-tile-1: #272729;
--color-surface-tile-2: #2a2a2c;
--color-surface-tile-3: #252527;
--color-surface-black: #000000;
--color-surface-chip-translucent: #d2d2d7;
--color-on-primary: #ffffff;
--color-on-dark: #ffffff;

/* Status colors (not in Apple spec but needed for forms) */
--color-success: #1f8a4c;
--color-error: #c0392b;
--color-warning: #b97c00;
```

**Rationale for Action Blue:** brief proposed gold (#F59E0B–#FBBF24) for "精銳與授勳" connotation. User chose strict Apple adherence: a single Action Blue carries every interactive element, "少數精鋭" is communicated through restraint, not a second brand color.

### 4.2 Typography
Inter (variable, 300–700) substitutes SF Pro Display/Text per Apple spec's "non-Apple platforms" guidance. Noto Sans TC (variable) handles CJK glyphs via font fallback.

```css
--font-sans: var(--font-inter), 'Noto Sans TC', system-ui, -apple-system, BlinkMacSystemFont, 'Segoe UI', sans-serif;
--font-wordmark: var(--font-inter-tight), var(--font-inter), system-ui, sans-serif;
```

| Token | Size | Weight | LH | Tracking | Notes |
|---|---|---|---|---|---|
| `hero-display` | 56px | 600 | 1.07 | -0.02em | Inter display, hero only |
| `display-lg` | 40px | 600 | 1.10 | -0.015em | Tile headlines |
| `display-md` | 34px | 600 | 1.47 | -0.011em | Section heads |
| `lead` | 28px | 400 | 1.14 | 0 | Tile subcopy |
| `tagline` | 21px | 600 | 1.19 | 0.011em | Sub-nav |
| `body` | 17px | 400 | 1.47 | -0.011em | Default paragraph |
| `body-cjk` | 17px | 400 | 1.7 | 0 | Chinese paragraphs — looser LH per brief |
| `caption` | 14px | 400 | 1.43 | -0.013em | Captions |
| `button-large` | 18px | 300 | 1.0 | 0 | Store hero CTA |
| `button` | 17px | 400 | 1.0 | -0.011em | Primary pill |
| `fine-print` | 12px | 400 | 1.0 | -0.01em | Footer fine print |
| `nav-link` | 12px | 400 | 1.0 | -0.01em | Global nav |

**CJK rule:** any element whose content contains zh-HK characters uses `--font-sans` with line-height switched to `1.7` (the brief's `1.6–1.8` CJK recommendation). Latin-only content stays at `1.47`.

**Wordmark:** Inter Tight 600, letter-spacing -0.04em, "LegionOne" with a 1.5px Action Blue underline beneath the **"One"** (the wordmark accent — not a logo mark yet).

### 4.3 Logo mark
Design a small SVG mark to sit left of the wordmark in nav and footer:
- Concept: a 24×24 hexagonal "command node" — three concentric thin-stroked hex rings with one Action Blue node lit at the upper-right vertex. Suggests "system in operation" without military cliché.
- Single-stroke, 1.5px, geometry on an 8-unit grid.
- File: `public/images/logo-mark.svg`. Wordmark: `public/images/wordmark.svg`.
- Provide a `LogoMark` React component that inlines the SVG (currentColor support) for size + color control.

### 4.4 Spacing, radius, shadow
Adopt Apple spec verbatim:
- Spacing: 4 / 8 / 12 / 17 / 24 / 32 / 48 / 80 px (section padding)
- Radius: 0 / 5 / 8 / 11 / 18 / pill
- Shadow: **only** `rgba(0,0,0,0.22) 3px 5px 30px` applied to product-render mockups. No shadows on cards, buttons, text.

### 4.5 Component inventory (all built in `components/ui/`)

| Component | Variants | Notes |
|---|---|---|
| `Button` | `primary` \| `secondary-pill` \| `dark-utility` \| `pearl-capsule` \| `store-hero` \| `icon-circular` | All variants use `transform: scale(0.95)` press state, 44px min touch, `focus-visible: 2px solid --color-primary-focus` |
| `TextLink` | `primary` \| `primary-on-dark` | Inline link, blue on light / sky-blue on dark |
| `ProductTile` | `light` \| `parchment` \| `dark` \| `dark-2` \| `dark-3` | Full-bleed, 80px vertical padding desktop / 48px ≤ 640px. Headline + tagline + 2 pill CTAs + product render with single shadow |
| `StoreUtilityCard` | — | White, 1px hairline border, 18px radius, 24px padding, 1:1 image with 8px inner radius |
| `SearchInput` | — | Pill-shaped, 44px tall, 1px hairline border |
| `CapabilityCard` | — | 2x2 grid on home, 1x4 stacked on mobile. Icon + title + 1-line desc + "了解更多 →" |
| `PainPointSplit` | — | 2-col Before/After on home, stacks on mobile. Left uses `ink-muted-48` text, right uses `ink` + accent underline |
| `CountUpStat` | — | IntersectionObserver triggers, framer-motion tween from 0→target, respects `prefers-reduced-motion` |
| `ValueCard` | — | 6 cards, each shows letter (Action Blue), title, one-line desc |
| `TeamMember` | — | Headshot placeholder (canvas-parchment square with initials) + name + role + bio |
| `PricingTier` | — | 3 columns. Middle tier has subtle accent border in `--color-primary-focus`. Numbers marked `TBC` until user fills |
| `UseCaseEntry` | — | Tile card per industry, "coming soon" variants render dimmed + small "即將推出" badge |
| `BookDemoModal` | — | Radix Dialog, focus-trap, ESC + backdrop click close, fields per brief Section 3 |

### 4.6 Animation rules
- All scroll-triggered animations: `opacity 0→1`, `y 16px→0`, duration 400ms, ease-out, viewport `once: true`.
- `prefers-reduced-motion: reduce` → animations become instant; count-up numbers appear statically.
- Page transitions: none (App Router default is fine).
- No parallax, no decorative particles, no marquees (rejected per brief's "粒子動畫" cue in favor of Apple restraint).

---

## 5. Page-by-page Build Order

Implementation agent should execute in this order. Each step is independently testable.

### Phase A — Foundation
1. **Project bootstrap.** `pnpm create next-app` (TS, App Router, Tailwind, ESLint, no src/, no import alias change). Add `next-intl`, `react-hook-form`, `zod`, `@radix-ui/*`, `framer-motion`, `lucide-react`, `resend`, `googleapis`.
2. **Design tokens.** Write `app/globals.css` `@theme` block with all tokens from §4.1, §4.2.
3. **Fonts.** Wire `next/font/google` for Inter (variable) + Noto Sans TC (variable) + Inter Tight in root layout. Apply `font-sans` class to `<body>`.
4. **i18n.** Configure `next-intl` middleware, `lib/i18n/config.ts`, `messages/zh-HK.json` (skeleton with all top-level keys present but empty strings), `messages/en.json` (empty object).
5. **UI primitives.** Build `Button`, `TextLink` first — used everywhere. Verify press state, focus ring, 44px tap target. Render a Storybook-style demo page at `/dev/ui` (gated by env, deleted before deploy).
6. **Chrome.** Build `GlobalNav`, `SubNavFrosted`, `Footer`, `FloatingStickyBar` (mobile-only), `WhatsAppFAB`. Nav items: 產品功能 / 應用場景 / 合作夥伴 / 定價 / 關於我們 / 聯絡我們. Persistent `Book Demo` CTA right-aligned. Hamburger at ≤ 834px.
7. **Modal + Forms plumbing.** `BookDemoModal` (Radix Dialog) with zod schema. `useBookDemo` hook opens modal via `?book=1` query. Forms submit to `/api/lead` stub that logs to console initially.

### Phase B — Home
8. **Brand assets.** Design wordmark + logo mark SVGs. Render in nav.
9. **Mockups.** Hand-craft 3 dashboard mockups as static PNG/WebP (1920×1080 source):
   - `dashboard-overview.png` — KPI cards (營收 / 毛利 / 待辦應收 / 庫存值) + revenue line chart + recent activity feed
   - `finance-module.png` — AR/AP aging + invoice table + cash-flow bar chart
   - `crm-module.png` — pipeline kanban + lead list + contact drawer
   Render with HTML+CSS in a `/_dev/mockups/` route, screenshot at 2x via headless Chrome, save to `public/images/mockups/`. Add small "畫面為開發中版本" caption.
10. **Hero section.** White canvas (`canvas`). Headline `少數精銳，全力出擊。` in `hero-display`. Sub in `lead`. Two pill CTAs. One dashboard mockup rests in the lower half with the single product-shadow. Section sits at 100vh desktop / auto mobile.
11. **PainPoints section.** `PainPointSplit` component, parchment background. Brief Section 8 copy.
12. **Capabilities section.** `CapabilityCard` × 4 in 2×2 desktop / 1×4 mobile. Dark tile background (`surface-tile-1`) to create the first dark band. Icons from `lucide-react` (Layer / Sparkles / Gauge / Maximize2) in Action Blue.
13. **ProductPreview section.** Tab-switcher (Dashboard / 財務 / CRM). Each tab shows the corresponding mockup with a one-line description below. White canvas.
14. **SocialProof section.** 4 `CountUpStat` items with brief's numbers (`5` / `40%` / `50` / `7`). Trigger on viewport entry. Parchment background.
15. **PartnerCTA section.** Dark tile (`surface-tile-2`), white text, single pill CTA → `/partners`.
16. **FinalCTA section.** Full-width dark tile (`surface-tile-3`), centered headline + 2 CTAs (`預約免費示範` primary, `聯絡我們` text link).
17. **Validate Home.** Lighthouse 90+, run through `pnpm next build` + `pnpm next start`, eyeball all 3 breakpoints (375 / 768 / 1440).

### Phase C — Core pages
18. **Product page** (`/product`). Reuse `ProductTile` pattern. 7 module sections alternating light/dark, each with headline + 3–5 bullets + one mockup. Bottom CTA tile.
19. **Use Cases hub** (`/use-cases`). Tile grid of 4 industries. Trade + Professional Services clickable to full case pages; Retail/E-commerce + Light Manufacturing show "即將推出" badge.
20. **Trade case page** (`/use-cases/trading`). Brief's structure: pain → solution → typical day flow → CTA. Hero uses `ProductTile` dark variant.
21. **Professional Services case page** (`/use-cases/professional-services`). Same structure, different copy.
22. **Partners page** (`/partners`). 4 sections (理念 / 模式 / 三項承諾 / 申請表單). Form posts to `/api/partner-application`.
23. **Pricing page** (`/pricing`). 3-tier `PricingTier` table. Numbers marked `TBC`. FAQ accordion below (5–6 questions).
24. **About page** (`/about`). Brand story → vision/mission → 6 `ValueCard` (L.E.G.I.O.N.) → Team (6 `TeamMember` placeholder slots).
25. **Contact page** (`/contact`). Form (姓名 / 公司 / 電話 / Email / 查詢內容) + address + phone + email + WhatsApp button.

### Phase D — Forms + integrations
26. **Lead API.** `/api/lead` POST handler. Validates with zod, sends via Resend to a configured sales inbox, appends row to Google Sheet (timestamp, name, company, headcount, phone, email, painPoints[], sourceUrl). Returns 200 + JSON. 4xx for validation errors.
27. **Partner API.** `/api/partner-application` POST handler. Same shape, separate Sheet tab + separate email recipient.
28. **Spam protection.** Honeypot field + Cloudflare Turnstile env-flagged (off in dev, on in prod via env var). Light enough to ship without paid tier.
29. **GA4 + event tracking.** Add `data-cta-id` to every CTA, wire up `gtag('event', 'cta_click', { id })`. Track modal opens, form submits (as conversion).

### Phase E — SEO + perf + accessibility
30. **Metadata factory.** `lib/seo/metadata.ts` builds per-page title/description from a `seo` key in `messages/zh-HK.json`. OG image at `/zh-HK/og.png` (dynamic via `next/og`).
31. **JSON-LD.** Organization schema on Home; Product schema on Product; FAQPage schema on Pricing. `lib/seo/jsonld.ts` helpers.
32. **Sitemap + robots.** `app/sitemap.ts`, `app/robots.ts`.
33. **Accessibility pass.** Skip-link in `GlobalNav`. All form fields have `<label>`. Modal focuses first input on open, restores trigger on close. Color contrast checked for Action Blue on white (≥ 4.5:1) and white on `surface-tile-1` (≥ 4.5:1). All interactive elements keyboard-reachable.
34. **Performance.** `next/image` for all raster. Hero mockup is `priority`. Below-fold lazy. Verify LCP < 2s on simulated 4G.

### Phase F — Deploy
35. **Vercel setup.** Connect repo. Env vars: `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO`, `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_SHEETS_ID`, `NEXT_PUBLIC_GA_ID`, `NEXT_PUBLIC_TURNSTILE_SITE_KEY`, `TURNSTILE_SECRET`. Preview deployments on PRs.
36. **Smoke test.** Submit a real demo form on prod URL. Verify Resend email + Sheet row.
37. **Handoff doc.** `README.md` in repo: how to add a page, how to edit copy, how to deploy, env-var list.

---

## 6. Data Flow

```
User clicks "預約示範"
   ↓
BookDemoModal opens (Radix Dialog, focus-trapped)
   ↓
User fills form (RHF + zod, inline validation)
   ↓
POST /api/lead  (Next.js Route Handler)
   ↓
zod re-validates server-side
   ↓
Resend.send() → sales@legionone.hk
   ↓
googleapis.spreadsheets.values.append → row to "Leads" tab
   ↓
Return 200 { ok: true }
   ↓
Modal shows in-page success state (no redirect)
   ↓
gtag('event', 'lead_submitted', { source: 'home_hero' })
```

Failure modes:
- Resend down → still append to Sheet, return 200 with `{ ok: true, emailQueued: false }`. Sales gets a daily Sheet digest.
- Sheets down → still send email, log to console, return 200 with `{ ok: true, sheetArchived: false }`. Sales inbox is the source of truth.
- Both down → return 503. Modal shows retry button.

---

## 7. SEO & Analytics

- **Per-page metadata:** title (≤ 60 chars), description (≤ 155 chars), OG image (`/og/[page].png` via `next/og`), canonical URL, hreflang for `zh-HK` + `x-default`.
- **Structured data:** `Organization` (home, footer), `Product` (product page), `FAQPage` (pricing), `BreadcrumbList` (sub-pages).
- **Analytics:** GA4 page view + 4 custom events: `cta_click`, `book_modal_open`, `lead_submitted`, `partner_application_submitted`. Vercel Analytics for web vitals.
- **Sitemap:** auto-generated from routes, includes `[locale]` variants.

---

## 8. Performance Targets

| Metric | Target | How |
|---|---|---|
| Lighthouse Performance (mobile) | ≥ 90 | next/image, next/font, no JS on chrome chrome |
| Lighthouse Performance (desktop) | ≥ 95 | same |
| LCP | < 2.0s on simulated 4G | Hero mockup `priority`, fonts self-hosted |
| CLS | < 0.05 | Reserved aspect ratios on mockup containers |
| TBT | < 200ms | Radix primitives are small, no client JS on chrome |
| Initial JS bundle (home) | < 120KB gz | tree-shake framer-motion, lazy-load modal chunk |

---

## 9. Out-of-scope Placeholders

These ship as empty slots or TBC content. User is expected to fill them post-launch.

| Slot | Where | Current placeholder |
|---|---|---|
| Pricing numbers | `lib/data/pricing.ts` | Realistic TBC HKD numbers, marked `TBC` |
| Team photos + bios | `lib/data/team.ts` | 6 placeholder slots with role + initials avatar |
| Customer testimonials | `lib/data/testimonials.ts` | Empty array; `SocialProof` falls back to count-up stats |
| Partner logos | `lib/data/partners.ts` | Initials on canvas-parchment cards (no real logos) |
| WhatsApp number | `components/chrome/WhatsAppFAB.tsx` | `852 0000 0000` placeholder; replace via env var `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Sales email | `RESEND_TO` env | `sales@legionone.hk` placeholder |
| EN translations | `messages/en.json` | Empty `{}`; add keys later by translating zh-HK |
| Blog/Case Studies | Phase 2 | Route stub returns "Coming soon" |

---

## 10. Risks & Mitigations

| Risk | Likelihood | Mitigation |
|---|---|---|
| Product mockups look generic / stock-y | Medium | Brief explicitly bans stock photos. Mockups must be hand-composed with brand-correct color palette and zh-HK sample data (e.g. company names like 「嘉信貿易」「明華會計師事務所」). |
| CJK font load slows first paint | Medium | `next/font/google` self-hosts, swap strategy, font-display: optional fallback. Verify with Lighthouse. |
| Apple spec too rigid for SaaS content density | Low | Brief's 7 sections per page fit Apple tiles comfortably; each Product module gets its own tile with mockup. |
| Form spam | Medium | Honeypot + Turnstile env-gated. No paid CAPTCHA required for launch. |
| Resend free-tier limits (100 emails/day) | Medium | Acceptable for Phase 1; warn if daily Sheet digest shows backlog. Upgrade path documented in handoff README. |
| `next-intl` + App Router quirks | Low | Use the official `next-intl` App Router setup pattern. Verify `[locale]` segment works with metadata + dynamic OG. |
| Hero mockup LCP regression | Medium | Use `next/image` with `priority`, fixed aspect ratio container, WebP. Test on simulated 4G in CI. |

---

## 11. Validation Steps

Before declaring done, verify:

1. **Visual parity to Apple spec.** Render `/zh-HK` in Chrome 1440px. Check: alternating tile rhythm, single Action Blue everywhere, body 17px, negative letter-spacing on display sizes, no shadows except on mockup.
2. **Lighthouse.** Run mobile + desktop on `/zh-HK`, `/zh-HK/product`, `/zh-HK/pricing`. All ≥ 90.
3. **Modal flow.** Click `預約示範` from nav, hero, and FinalCTA. All three open the modal. ESC + backdrop click close. Focus returns to trigger. Form submit shows success state. Deep-link `/zh-HK?book=1` opens modal.
4. **Lead capture E2E.** Submit real form on local prod build. Verify Resend email arrives in inbox + row appended to Sheet.
5. **i18n switch (manual).** Visit `/en/zh-HK` → redirected. Manually visit `/en/` → page renders zh-HK (fallback) without crash. Verify no missing-key errors in console.
6. **Responsive.** Test 375 / 768 / 1024 / 1440 widths. Hamburger at ≤ 834. Hero h1 scales 56→40→34→28. Capability cards stack. Mockups scale. FloatingStickyBar appears ≤ 734.
7. **Accessibility.** Tab through home page with keyboard — every interactive element reachable, focus ring visible. Run axe DevTools → 0 critical violations.
8. **Reduced motion.** Toggle `prefers-reduced-motion` in DevTools. All scroll animations become instant. Count-up numbers appear statically.
9. **Build.** `pnpm next build` → 0 errors, 0 type errors, 0 ESLint errors. `pnpm next start` serves prod build successfully.

---

## 12. Open Questions (not blocking Phase 1 launch)

| Question | Default if no answer |
|---|---|
| Real WhatsApp number? | `852 0000 0000` placeholder, swap via `NEXT_PUBLIC_WHATSAPP_NUMBER` |
| Real sales email? | `sales@legionone.hk` placeholder, swap via `RESEND_TO` env |
| Domain + DNS for launch? | Use `legionone.vercel.app` until custom domain is configured |
| Cookie consent banner? | Not in scope for Phase 1 — add when GA4 marketing features are enabled |
| Cookie policy / Privacy / Terms pages? | Footer links go to `/privacy` and `/terms` stubs with one-paragraph placeholder text |
| Real testimonials when customers exist? | Drop into `lib/data/testimonials.ts`, `SocialProof` switches from count-up to carousel |
| Blog/CMS? | Phase 2 — add `@sanity/client` when Resources page launches |
