import { defineRouting } from "next-intl/routing";

/**
 * English ships first and is the default locale, so `/` is the English site
 * and `/zh-HK` is the Hong Kong Chinese version.
 */
export const routing = defineRouting({
  locales: ["en", "zh-HK"],
  defaultLocale: "en",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];
