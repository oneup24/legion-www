import * as React from "react";
import {
  BLUE,
  BLUE_SOFT,
  GREEN,
  INK,
  LINE,
  LINE_SOFT,
  MUTED,
  PAPER,
  ModuleRail,
  hexPoints,
} from "./hex";

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
      <ModuleRail active={1} />

      {/* Header */}
      <rect x="240" y="24" width="200" height="14" rx="3" fill={INK} />
      <rect x="240" y="48" width="120" height="10" rx="3" fill={MUTED} />

      {/* Aging summary cards */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${240 + i * 248}, 96)`}>
          <rect width="232" height="116" rx="12" fill="#ffffff" stroke={LINE} />
          <polygon points={hexPoints(30, 30, 9)} fill={BLUE_SOFT} />
          <polygon points={hexPoints(30, 30, 5)} fill={BLUE} />
          <rect x="48" y="24" width="100" height="10" rx="2" fill={MUTED} />
          <rect x="20" y="48" width="120" height="22" rx="3" fill={INK} />
          <rect x="20" y="82" width="160" height="6" rx="3" fill={BLUE} />
          <rect x="20" y="94" width="100" height="6" rx="3" fill="#cccccc" />
        </g>
      ))}

      {/* Cashflow chart — hexagonal columns */}
      <g transform="translate(240, 240)">
        <rect width="744" height="260" rx="12" fill="#ffffff" stroke={LINE} />
        <rect x="20" y="20" width="100" height="12" rx="3" fill={INK} />
        {[
          { x: 60, h: 120, c: BLUE },
          { x: 140, h: 160, c: BLUE },
          { x: 220, h: 90, c: BLUE },
          { x: 300, h: 200, c: BLUE },
          { x: 380, h: 140, c: BLUE },
          { x: 460, h: 180, c: GREEN },
          { x: 540, h: 100, c: BLUE },
          { x: 620, h: 170, c: BLUE },
        ].map((b) => (
          <polygon
            key={b.x}
            points={hexPoints(b.x + 20, 230 - b.h / 2, b.h / 2)}
            fill={b.c}
            opacity="0.85"
          />
        ))}
        <line x1="40" y1="230" x2="720" y2="230" stroke={LINE} />
      </g>

      {/* Invoice table */}
      <g transform="translate(240, 520)">
        <rect width="744" height="260" rx="12" fill="#ffffff" stroke={LINE} />
        <rect x="20" y="20" width="120" height="12" rx="3" fill={INK} />
        <rect x="20" y="56" width="704" height="32" rx="6" fill="#f5f5f7" />
        {["發票", "客戶", "金額", "到期日", "狀態"].map((label, i) => (
          <rect
            key={label}
            x={28 + i * 140}
            y="67"
            width="80"
            height="10"
            rx="2"
            fill={MUTED}
          />
        ))}
        {[0, 1, 2, 3, 4].map((i) => (
          <g key={i} transform={`translate(20, ${100 + i * 32})`}>
            <rect width="704" height="1" fill={LINE_SOFT} />
            <polygon
              points={hexPoints(12, 17, 6)}
              fill={i < 2 ? GREEN : i < 4 ? "#b97c00" : "#c0392b"}
            />
            <rect x="26" y="12" width="100" height="10" rx="2" fill={INK} />
            <rect x="148" y="12" width="120" height="10" rx="2" fill={INK} />
            <rect x="288" y="12" width="80" height="10" rx="2" fill={INK} />
            <rect x="428" y="12" width="80" height="10" rx="2" fill={MUTED} />
            <rect
              x="568"
              y="8"
              width="60"
              height="18"
              rx="9"
              fill={i < 2 ? GREEN : i < 4 ? "#b97c00" : "#c0392b"}
              opacity="0.15"
            />
            <rect
              x="578"
              y="14"
              width="40"
              height="6"
              rx="2"
              fill={i < 2 ? GREEN : i < 4 ? "#b97c00" : "#c0392b"}
            />
          </g>
        ))}
      </g>

      {/* Right rail */}
      <g transform="translate(1000, 96)">
        <rect width="260" height="684" rx="12" fill={PAPER} stroke={LINE} />
        <rect x="20" y="20" width="120" height="12" rx="3" fill={INK} />
        <circle cx="130" cy="180" r="64" fill="none" stroke={LINE_SOFT} strokeWidth="20" />
        <circle
          cx="130"
          cy="180"
          r="64"
          fill="none"
          stroke={BLUE}
          strokeWidth="20"
          strokeDasharray={`${2 * Math.PI * 64 * 0.65} ${2 * Math.PI * 64}`}
          transform="rotate(-90 130 180)"
        />
        <rect x="20" y="270" width="220" height="1" fill={LINE} />
        {[0, 1, 2].map((i) => (
          <g key={i} transform={`translate(20, ${290 + i * 100})`}>
            <rect width="220" height="80" rx="8" fill="#ffffff" stroke={LINE} />
            <polygon
              points={hexPoints(20, 20, 7)}
              fill={[BLUE, GREEN, "#b97c00"][i]}
            />
            <rect x="36" y="16" width="100" height="8" rx="2" fill={INK} />
            <rect x="36" y="30" width="80" height="6" rx="2" fill={MUTED} />
            <rect x="160" y="20" width="40" height="10" rx="2" fill={INK} />
          </g>
        ))}
      </g>
    </svg>
  );
}
