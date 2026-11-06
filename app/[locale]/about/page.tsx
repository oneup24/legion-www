import { AboutPage } from "@/components/sections/AboutPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("about", locale as "en" | "zh-HK");
}
export default function Page() {
  return <AboutPage />;
}