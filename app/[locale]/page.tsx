import { Hero } from "@/components/sections/home/Hero";
import { LogoStrip } from "@/components/sections/home/LogoStrip";
import { CustomerStrip } from "@/components/sections/home/CustomerStrip";
import { Belief } from "@/components/sections/home/Belief";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { ProductPreview } from "@/components/sections/home/ProductPreview";
import { IndustryCases } from "@/components/sections/home/IndustryCases";
import { Comparison } from "@/components/sections/home/Comparison";
import { DayInTheLife } from "@/components/sections/home/DayInTheLife";
import { Methodology } from "@/components/sections/home/Methodology";
import { SocialProof } from "@/components/sections/home/SocialProof";
import { SecurityBadges } from "@/components/sections/home/SecurityBadges";
import { PartnerCTA } from "@/components/sections/home/PartnerCTA";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/components/JsonLdScript";
import type { SeoLocale } from "@/lib/seo/pages";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("home", locale as "en" | "zh-HK");
}

/**
 * Homepage structure, borrowed from the monopo reference:
 *
 *   hero statement → ticker → customers → manifesto → services →
 *   product → featured work → the pains → a day → onboarding →
 *   numbers → security → partners → final call to action
 *
 * Black carries the page; brand blue appears exactly three times — the
 * ticker, the numerals, and the closing band.
 */
export default async function HomePage({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  // Read the locale from the route params rather than next-intl's
  // getLocale(), which reads request headers and cannot be prerendered.
  const { locale } = await params;

  return (
    <>
      <JsonLdScript data={organizationJsonLd(locale as SeoLocale)} />
      <Hero />
      <LogoStrip />
      <CustomerStrip />
      <Belief />
      <Capabilities />
      <ProductPreview />
      <IndustryCases />
      <Comparison />
      <DayInTheLife />
      <Methodology />
      <SocialProof />
      <SecurityBadges />
      <PartnerCTA />
      <FinalCTA />
    </>
  );
}
