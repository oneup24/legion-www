import { Hero } from "@/components/sections/home/Hero";
import { LogoStrip } from "@/components/sections/home/LogoStrip";
import { CustomerStrip } from "@/components/sections/home/CustomerStrip";
import { KeyFeatures } from "@/components/sections/home/KeyFeatures";
import { OtherFunctions } from "@/components/sections/home/OtherFunctions";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { ProductPreview } from "@/components/sections/home/ProductPreview";
import { IndustryCases } from "@/components/sections/home/IndustryCases";
import { Comparison } from "@/components/sections/home/Comparison";
import { DayInTheLife } from "@/components/sections/home/DayInTheLife";
import { Methodology } from "@/components/sections/home/Methodology";
import { SecurityBadges } from "@/components/sections/home/SecurityBadges";
import { PartnerCTA } from "@/components/sections/home/PartnerCTA";
import { Belief } from "@/components/sections/home/Belief";
import { SocialProof } from "@/components/sections/home/SocialProof";
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
 * Homepage structure, following the minimax.io reference:
 *
 *   hero carousel → ticker → who trusts us → the four key features →
 *   the other functions (view all) → the module list → the product →
 *   featured work → the pains → a working day → onboarding → security →
 *   partners → what we believe → the numbers → final call to action
 *
 * The reference puts its "About Us" block just before the footer, so ours
 * does the same: the manifesto and the figures close the page.
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
      <KeyFeatures />
      <OtherFunctions />
      <Capabilities />
      <ProductPreview />
      <IndustryCases />
      <Comparison />
      <DayInTheLife />
      <Methodology />
      <SecurityBadges />
      <PartnerCTA />
      <Belief />
      <SocialProof />
      <FinalCTA />
    </>
  );
}
