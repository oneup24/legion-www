import { getRequestConfig } from "next-intl/server";
import { routing } from "./config";

export default getRequestConfig(async ({ requestLocale }) => {
  const requested = await requestLocale;
  const locale =
    requested && (routing.locales as readonly string[]).includes(requested)
      ? requested
      : routing.defaultLocale;

  // For locales whose translations are not yet populated, load the default
  // locale's messages so pages can still prerender without crashing.
  const sourceLocale = locale === "en" ? routing.defaultLocale : locale;
  const messages = (await import(`../../messages/${sourceLocale}.json`)).default;
  return {
    locale,
    messages,
  };
});