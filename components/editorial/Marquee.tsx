import * as React from "react";

/**
 * Infinite horizontal marquee.
 * The track holds two identical copies; translating by -50% loops seamlessly.
 * Pauses on hover/focus, and honours prefers-reduced-motion via the CSS layer.
 */
export function Marquee({
  children,
  duration = 44,
  className,
}: {
  children: React.ReactNode;
  duration?: number;
  className?: string;
}) {
  return (
    <div
      className={`marquee ${className ?? ""}`}
      style={{ "--marquee-duration": `${duration}s` } as React.CSSProperties}
    >
      <div className="marquee-track">
        <div className="flex shrink-0 items-center gap-10 pr-10">{children}</div>
        <div
          className="flex shrink-0 items-center gap-10 pr-10"
          aria-hidden
        >
          {children}
        </div>
      </div>
    </div>
  );
}
