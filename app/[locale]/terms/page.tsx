import { LegalPage } from "@/components/sections/LegalPage";
import { buildMetadata } from "@/lib/seo/metadata";
import { setRequestLocale } from "next-intl/server";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("terms", locale as "en" | "zh-HK");
}
export default async function Page({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  // Static export cannot read request headers, so the locale has to be
  // resolved from the route params and put into the static message store.
  setRequestLocale(locale);

  return <LegalPage doc="terms" />;
}
