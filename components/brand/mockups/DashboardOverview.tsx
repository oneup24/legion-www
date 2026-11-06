import * as React from "react";
import {
  BLUE,
  BLUE_DEEP,
  BLUE_SOFT,
  INK,
  LINE,
  MUTED,
  hexPoints,
} from "./hex";

/**
 * Dashboard overview mockup — KPI cards + revenue chart + activity feed.
 * Composed inline SVG so it scales crisply and avoids raster pipeline.
 *
 * Branded: deep Legion-blue sidebar, hexagon module icons, hexagon data
 * points, hexagon avatars. The product render has to look like LegionOne's
 * product, not like a generic SaaS wireframe.
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

      {/* Sidebar — Legion deep blue */}
      <rect x="0" y="0" width="220" height="800" fill={BLUE_DEEP} />
      {/* Brand mark in the sidebar */}
      <g transform="translate(22, 26)">
        <polygon
          points={hexPoints(11, 11, 10.5)}
          fill="none"
          stroke="#2997ff"
          strokeWidth="1.6"
          strokeLinejoin="round"
        />
        <polygon
          points={hexPoints(11, 11, 6)}
          fill="none"
          stroke="#2997ff"
          strokeWidth="1.6"
          strokeLinejoin="round"
          opacity="0.5"
        />
        <circle cx="16" cy="6" r="2.2" fill="#2997ff" />
      </g>
      <rect x="50" y="31" width="92" height="13" rx="3" fill="#ffffff" opacity="0.92" />

      {/* Module nav — hexagon icons */}
      {[0, 1, 2, 3, 4, 5].map((_, i) => (
        <g key={i}>
          <polygon
            points={hexPoints(33, 92 + i * 48, 9)}
            fill={i === 0 ? "#2997ff" : "#ffffff"}
            opacity={i === 0 ? 1 : 0.18}
          />
          <rect
            x="52"
            y={86 + i * 48}
            width={120 - i * 8}
            height="10"
            rx="2"
            fill="#ffffff"
            opacity={i === 0 ? 0.92 : 0.38}
          />
        </g>
      ))}

      {/* Header */}
      <rect x="240" y="24" width="200" height="14" rx="3" fill={INK} />
      <rect x="240" y="48" width="120" height="10" rx="3" fill={MUTED} />
      <polygon points={hexPoints(1226, 40, 14)} fill={BLUE} />
      <circle cx="1230" cy="35" r="3" fill="#ffffff" />

      {/* KPI cards row */}
      {[0, 1, 2, 3].map((i) => (
        <g key={i} transform={`translate(${240 + i * 248}, 96)`}>
          <rect width="232" height="116" rx="12" fill="#ffffff" stroke={LINE} />
          <polygon points={hexPoints(30, 30, 8)} fill={BLUE_SOFT} />
          <polygon points={hexPoints(30, 30, 4)} fill={BLUE} />
          <rect x="48" y="24" width="80" height="10" rx="2" fill={MUTED} />
          <rect x="20" y="48" width="140" height="22" rx="3" fill={INK} />
          <rect x="20" y="82" width="60" height="10" rx="3" fill="#1f8a4c" />
          <rect x="86" y="82" width="40" height="10" rx="3" fill="#cccccc" />
        </g>
      ))}

      {/* Chart */}
      <g transform="translate(240, 240)">
        <rect width="744" height="280" rx="12" fill="#ffffff" stroke={LINE} />
        <rect x="20" y="20" width="120" height="12" rx="3" fill={INK} />
        <rect x="20" y="40" width="80" height="8" rx="2" fill={MUTED} />
        <line x1="40" y1="220" x2="720" y2="220" stroke={LINE} />
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
        <path
          d="M60,200 L160,160 L260,170 L620,90 L680,110 L700,80"
          stroke={BLUE}
          strokeWidth="2.5"
          fill="none"
          strokeLinecap="round"
          strokeLinejoin="round"
        />
        <path
          d="M60,200 L160,160 L260,170 L620,90 L680,110 L700,80 L700,220 L60,220 Z"
          fill={BLUE}
          opacity="0.08"
        />
        {/* Hexagon data points — the brand shape carries into the product */}
        {[
          [60, 200],
          [160, 160],
          [260, 170],
          [620, 90],
          [680, 110],
          [700, 80],
        ].map(([x, y], i) => (
          <polygon
            key={i}
            points={hexPoints(x as number, y as number, 8)}
            fill="#ffffff"
            stroke={BLUE}
            strokeWidth="2"
            strokeLinejoin="round"
          />
        ))}
      </g>

      {/* Activity feed */}
      <g transform="translate(240, 540)">
        <rect width="744" height="240" rx="12" fill="#ffffff" stroke={LINE} />
        <rect x="20" y="20" width="100" height="12" rx="3" fill={INK} />
        {[0, 1, 2, 3, 4].map((_, i) => (
          <g key={i} transform={`translate(20, ${56 + i * 36})`}>
            <polygon
              points={hexPoints(8, 8, 8)}
              fill={i % 2 === 0 ? BLUE : "#1f8a4c"}
            />
            <rect x="24" y="0" width="200" height="10" rx="2" fill={INK} />
            <rect x="240" y="0" width="60" height="10" rx="2" fill={MUTED} />
            <rect x="320" y="0" width="120" height="10" rx="2" fill={MUTED} />
          </g>
        ))}
      </g>

      {/* Right rail — cards with hexagon avatars */}
      <g transform="translate(1000, 96)">
        <rect width="260" height="684" rx="12" fill="#fafafc" stroke={LINE} />
        <rect x="20" y="20" width="100" height="12" rx="3" fill={INK} />
        {[0, 1, 2, 3].map((_, i) => (
          <g key={i} transform={`translate(20, ${56 + i * 152})`}>
            <rect width="220" height="136" rx="8" fill="#ffffff" stroke={LINE} />
            <polygon points={hexPoints(34, 34, 20)} fill={BLUE_SOFT} />
            <polygon points={hexPoints(34, 34, 11)} fill={BLUE} />
            <rect x="64" y="18" width="120" height="10" rx="2" fill={INK} />
            <rect x="64" y="36" width="80" height="8" rx="2" fill={MUTED} />
            <rect x="14" y="68" width="192" height="2" fill="#f0f0f0" />
            <rect x="14" y="82" width="100" height="10" rx="2" fill={INK} />
            <rect x="14" y="100" width="180" height="6" rx="2" fill={MUTED} />
            <rect x="14" y="112" width="160" height="6" rx="2" fill={MUTED} />
          </g>
        ))}
      </g>
    </svg>
  );
}
