import { PricingPage } from "@/components/sections/PricingPage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "定價",
    description: "三個方案覆蓋由一人公司至 200 人團隊。透明定價，隨業務成長。",
    path: "/pricing",
  });
}

export default function Page() {
  return <PricingPage />;
}