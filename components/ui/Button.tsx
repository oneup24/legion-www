"use client";

import * as React from "react";

/**
 * Buttons.
 *
 * Rounded rectangles in sentence case. Hover changes colour only — no scale,
 * no translate — so the interface stays as still as the light canvas it sits
 * on.
 */
type ButtonVariant = "accent" | "white" | "ghost" | "ghostDark";
type ButtonSize = "sm" | "md" | "lg";

const variantClasses: Record<ButtonVariant, string> = {
  accent: "bg-accent text-white hover:bg-accent-hover",
  white: "bg-white text-ink hover:bg-canvas-soft",
  ghost:
    "bg-transparent text-ink border border-line-strong hover:border-ink hover:bg-canvas-soft",
  ghostDark:
    "bg-transparent text-white border border-white/45 hover:border-white hover:bg-white/10",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "btn-sm",
  md: "",
  lg: "px-7 min-h-[54px]",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    { variant = "accent", size = "md", className = "", children, ...rest },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={`btn ${variantClasses[variant]} ${sizeClasses[size]} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);
