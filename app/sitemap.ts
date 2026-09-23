import type { MetadataRoute } from "next";

const SITE_URL =
  process.env.NEXT_PUBLIC_SITE_URL ?? "https://legionone.vercel.app";

const routes = [
  "",
  "/product",
  "/use-cases",
  "/use-cases/trading",
  "/use-cases/professional-services",
  "/partners",
  "/pricing",
  "/about",
  "/contact",
  "/privacy",
  "/terms",
];

export default function sitemap(): MetadataRoute.Sitemap {
  const lastModified = new Date();
  return routes.flatMap((route) =>
    (["zh-HK", "en"] as const).map((locale) => ({
      url: `${SITE_URL}/${locale}${route}`,
      lastModified,
      changeFrequency: "weekly" as const,
      priority: route === "" ? 1 : 0.7,
    })),
  );
}