import { UseCasesHubPage } from "@/components/sections/UseCasesHubPage";
import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "應用場景",
    description: "LegionOne 為貿易與專業服務行業度身訂造，其他行業陸續推出。",
    path: "/use-cases",
  });
}

export default function Page() {
  return <UseCasesHubPage />;
}