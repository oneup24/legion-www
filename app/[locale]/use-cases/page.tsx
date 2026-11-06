import { UseCasesHubPage } from "@/components/sections/UseCasesHubPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("useCases", locale as "en" | "zh-HK");
}
export default function Page() {
  return <UseCasesHubPage />;
}