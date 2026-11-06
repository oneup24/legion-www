import { PartnersPage } from "@/components/sections/PartnersPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("partners", locale as "en" | "zh-HK");
}
export default function Page() {
  return <PartnersPage />;
}