import { PAGE_SEO, type SeoLocale } from "./pages";
import { SITE_URL } from "./site";

export function organizationJsonLd(locale: SeoLocale = "en") {
  const home = PAGE_SEO.home[locale] ?? PAGE_SEO.home.en;

  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LegionOne",
    url: SITE_URL,
    logo: `${SITE_URL}/brand/legionone-mark.svg`,
    description: home.description,
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hong Kong",
      addressCountry: "HK",
    },
  };
}

export function productJsonLd(locale: SeoLocale = "en") {
  const product = PAGE_SEO.product[locale] ?? PAGE_SEO.product.en;

  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LegionOne",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    url: `${SITE_URL}/product/`,
    description: product.description,
    offers: {
      "@type": "Offer",
      priceCurrency: "HKD",
      price: "TBC",
      availability: "https://schema.org/PreOrder",
    },
  };
}

export function faqJsonLd(
  items: Array<{ q: string; a: string }>,
) {
  return {
    "@context": "https://schema.org",
    "@type": "FAQPage",
    mainEntity: items.map((it) => ({
      "@type": "Question",
      name: it.q,
      acceptedAnswer: {
        "@type": "Answer",
        text: it.a,
      },
    })),
  };
}
