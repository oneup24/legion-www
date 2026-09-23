import * as React from "react";

/**
 * Dashboard overview mockup — KPI cards + revenue chart + activity feed.
 * Composed inline SVG so it scales crisply and avoids raster pipeline.
 */
export function DashboardOverviewMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1280 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Dashboard overview mockup"
    >
      <rect width="1280" height="800" fill="#ffffff" />
      {/* Sidebar */}
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
            fill={i === 0 ? "#0066cc" : "#d2d2d7"}
          />
          <rect
            x="44"
            y={82 + i * 48}
            width={120 - i * 8}
            height="10"
            rx="2"
            fill={i === 0 ? "#1d1d1f" : "#7a7a7a"}
          />
        </g>
      ))}
      {/* Header */}
      <rect x="240" y="24" width="200" height="14" rx="3" fill="#1d1d1f" />
      <rect x="240" y="48" width="120" height="10" rx="3" fill="#7a7a7a" />
      {/* KPI cards row */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${240 + i * 248}, 96)`}>
          <rect width="232" height="116" rx="12" fill="#fafafc" stroke="#e0e0e0" />
          <rect x="20" y="20" width="80" height="10" rx="2" fill="#7a7a7a" />
          <rect x="20" y="44" width="140" height="22" rx="3" fill="#1d1d1f" />
          <rect x="20" y="78" width="60" height="10" rx="3" fill="#1f8a4c" />
          <rect x="86" y="78" width="40" height="10" rx="3" fill="#cccccc" />
        </g>
      ))}
      {/* Chart */}
      <g transform="translate(240, 240)">
        <rect width="744" height="280" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <rect x="20" y="20" width="120" height="12" rx="3" fill="#1d1d1f" />
        <rect x="20" y="40" width="80" height="8" rx="2" fill="#7a7a7a" />
        {/* Chart axes */}
        <line x1="40" y1="220" x2="720" y2="220" stroke="#e0e0e0" />
        {[0, 1, 2, 3].map((i) => (
          <line
            key={i}
            x1="40"
            y1={80 + i * 35}
            x2="720"
            y2={80 + i * 35}
            stroke="#f0f0f0"
          />
        ))}
        {/* Line path */}
        <path
          d="M60,200 L160,160 L260,170 L620,90 L680,110 L700,80"
          stroke="#0066cc"
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60,200 L160,160 L260,170 L620,90 L680,110 L700,80 L700,220 L60,220 Z"
          fill="#0066cc"
          opacity="0.08"
        />
        {/* Points */}
        {[
          [60, 200],
          [160, 160],
          [260, 170],
          [620, 90],
          [680, 110],
          [700, 80],
        ].map(([x, y], i) => (
          <circle key={i} cx={x} cy={y} r="4" fill="#0066cc" />
        ))}
      </g>
      {/* Activity feed */}
      <g transform="translate(240, 540)">
        <rect width="744" height="240" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <rect x="20" y="20" width="100" height="12" rx="3" fill="#1d1d1f" />
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(20, ${56 + i * 36})`}>
            <circle cx="6" cy="6" r="6" fill={i % 2 === 0 ? "#0066cc" : "#1f8a4c"} />
            <rect x="24" y="0" width="200" height="10" rx="2" fill="#1d1d1f" />
            <rect x="240" y="0" width="60" height="10" rx="2" fill="#7a7a7a" />
            <rect x="320" y="0" width="120" height="10" rx="2" fill="#7a7a7a" />
          </g>
        ))}
      </g>
      {/* Right rail */}
      <g transform="translate(1000, 96)">
        <rect width="260" height="684" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <rect x="20" y="20" width="100" height="12" rx="3" fill="#1d1d1f" />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(20, ${56 + i * 152})`}>
            <rect width="220" height="136" rx="8" fill="#ffffff" stroke="#e0e0e0" />
            <rect x="14" y="14" width="40" height="40" rx="8" fill="#f5f5f7" />
            <rect x="64" y="18" width="120" height="10" rx="2" fill="#1d1d1f" />
            <rect x="64" y="36" width="80" height="8" rx="2" fill="#7a7a7a" />
            <rect x="14" y="68" width="192" height="2" fill="#f0f0f0" />
            <rect x="14" y="82" width="100" height="10" rx="2" fill="#1d1d1f" />
            <rect x="14" y="100" width="180" height="6" rx="2" fill="#7a7a7a" />
            <rect x="14" y="112" width="160" height="6" rx="2" fill="#7a7a7a" />
          </g>
        ))}
      </g>
    </svg>
  );
}