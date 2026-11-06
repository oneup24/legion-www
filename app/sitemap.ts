import type { MetadataRoute } from "next";
import { PAGE_SEO } from "@/lib/seo/pages";
import { routing } from "@/lib/i18n/config";
import { localeUrl } from "@/lib/seo/site";

export const dynamic = "force-static";

/**
 * The sitemap is generated from PAGE_SEO, the same table the canonical tags
 * and the page copy come from, so a route can never be listed here and
 * missing from the site, or the reverse.
 *
 * Every public route is listed in both languages, each entry carrying the
 * hreflang alternate so search engines can pair the two versions.
 */
export default function sitemap(): MetadataRoute.Sitemap {
  const routes = Object.entries(PAGE_SEO).filter(([key]) => key !== "notFound");

  return routes.flatMap(([, entry]) =>
    routing.locales.map((locale) => ({
      url: localeUrl(locale, entry.path),
      lastModified: new Date(),
      changeFrequency: entry.changeFrequency,
      priority: entry.priority,
      alternates: {
        languages: {
          en: localeUrl("en", entry.path),
          "zh-HK": localeUrl("zh-HK", entry.path),
        },
      },
    })),
  );
}
