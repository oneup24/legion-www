import type { Metadata } from "next";
import { PAGE_SEO, type PageKey, type SeoLocale } from "./pages";
import { assetUrl, localeUrl } from "./site";

export { assetUrl, SITE_URL, localeUrl } from "./site";

const OG_LOCALE: Record<SeoLocale, string> = {
  en: "en_US",
  "zh-HK": "zh_HK",
};

export function buildMetadata(
  key: PageKey,
  locale: SeoLocale = "en",
): Metadata {
  const entry = PAGE_SEO[key];
  const copy = entry[locale] ?? entry.en;
  const url = localeUrl(locale, entry.path);
  const image = assetUrl(`og/${entry.og ?? "default"}.png`);

  return {
    title: `${copy.title} — LegionOne`,
    description: copy.description,
    alternates: {
      canonical: url,
      languages: {
        en: localeUrl("en", entry.path),
        "zh-HK": localeUrl("zh-HK", entry.path),
      },
    },
    openGraph: {
      title: `${copy.title} — LegionOne`,
      description: copy.description,
      url,
      siteName: "LegionOne",
      locale: OG_LOCALE[locale],
      type: "website",
      images: [
        {
          url: image,
          width: 1200,
          height: 630,
          alt: copy.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${copy.title} — LegionOne`,
      description: copy.description,
      images: [image],
    },
  };
}

export const SITE_DEFAULTS = {
  title: "LegionOne",
  description: PAGE_SEO.home.en.description,
};
