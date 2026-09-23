import { ImageResponse } from "next/og";

export const runtime = "edge";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const title =
    searchParams.get("title") || "LegionOne — 少數精銳，全力出擊。";
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          background: "#1d1d1f",
          color: "#ffffff",
          display: "flex",
          flexDirection: "column",
          justifyContent: "center",
          padding: "80px",
          fontFamily: "sans-serif",
        }}
      >
        <div
          style={{
            fontSize: 28,
            color: "#2997ff",
            marginBottom: 24,
            letterSpacing: 1,
          }}
        >
          LegionOne
        </div>
        <div style={{ fontSize: 72, fontWeight: 600, lineHeight: 1.05 }}>
          {title}
        </div>
        <div
          style={{
            fontSize: 28,
            color: "#cccccc",
            marginTop: 32,
          }}
        >
          為香港中小企而設的 ERP + CRM 平台
        </div>
      </div>
    ),
    { width: 1200, height: 630 },
  );
}