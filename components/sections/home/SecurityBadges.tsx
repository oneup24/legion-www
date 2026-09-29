"use client";

import * as React from "react";
import { useTranslations } from "next-intl";
import { Shield, Lock, Cloud, Award } from "lucide-react";

type Badge = { label: string; desc: string };

const iconMap = [Shield, Lock, Cloud, Award];

export function SecurityBadges() {
  const t = useTranslations("home.securityBadges");
  const items = t.raw("items") as Badge[];

  return (
    <section className="tile-dark-2">
      <div className="mx-auto max-w-[1024px] px-4 sm:px-6 py-12">
        <p className="text-caption text-body-muted text-center mb-6 tracking-wide">
          {t("eyebrow")}
        </p>
        <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
          {items.map((b, i) => {
            const Icon = iconMap[i] ?? Shield;
            return (
              <div
                key={b.label}
                className="flex flex-col items-center text-center"
              >
                <Icon
                  size={28}
                  strokeWidth={1.5}
                  className="text-primary-on-dark mb-3"
                />
                <div className="text-body-strong text-on-dark">{b.label}</div>
                <div className="text-caption text-body-muted mt-1">
                  {b.desc}
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}