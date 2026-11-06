import { PricingPage } from "@/components/sections/PricingPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("pricing", locale as "en" | "zh-HK");
}
export default function Page() {
  return <PricingPage />;
}