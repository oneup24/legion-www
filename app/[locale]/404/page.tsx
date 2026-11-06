import { NotFoundPage } from "@/components/sections/NotFoundPage";
import { buildMetadata } from "@/lib/seo/metadata";

export async function generateMetadata({
  params,
}: {
  params: Promise<{ locale: string }>;
}) {
  const { locale } = await params;
  return buildMetadata("notFound", locale as "en" | "zh-HK");
}
/**
 * The route GitHub Pages actually serves for unknown URLs.
 *
 * Next.js only prerenders a root-level app/not-found.tsx for static export,
 * which would come out as an unstyled page outside the site layout. This
 * route lives inside [locale], so it inherits the nav, the footer and the
 * stylesheet; scripts/postbuild.mjs then promotes it to out/404.html.
 */
export default function NotFoundRoute() {
  return <NotFoundPage />;
}
