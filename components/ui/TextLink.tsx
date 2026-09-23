"use client";

import * as React from "react";
import { Link } from "@/lib/i18n/navigation";

type TextLinkVariant = "primary" | "primary-on-dark";

const variantClasses: Record<TextLinkVariant, string> = {
  primary: "text-primary hover:text-primary-focus",
  "primary-on-dark": "text-primary-on-dark hover:underline",
};

export type TextLinkProps = {
  href: string;
  variant?: TextLinkVariant;
  className?: string;
  children: React.ReactNode;
};

export function TextLink({
  href,
  variant = "primary",
  className = "",
  children,
}: TextLinkProps) {
  return (
    <Link
      href={href as never}
      className={`inline-flex items-center gap-1 ${variantClasses[variant]} ${className}`}
    >
      {children}
    </Link>
  );
}