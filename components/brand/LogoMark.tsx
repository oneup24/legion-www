import * as React from "react";

export function LogoMark({
  size = 24,
  className = "",
}: {
  size?: number;
  className?: string;
}) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 24 24"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-hidden
    >
      {/* Outer hex ring */}
      <polygon
        points="12,2 21,7 21,17 12,22 3,17 3,7"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
      />
      {/* Middle hex ring */}
      <polygon
        points="12,6 17.5,9 17.5,15 12,18 6.5,15 6.5,9"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.55"
      />
      {/* Inner hex ring */}
      <polygon
        points="12,9 15,10.5 15,13.5 12,15 9,13.5 9,10.5"
        stroke="currentColor"
        strokeWidth="1.5"
        strokeLinejoin="round"
        opacity="0.3"
      />
      {/* Action Blue node at upper-right vertex */}
      <circle cx="17.5" cy="9" r="2" fill="#0066cc" />
    </svg>
  );
}