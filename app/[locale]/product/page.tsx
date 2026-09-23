import { ProductPage } from "@/components/sections/ProductPage";
import { buildMetadata } from "@/lib/seo/metadata";
import { productJsonLd } from "@/lib/seo/jsonld";
import { JsonLdScript } from "@/components/JsonLdScript";

export function generateMetadata() {
  return buildMetadata({
    title: "七大模組",
    description: "Dashboard、財務、CRM、庫存、銷售、HR、自動化——一個平台覆蓋你整條作業流程。",
    path: "/product",
  });
}

export default function Page() {
  return (
    <>
      <JsonLdScript data={productJsonLd()} />
      <ProductPage />
    </>
  );
}