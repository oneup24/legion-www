import * as React from "react";

export function Wordmark({ className = "" }: { className?: string }) {
  return (
    <span
      className={`inline-flex items-baseline font-wordmark font-semibold tracking-[-0.04em] text-ink ${className}`}
    >
      Legion
      <span className="relative inline-block">
        One
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-[3px] h-[1.5px] bg-primary"
        />
      </span>
    </span>
  );
}