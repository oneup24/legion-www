import { ContactPage } from "@/components/sections/ContactPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("contact", locale as "en" | "zh-HK");
}
export default function Page() {
  return <ContactPage />;
}