import type { Metadata } from "next";

type PageSeo = {
  title: string;
  description: string;
  path: string; // e.g. "/product"
};

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://legionone.vercel.app";
const LOCALE = "zh-HK";
const OG_TITLE_DEFAULT = "LegionOne — 少數精銳，全力出擊。";
const OG_DESC_DEFAULT =
  "為香港中小企而設的 ERP + CRM 平台。一個系統，統一營收、財務、客戶與庫存。";

export function buildMetadata(seo: PageSeo): Metadata {
  const url = `${SITE_URL}/${LOCALE}${seo.path}`;
  return {
    title: `${seo.title} — LegionOne`,
    description: seo.description,
    alternates: {
      canonical: url,
      languages: {
        "zh-HK": `${SITE_URL}/zh-HK${seo.path}`,
        en: `${SITE_URL}/en${seo.path}`,
      },
    },
    openGraph: {
      title: `${seo.title} — LegionOne`,
      description: seo.description,
      url,
      siteName: "LegionOne",
      locale: "zh_HK",
      type: "website",
      images: [
        {
          url: `${SITE_URL}/og?title=${encodeURIComponent(seo.title)}`,
          width: 1200,
          height: 630,
          alt: seo.title,
        },
      ],
    },
    twitter: {
      card: "summary_large_image",
      title: `${seo.title} — LegionOne`,
      description: seo.description,
    },
  };
}

export const SITE_DEFAULTS = {
  title: OG_TITLE_DEFAULT,
  description: OG_DESC_DEFAULT,
};