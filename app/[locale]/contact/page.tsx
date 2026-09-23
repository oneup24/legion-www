import { ContactPage } from "@/components/sections/ContactPage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "聯絡我們",
    description: "聯絡 LegionOne 銷售、技術或合作夥伴團隊。我們於 1 個工作天內回覆。",
    path: "/contact",
  });
}

export default function Page() {
  return <ContactPage />;
}