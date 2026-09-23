import * as React from "react";

export function FinanceModuleMockup({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 1280 800"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
      role="img"
      aria-label="Finance module mockup"
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
            fill={i === 1 ? "#0066cc" : "#d2d2d7"}
          />
          <rect
            x="44"
            y={82 + i * 48}
            width={120 - i * 8}
            height="10"
            rx="2"
            fill={i === 1 ? "#1d1d1f" : "#7a7a7a"}
          />
        </g>
      ))}
      {/* Header */}
      <rect x="240" y="24" width="200" height="14" rx="3" fill="#1d1d1f" />
      <rect x="240" y="48" width="120" height="10" rx="3" fill="#7a7a7a" />
      {/* Aging summary cards */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${240 + i * 248}, 96)`}>
          <rect width="232" height="116" rx="12" fill="#fafafc" stroke="#e0e0e0" />
          <rect x="20" y="20" width="100" height="10" rx="2" fill="#7a7a7a" />
          <rect x="20" y="44" width="120" height="22" rx="3" fill="#1d1d1f" />
          <rect x="20" y="78" width="160" height="6" rx="3" fill="#0066cc" />
          <rect x="20" y="90" width="100" height="6" rx="3" fill="#cccccc" />
        </g>
      ))}
      {/* Cashflow chart */}
      <g transform="translate(240, 240)">
        <rect width="744" height="260" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <rect x="20" y="20" width="100" height="12" rx="3" fill="#1d1d1f" />
        {/* Bars */}
        {[
          { x: 60, h: 120, c: "#0066cc" },
          { x: 140, h: 160, c: "#0066cc" },
          { x: 220, h: 90, c: "#0066cc" },
          { x: 300, h: 200, c: "#0066cc" },
          { x: 380, h: 140, c: "#0066cc" },
          { x: 460, h: 180, c: "#1f8a4c" },
          { x: 540, h: 100, c: "#0066cc" },
          { x: 620, h: 170, c: "#0066cc" },
        ].map((b) => (
          <rect
            key={b.x}
            x={b.x}
            y={230 - b.h}
            width="40"
            height={b.h}
            rx="4"
            fill={b.c}
            opacity="0.85"
          />
        ))}
        <line x1="40" y1="230" x2="720" y2="230" stroke="#e0e0e0" />
      </g>
      {/* Invoice table */}
      <g transform="translate(240, 520)">
        <rect width="744" height="260" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <rect x="20" y="20" width="120" height="12" rx="3" fill="#1d1d1f" />
        {/* Header row */}
        <rect x="20" y="56" width="704" height="32" rx="6" fill="#f5f5f7" />
        {["發票", "客戶", "金額", "到期日", "狀態"].map((label, i) => (
          <rect
            key={label}
            x={28 + i * 140}
            y="67"
            width="80"
            height="10"
            rx="2"
            fill="#7a7a7a"
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(20, ${100 + i * 32})`}>
            <rect width="704" height="1" fill="#f0f0f0" />
            <rect x="8" y="12" width="100" height="10" rx="2" fill="#1d1d1f" />
            <rect x="148" y="12" width="120" height="10" rx="2" fill="#1d1d1f" />
            <rect x="288" y="12" width="80" height="10" rx="2" fill="#1d1d1f" />
            <rect x="428" y="12" width="80" height="10" rx="2" fill="#7a7a7a" />
            <rect
              x="568"
              y="8"
              width="60"
              height="18"
              rx="9"
              fill={i < 2 ? "#1f8a4c" : i < 4 ? "#b97c00" : "#c0392b"}
              opacity="0.15"
            />
            <rect
              x="578"
              y="14"
              width="40"
              height="6"
              rx="2"
              fill={i < 2 ? "#1f8a4c" : i < 4 ? "#b97c00" : "#c0392b"}
            />
          </g>
        ))}
      </g>
      <g transform="translate(1000, 96)">
        <rect width="260" height="684" rx="12" fill="#fafafc" stroke="#e0e0e0" />
        <rect x="20" y="20" width="120" height="12" rx="3" fill="#1d1d1f" />
        {/* Donut */}
        <circle cx="130" cy="180" r="64" fill="none" stroke="#f0f0f0" strokeWidth="20" />
        <circle
          cx="130"
          cy="180"
          r="64"
          fill="none"
          stroke="#0066cc"
          strokeWidth="20"
          strokeDasharray={`${2 * Math.PI * 64 * 0.65} ${2 * Math.PI * 64}`}
          transform="rotate(-90 130 180)"
        />
        <rect x="20" y="270" width="220" height="1" fill="#e0e0e0" />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(20, ${290 + i * 100})`}>
            <rect width="220" height="80" rx="8" fill="#ffffff" stroke="#e0e0e0" />
            <circle cx="20" cy="20" r="6" fill={["#0066cc", "#1f8a4c", "#b97c00"][i]} />
            <rect x="36" y="16" width="100" height="8" rx="2" fill="#1d1d1f" />
            <rect x="36" y="30" width="80" height="6" rx="2" fill="#7a7a7a" />
            <rect x="160" y="20" width="40" height="10" rx="2" fill="#1d1d1f" />
          </g>
        ))}
      </g>
    </svg>
  );
}