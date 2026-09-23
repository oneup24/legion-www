# Deployment

The site deploys to **Vercel** automatically on every push to `main`. Two ways to set this up — pick the one that suits you.

## Path A — Vercel GitHub App (easiest, ~2 min)

1. Go to https://vercel.com/new
3. Click **"Import Git Repository"** → select `oneup24/legion-www`
4. Framework Preset: **Next.js** (auto-detected)
5. Root Directory: leave blank
6. Click **Deploy** — first build runs in ~90 seconds
7. Done. Every push to `main` auto-deploys. Every PR gets a preview URL.

Env vars (optional for first deploy — site renders without them, forms return 503):
- `RESEND_API_KEY`, `RESEND_FROM`, `RESEND_TO_SALES`, `RESEND_TO_PARTNERS`
- `GOOGLE_SERVICE_ACCOUNT_JSON`, `GOOGLE_SHEETS_ID`
- `NEXT_PUBLIC_GA_ID`
- `NEXT_PUBLIC_WHATSAPP_NUMBER`
- `NEXT_PUBLIC_SITE_URL` (your Vercel URL, used for canonical/OG)

Add them under **Project Settings → Environment Variables** in Vercel.

## Path B — GitHub Actions deploy (CI-controlled)

Already wired via `.github/workflows/deploy.yml`. Requires these GitHub repo secrets:

- `VERCEL_TOKEN` — create at https://vercel.com/account/tokens
- `VERCEL_ORG_ID` — found in Vercel project settings
- `VERCEL_PROJECT_ID` — found in Vercel project settings

Each push to `main` runs `typecheck` + `build`, then deploys. PRs get preview URLs.

## Custom domain

After first deploy: Vercel → Project → Settings → Domains → add `legionone.hk` (or your domain). Vercel auto-issues the cert.

## Local production test

```bash
pnpm build
pnpm start
```

Then visit http://localhost:3000.