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
  key: "products" | "useCases" | "pricing" | "partners" | "about";
};

/**
 * Five-item nav — the agency-site rule of fewer, clearer destinations.
 * Contact is intentionally not a top-level item: it is reached from the
 * footer, the demo modal and the closing CTA.
 */
const items: NavItem[] = [
  { href: "/product", key: "products" },
  { href: "/use-cases", key: "useCases" },
  { href: "/pricing", key: "pricing" },
  { href: "/partners", key: "partners" },
  { href: "/about", key: "about" },
];

/**
 * Fixed header that floats over the page.
 *
 * Over the dark hero it is invisible; once the page scrolls it gains a
 * solid black bar with a hairline underneath. There is no visible nav
 * container at the top of the page — the marks float in the dark, the way
 * they do on the reference site.
 */
export function GlobalNav({ locale: _locale }: { locale: string }) {
  const t = useTranslations("nav");
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = React.useState(false);
  const [scrolled, setScrolled] = React.useState(false);
  const { setOpen: setBookOpen, setSource } = useBookDemo();

  React.useEffect(() => {
    setMobileOpen(false);
  }, [pathname]);

  React.useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  return (
    <>
      <header
        className={`fixed inset-x-0 top-0 z-40 transition-colors duration-300 ${
          scrolled || mobileOpen
            ? "bg-void/92 backdrop-blur-md border-b border-white/10"
            : "border-b border-transparent"
        }`}
      >
        <div className="shell h-[68px] flex items-center justify-between">
          <Link
            href="/"
            className="flex items-center gap-3 text-white hover:opacity-70 transition-opacity"
            aria-label="LegionOne home"
          >
            <LogoMark size={26} tone="light" />
            <Wordmark size="sm" />
          </Link>

          {/* Desktop nav */}
          <nav className="hidden lg:flex items-center gap-8">
            {items.map((item) => {
              const active =
                pathname === item.href ||
                (item.href !== "/" && pathname.startsWith(item.href));
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`t-label transition-colors ${
                    active ? "text-white" : "text-ash hover:text-white"
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
              className="btn btn-accent btn-sm"
            >
              {t("bookDemo")}
            </button>
          </nav>

          {/* Mobile toggle */}
          <button
            type="button"
            aria-label={mobileOpen ? t("closeMenu") : t("openMenu")}
            aria-expanded={mobileOpen}
            className="lg:hidden w-11 h-11 flex items-center justify-center text-white -mr-3"
            onClick={() => setMobileOpen((v) => !v)}
          >
            {mobileOpen ? <X size={22} /> : <Menu size={22} />}
          </button>
        </div>
      </header>

      {/* Mobile menu */}
      {mobileOpen && (
        <div className="lg:hidden fixed inset-x-0 top-[68px] bottom-0 z-30 bg-void overflow-y-auto">
          <nav className="shell flex flex-col pt-6">
            {items.map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="t-display-3 text-white/85 hover:text-white py-5 border-b border-white/10"
              >
                {t(item.key)}
              </Link>
            ))}
            <Link
              href="/contact"
              className="t-display-3 text-white/85 hover:text-white py-5 border-b border-white/10"
            >
              {t("contact")}
            </Link>
            <button
              type="button"
              onClick={() => {
                setSource("nav_mobile");
                setBookOpen(true);
                setMobileOpen(false);
              }}
              className="btn btn-accent w-full mt-8"
            >
              {t("bookDemo")}
            </button>
          </nav>
        </div>
      )}
    </>
  );
}
