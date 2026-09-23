import * as React from "react";

export function CrmModuleMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1280 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="CRM module mockup"
    >
      <rect width="1280" height="800" fill="#ffffff" />
      <rect x="0" y="0" width="220" height="800" fill="#f5f5f7" />
      <rect x="20" y="24" width="120" height="20" rx="4" fill="#1d1d1f" opacity="0.85" />
      {[80, 80, 80, 80, 80, 80].map((_, i) => (
        <g key={i}>
          <rect
            x="20"
            y={80 + i * 48}
            width="14"
            height="14"
            rx="3"
            fill={i === 2 ? "#0066cc" : "#d2d2d7"}
          />
          <rect
            x="44"
            y={82 + i * 48}
            width={120 - i * 8}
            height="10"
            rx="2"
            fill={i === 2 ? "#1d1d1f" : "#7a7a7a"}
          />
        </g>
      ))}
      {/* Header */}
      <rect x="240" y="24" width="160" height="14" rx="3" fill="#1d1d1f" />
      <rect x="240" y="48" width="100" height="10" rx="3" fill="#7a7a7a" />
      {/* Tabs */}
      <g transform="translate(240, 80)">
        {["潛在客戶", "聯絡中", "報價中", "成單"].map((label, i) => (
          <g key={label}>
            <rect
              x={i * 130}
              y="0"
              width="120"
              height="36"
              rx="8"
              fill={i === 1 ? "#0066cc" : "transparent"}
              opacity={i === 1 ? 0.1 : 1}
            />
            <rect
              x={i * 130 + 16}
              y="14"
              width={label.length * 8}
              height="10"
              rx="2"
              fill={i === 1 ? "#0066cc" : "#7a7a7a"}
            />
          </g>
        ))}
      </g>
      {/* Kanban columns */}
      <g transform="translate(240, 140)">
        {[
          { name: "新潛客", items: ["嘉信貿易", "明華會計", "立信設計"] },
          { name: "已聯絡", items: ["鴻圖工程", "永勝物流"] },
          { name: "報價中", items: ["新世紀科技"] },
          { name: "已成單", items: ["中興食品", "華聯", "大昌"] },
        ].map((col, ci) => (
          <g key={col.name} transform={`translate(${ci * 196}, 0)`}>
            <rect width="184" height="620" rx="12" fill="#fafafc" stroke="#e0e0e0" />
            <rect x="14" y="16" width="80" height="12" rx="3" fill="#1d1d1f" />
            <rect x="148" y="16" width="22" height="16" rx="8" fill="#d2d2d7" />
            <rect x="156" y="20" width="6" height="6" rx="2" fill="#7a7a7a" />
            {col.items.map((item, ii) => (
              <g key={item} transform={`translate(12, ${52 + ii * 88})`}>
                <rect width="160" height="76" rx="8" fill="#ffffff" stroke="#e0e0e0" />
                <rect x="12" y="12" width="100" height="10" rx="2" fill="#1d1d1f" />
                <rect x="12" y="28" width="80" height="8" rx="2" fill="#7a7a7a" />
                <rect x="12" y="46" width="60" height="6" rx="2" fill="#cccccc" />
                <rect x="120" y="44" width="28" height="22" rx="4" fill="#0066cc" opacity="0.12" />
                <rect x="128" y="52" width="12" height="6" rx="2" fill="#0066cc" />
              </g>
            ))}
          </g>
        ))}
      </g>
      {/* Right drawer */}
      <g transform="translate(1024, 80)">
        <rect width="236" height="700" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <circle cx="118" cy="56" r="28" fill="#0066cc" opacity="0.15" />
        <rect x="78" y="100" width="80" height="12" rx="3" fill="#1d1d1f" />
        <rect x="60" y="120" width="116" height="8" rx="2" fill="#7a7a7a" />
        <line x1="20" y1="148" x2="216" y2="148" stroke="#e0e0e0" />
        <rect x="20" y="170" width="60" height="8" rx="2" fill="#7a7a7a" />
        <rect x="20" y="184" width="160" height="10" rx="2" fill="#1d1d1f" />
        <rect x="20" y="210" width="60" height="8" rx="2" fill="#7a7a7a" />
        <rect x="20" y="224" width="160" height="10" rx="2" fill="#1d1d1f" />
        <rect x="20" y="250" width="60" height="8" rx="2" fill="#7a7a7a" />
        <rect x="20" y="264" width="160" height="10" rx="2" fill="#1d1d1f" />
        <line x1="20" y1="298" x2="216" y2="298" stroke="#e0e0e0" />
        <rect x="20" y="320" width="80" height="12" rx="3" fill="#1d1d1f" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(20, ${348 + i * 56})`}>
            <circle cx="10" cy="14" r="8" fill="#d2d2d7" />
            <rect x="28" y="10" width="120" height="10" rx="2" fill="#1d1d1f" />
            <rect x="28" y="26" width="80" height="8" rx="2" fill="#7a7a7a" />
          </g>
        ))}
      </g>
    </svg>
  );
}