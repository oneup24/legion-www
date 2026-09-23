"use client";

import * as React from "react";

type ButtonVariant =
  | "primary"
  | "secondary-pill"
  | "dark-utility"
  | "pearl-capsule"
  | "store-hero"
  | "icon-circular";

type ButtonSize = "sm" | "md" | "lg";

const baseClasses =
  "inline-flex items-center justify-center gap-2 font-normal transition-all duration-150 disabled:opacity-50 disabled:pointer-events-none active:scale-[0.96]";

const variantClasses: Record<ButtonVariant, string> = {
  primary:
    "bg-primary text-on-primary rounded-pill px-5 hover:bg-primary-focus focus-visible:bg-primary-focus",
  "secondary-pill":
    "bg-transparent text-primary border border-primary rounded-pill px-5 hover:bg-primary/5",
  "dark-utility":
    "bg-transparent text-ink border border-hairline rounded-md px-4 hover:bg-canvas-parchment",
  "pearl-capsule":
    "bg-canvas-parchment text-ink rounded-pill px-4 hover:bg-surface-chip-translucent",
  "store-hero":
    "bg-primary text-on-primary rounded-md px-5 py-2 hover:bg-primary-focus text-button-large",
  "icon-circular":
    "bg-canvas-parchment text-ink rounded-pill w-11 h-11 hover:bg-surface-chip-translucent",
};

const sizeClasses: Record<ButtonSize, string> = {
  sm: "h-9 text-caption",
  md: "h-11 text-button min-w-[44px]",
  lg: "h-12 text-button px-6 min-w-[44px]",
};

export type ButtonProps = React.ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant;
  size?: ButtonSize;
  asChild?: boolean;
};

export const Button = React.forwardRef<HTMLButtonElement, ButtonProps>(
  function Button(
    {
      variant = "primary",
      size = "md",
      className = "",
      children,
      ...rest
    },
    ref,
  ) {
    return (
      <button
        ref={ref}
        className={`${variantClasses[variant]} ${sizeClasses[size]} ${baseClasses} ${className}`}
        {...rest}
      >
        {children}
      </button>
    );
  },
);