import { PartnersPage } from "@/components/sections/PartnersPage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "合作夥伴",
    description:
      "與 LegionOne 同行——推薦夥伴、實施夥伴、解決方案夥伴三種合作模式。",
    path: "/partners",
  });
}

export default function Page() {
  return <PartnersPage />;
}