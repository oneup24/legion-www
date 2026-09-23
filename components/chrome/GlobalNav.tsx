"use client";

import * as React from "react";
import { Menu, X } from "lucide-react";
import { useTranslations } from "next-intl";
import { useBookDemo } from "./useBookDemo";
import { Link, usePathname } from "@/lib/i18n/navigation";
import { Wordmark } from "@/components/brand/Wordmark";
import { LogoMark } from "@/components/brand/LogoMark";

type NavItem = {
  href: string;
  key: "products" | "useCases" | "partners" | "pricing" | "about" | "contact";
};

const items: NavItem[] = [
  { href: "/product", key: "products" },
  { href: "/use-cases", key: "useCases" },
  { href: "/partners", key: "partners" },
  { href: "/pricing", key: "pricing" },
  { href: "/about", key: "about" },
  { href: "/contact", key: "contact" },
];

export function GlobalNav({ locale: _locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  return (
    <header className="sticky top-0 z-40 h-11 bg-surface-black text-body-on-dark">
      <div className="mx-auto max-w-[1024px] h-full px-4 sm:px-6 flex items-center justify-between">
        <Link
          href="/"
          className="flex items-center gap-2 text-white hover:opacity-80"
          aria-label="LegionOne home"
        >
          <LogoMark size={20} className="text-white" />
          <Wordmark className="text-white text-[15px]" />
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-1">
          {items.map((item) => {
            const active =
              pathname === item.href ||
              (item.href !== "/" && pathname.startsWith(item.href));
            return (
              <Link
                key={item.href}
                href={item.href}
                className={`px-3 py-2 text-nav-link transition-colors ${
                  active ? "text-white" : "text-body-muted hover:text-white"
                }`}
              >
                {t(item.key)}
              </Link>
            );
          })}
          <button
            type="button"
            onClick={() => {
              setSource("nav");
              setBookOpen(true);
            }}
            data-cta-id="nav_book_demo"
            className="ml-3 px-3 py-1.5 text-nav-link text-primary-on-dark hover:text-white"
          >
            {t("bookDemo")}
          </button>
        </nav>

        {/* Mobile toggle */}
        <button
          type="button"
          aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
          aria-expanded={mobileOpen}
          className="md:hidden w-11 h-11 flex items-center justify-center text-white"
          onClick={() => setMobileOpen((v) => !v)}
        >
          {mobileOpen ? <X size={20} /> : <Menu size={20} />}
        </button>
      </div>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="md:hidden absolute top-11 left-0 right-0 bg-surface-black border-t border-white/10">
          <nav className="flex flex-col px-4 py-2">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="py-3 text-nav-link text-body-muted hover:text-white border-b border-white/5"
              >
                {t(item.key)}
              </Link>
            ))}
            <button
              type="button"
              onClick={() => {
                setSource("nav_mobile");
                setBookOpen(true);
                setMobileOpen(false);
              }}
              className="mt-3 mb-2 h-11 bg-primary text-on-primary rounded-pill text-button"
            >
              {t("bookDemo")}
            </button>
          </nav>
        </div>
      )}
    </header>
  );
}