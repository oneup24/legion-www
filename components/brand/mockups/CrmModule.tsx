import * as React from "react";
import {
  BLUE,
  BLUE_SOFT,
  BLUE_DEEP,
  GREEN,
  INK,
  LINE,
  LINE_SOFT,
  MUTED,
  PAPER,
  ModuleRail,
  hexPoints,
} from "./hex";

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
      <ModuleRail active={2} />

      {/* Header */}
      <rect x="240" y="24" width="160" height="14" rx="3" fill={INK} />
      <rect x="240" y="48" width="100" height="10" rx="3" fill={MUTED} />

      {/* Pipeline tabs — hexagon stage markers */}
      <g transform="translate(240, 80)">
        {["潛在客戶", "聯絡中", "報價中", "成單"].map((label, i) => (
          <g key={label}>
            <rect
              x={i * 130}
              y="0"
              width="120"
              height="36"
              rx="8"
              fill={i === 1 ? BLUE : "transparent"}
              opacity={i === 1 ? 0.1 : 1}
            />
            <polygon
              points={hexPoints(i * 130 + 22, 18, 7)}
              fill={i === 1 ? BLUE : "#d2d2d7"}
            />
            <rect
              x={i * 130 + 34}
              y="13"
              width={label.length * 8}
              height="10"
              rx="2"
              fill={i === 1 ? BLUE : MUTED}
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
            <rect width="184" height="620" rx="12" fill={PAPER} stroke={LINE} />
            <rect x="14" y="16" width="80" height="12" rx="3" fill={INK} />
            <polygon points={hexPoints(158, 24, 10)} fill={BLUE_SOFT} />
            <rect x="153" y="21" width="10" height="6" rx="2" fill={BLUE} />
            {col.items.map((item, ii) => (
              <g key={item} transform={`translate(12, ${52 + ii * 88})`}>
                <rect width="160" height="76" rx="8" fill="#ffffff" stroke={LINE} />
                <polygon points={hexPoints(24, 24, 11)} fill={BLUE_SOFT} />
                <polygon points={hexPoints(24, 24, 6)} fill={BLUE} />
                <rect x="44" y="16" width="100" height="10" rx="2" fill={INK} />
                <rect x="44" y="32" width="80" height="8" rx="2" fill={MUTED} />
                <rect x="12" y="46" width="60" height="6" rx="2" fill="#cccccc" />
                <rect x="120" y="44" width="28" height="22" rx="4" fill={BLUE} opacity="0.12" />
                <rect x="128" y="52" width="12" height="6" rx="2" fill={BLUE} />
              </g>
            ))}
          </g>
        ))}
      </g>

      {/* Right drawer */}
      <g transform="translate(1024, 80)">
        <rect width="236" height="700" rx="12" fill={PAPER} stroke={LINE} />
        <polygon points={hexPoints(118, 56, 30)} fill={BLUE_SOFT} />
        <polygon points={hexPoints(118, 56, 16)} fill={BLUE} />
        <rect x="78" y="100" width="80" height="12" rx="3" fill={INK} />
        <rect x="60" y="120" width="116" height="8" rx="2" fill={MUTED} />
        <line x1="20" y1="148" x2="216" y2="148" stroke={LINE} />
        <rect x="20" y="170" width="60" height="8" rx="2" fill={MUTED} />
        <rect x="20" y="184" width="160" height="10" rx="2" fill={INK} />
        <rect x="20" y="210" width="60" height="8" rx="2" fill={MUTED} />
        <rect x="20" y="224" width="160" height="10" rx="2" fill={INK} />
        <rect x="20" y="250" width="60" height="8" rx="2" fill={MUTED} />
        <rect x="20" y="264" width="160" height="10" rx="2" fill={INK} />
        <line x1="20" y1="298" x2="216" y2="298" stroke={LINE} />
        <rect x="20" y="320" width="80" height="12" rx="3" fill={INK} />
        {[0, 1, 2, 3].map((i) => (
          <g key={i} transform={`translate(20, ${348 + i * 56})`}>
            <polygon points={hexPoints(10, 14, 9)} fill={i === 0 ? BLUE : "#d2d2d7"} />
            <rect x="28" y="10" width="120" height="10" rx="2" fill={INK} />
            <rect x="28" y="26" width="80" height="8" rx="2" fill={MUTED} />
          </g>
        ))}
      </g>
    </svg>
  );
}
