const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://legionone.vercel.app";

export function organizationJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "Organization",
    name: "LegionOne",
    url: SITE_URL,
    logo: `${SITE_URL}/images/wordmark.svg`,
    description: "為香港中小企而設的 ERP + CRM 平台。",
    address: {
      "@type": "PostalAddress",
      addressLocality: "Hong Kong",
      addressCountry: "HK",
    },
  };
}

export function productJsonLd() {
  return {
    "@context": "https://schema.org",
    "@type": "SoftwareApplication",
    name: "LegionOne",
    applicationCategory: "BusinessApplication",
    operatingSystem: "Web",
    description: "為香港中小企而設的 ERP + CRM 平台。",
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