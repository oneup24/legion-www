import { ProductPage } from "@/components/sections/ProductPage";
import { buildMetadata } from "@/lib/seo/metadata";
import { productJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/components/JsonLdScript";
import type { SeoLocale } from "@/lib/seo/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("product", locale as "en" | "zh-HK");
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Read the locale from the route params rather than next-intl's
  // getLocale(), which reads request headers and cannot be prerendered.
  const { locale } = await params;

  return (
    <>
      <JsonLdScript data={productJsonLd(locale as SeoLocale)} />
      <ProductPage />
    </>
  );
}