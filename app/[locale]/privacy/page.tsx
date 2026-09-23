import { buildMetadata } from "@/lib/seo/metadata";

export function generateMetadata() {
  return buildMetadata({
    title: "私隱政策",
    description: "LegionOne 私隱政策。",
    path: "/privacy",
  });
}

export default function PrivacyPage() {
  return (
    <div className="mx-auto max-w-[768px] px-4 sm:px-6 py-16">
      <h1 className="text-display-lg text-ink mb-6">私隱政策</h1>
      <p className="text-body text-ink-muted-80 text-body-cjk mb-4">
        LegionOne 重視你的私隱。本頁為政策占位文本，正式政策將於上線前由法律顧問審核並替換。
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