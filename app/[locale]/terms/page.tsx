import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "使用條款",
    description: "LegionOne 使用條款。",
    path: "/terms",
  });
}

export default function TermsPage() {
  return (
    <div className="mx-auto max-w-[768px] px-4 sm:px-6 py-16">
      <h1 className="text-display-lg text-ink mb-6">使用條款</h1>
      <p className="text-body text-ink-muted-80 text-body-cjk mb-4">
        本頁為使用條款占位文本，正式條款將於上線前由法律顧問審核並替換。
      </p>
      <p className="text-body text-ink-muted-80 text-body-cjk">
        如有任何查詢，請電郵至{" "}
        <a href="mailto:hello@legionone.hk" className="text-primary">
          hello@legionone.hk
        </a>
        。
      </p>
    </div>
  );
}