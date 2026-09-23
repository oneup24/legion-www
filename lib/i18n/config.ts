import { defineRouting } from "next-intl/routing";

export const routing = defineRouting({
  locales: ["zh-HK", "en"],
  defaultLocale: "zh-HK",
  localePrefix: "as-needed",
});

export type AppLocale = (typeof routing.locales)[number];