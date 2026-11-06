import { SecurityPage } from "@/components/sections/SecurityPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("security", locale as "en" | "zh-HK");
}
export default function Page() {
  return <SecurityPage />;
}
