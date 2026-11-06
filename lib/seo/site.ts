import { routing } from "@/lib/i18n/config";

/**
 * The canonical public origin of the site.
 *
 * GitHub Pages is the only host currently serving this project
 * (https://oneup24.github.io/legion-www/), so it is the default and every
 * canonical link, sitemap entry and asset URL is derived from it. The previous
 * default, legionone.vercel.app, does not resolve to a deployment — it answers
 * 404 — which meant every canonical tag and OG image URL pointed at a dead
 * host.
 *
 * When the custom domain legionone.hk is provisioned, set
 * NEXT_PUBLIC_SITE_URL=https://legionone.hk and rebuild; nothing else needs
 * to change.
 */
export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://oneup24.github.io/legion-www"
).replace(/\/+$/, "");

/**
 * Absolute URL for a file in public/.
 *
 * public/ is copied verbatim into the export, so the file sits next to the
 * HTML rather than at the domain root — the path is part of SITE_URL.
 */
export function assetUrl(file: string): string {
  return `${SITE_URL}/${file.replace(/^\/+/, "")}`;
}

/**
 * Absolute URL for a route, in a given locale.
 *
 * The export is built with trailingSlash: true, so every route URL ends in a
 * slash. The default locale is served from the root, so it gets no prefix.
 */
export function localeUrl(locale: string, path: string): string {
  const clean = path.replace(/^\/+|\/+$/g, "");
  const prefix = locale === routing.defaultLocale ? "" : `/${locale}`;
  return clean
    ? `${SITE_URL}${prefix}/${clean}/`
    : `${SITE_URL}${prefix}/`;
}
