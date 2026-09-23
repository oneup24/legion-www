import { Hero } from "@/components/sections/home/Hero";
import { PainPoints } from "@/components/sections/home/PainPoints";
import { Capabilities } from "@/components/sections/home/Capabilities";
import { ProductPreview } from "@/components/sections/home/ProductPreview";
import { SocialProof } from "@/components/sections/home/SocialProof";
import { PartnerCTA } from "@/components/sections/home/PartnerCTA";
import { FinalCTA } from "@/components/sections/home/FinalCTA";
import { buildMetadata } from "@/lib/seo/metadata";
import { organizationJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/components/JsonLdScript";

export function generateMetadata() {
  return buildMetadata({
    title: "少數精銳，全力出擊",
    description:
      "為香港中小企而設的 ERP + CRM 平台。一個系統，統一營收、財務、客戶與庫存。15 分鐘免費示範。",
    path: "",
  });
}

export default function HomePage() {
  return (
    <>
      <JsonLdScript data={organizationJsonLd()} />
      <Hero />
      <PainPoints />
      <Capabilities />
      <ProductPreview />
      <SocialProof />
      <PartnerCTA />
      <FinalCTA />
    </>
  );
}