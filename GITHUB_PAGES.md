# GitHub Pages Deployment

The site is configured to deploy automatically to **GitHub Pages** on every push to `main`.

## One-time repo setup

In the GitHub repo https://github.com/oneup24/legion-www:

1. **Settings → Pages**
2. **Source**: "GitHub Actions" (not "Deploy from a branch")
3. Save

That's it. The next push to `main` will:

1. Run `pnpm install`
2. Run `pnpm typecheck`  
3. Run `pnpm build:static` (sets `BUILD_MODE=static`, exports to `out/`)
4. Upload `out/` as the Pages artifact
5. Deploy to `https://oneup24.github.io/legion-www/`

## URL

Once deployed, the site lives at:

```
https://oneup24.github.io/legion-www/
```

EN at: `https://oneup24.github.io/legion-www/` (default locale, served from the root)

HK Chinese at: `https://oneup24.github.io/legion-www/zh-HK/`

The canonical host is defined once in `lib/seo/site.ts` and drives the canonical
tags, the sitemap, robots.txt and every asset URL. It currently points at the
GitHub Pages address above, because that is the only host serving traffic —
`legionone.vercel.app` has no deployment behind it. Set
`NEXT_PUBLIC_SITE_URL=https://legionone.hk` and rebuild once the custom domain
is provisioned.

## What works on GitHub Pages

- ✅ All 11 pages render, in both languages (English at the root, zh-HK under `/zh-HK/`)
- ✅ BookDemoModal opens (focus-trapped, ESC + backdrop close)
- ✅ Inline SVG mockups (Dashboard, Finance, CRM)
- ✅ Brand assets (Wordmark, LogoMark)
- ✅ Animations + reduced-motion gating
- ✅ Bilingual routing (`/` = EN, `/zh-HK/` = HK Chinese)

## What doesn't work (static-only host)

- ❌ `/api/lead` and `/api/partner-application` — **forms open the user's mail client via `mailto:`** instead. All fields are pre-filled in the email body. Customers reply to `sales@legionone.hk` and it works end-to-end.
- ✅ OG images are static, but per page — `og/default`, `og/product`, `og/pricing`, `og/use-cases` and `og/security` are generated at build time from the brand mark.
- ❌ Locale auto-detection from `Accept-Language` header — English is the default at the root, so it is served without a redirect.

## Going to a real backend later

To enable real form capture (email + Sheets archive), redeploy to **Vercel** instead (see `DEPLOY.md`). Vercel supports the API routes. You can deploy the same repo to both — Vercel for the production site, GitHub Pages for demos.

To switch the form back to the API:

```bash
# in .env.local or Vercel env vars:
NEXT_PUBLIC_DISABLE_MAILTO_FALLBACK=true
```

The form helper (`lib/forms/submit.ts`) will then POST to `/api/lead` without the mailto fallback.

## Custom domain

To use `legionone.hk` instead of `oneup24.github.io/legion-www/`:

1. **Settings → Pages → Custom domain**: enter `legionone.hk`
2. Configure DNS at your registrar: CNAME `legionone.hk` → `oneup24.github.io`
3. Wait for HTTPS provisioning (~10 min)

Or use an apex domain with A records:

```
185.199.108.106
185.199.109.106
185.199.110.106
185.199.111.106
```