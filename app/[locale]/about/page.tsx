import { AboutPage } from "@/components/sections/AboutPage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "關於我們",
    description:
      "LegionOne 由一班香港中小企老闆與技術團隊創立。我們親身經歷，現在回饋行業。",
    path: "/about",
  });
}

export default function Page() {
  return <AboutPage />;
}