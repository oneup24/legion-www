import { CasePage } from "@/components/sections/CasePage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "貿易公司應用",
    description:
      "由報價、訂單、船務、收款——LegionOne 為貿易公司打造的整條供應鏈管理系統。",
    path: "/use-cases/trading",
  });
}

export default function Page() {
  return <CasePage namespace="trading" />;
}