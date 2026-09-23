import { CasePage } from "@/components/sections/CasePage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "專業服務應用",
    description: "會計師、法律、顧問公司——客戶、專案、時間、發票統一管理。",
    path: "/use-cases/professional-services",
  });
}

export default function Page() {
  return <CasePage namespace="professionalServices" />;
}