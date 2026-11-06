import { CasePage } from "@/components/sections/CasePage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("professionalServices", locale as "en" | "zh-HK");
}
export default function Page() {
  return <CasePage namespace="professionalServices" />;
}