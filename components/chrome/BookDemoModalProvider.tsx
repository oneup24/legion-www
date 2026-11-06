"use client";

import * as React from "react";
import { usePathname } from "next/navigation";
import { BookDemoContext } from "./BookDemoContext";
import { BookDemoModal } from "./BookDemoModal";

/**
 * The demo deep link is read from window.location rather than from
 * next/navigation's useSearchParams().
 *
 * useSearchParams() makes React bail out of server rendering for the whole
 * Suspense boundary that contains it — and this provider wraps the entire
 * page, so using it here meant the static export shipped HTML with no
 * headings or copy in it at all. Reading the query string on the client keeps
 * the prerendered HTML complete.
 */
export function BookDemoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [source, setSource] = React.useState("nav");
  const pathname = usePathname();

  React.useEffect(() => {
    if (new URLSearchParams(window.location.search).get("book") === "1") {
      setSource(`deeplink:${pathname}`);
      setOpen(true);
    }
  }, [pathname]);

  const handleSetOpen = React.useCallback((next: boolean) => {
    setOpen(next);
    if (next || typeof window === "undefined") return;

    const params = new URLSearchParams(window.location.search);
    if (params.get("book") !== "1") return;

    params.delete("book");
    const qs = params.toString();
    // history.replaceState rather than router.replace: only the query
    // string changes, and this keeps the locale prefix in the path intact.
    window.history.replaceState(
      null,
      "",
      qs
        ? `${window.location.pathname}?${qs}`
        : window.location.pathname,
    );
  }, []);

  return (
    <BookDemoContext.Provider
      value={{ open, setOpen: handleSetOpen, source, setSource }}
    >
      {children}
      <BookDemoModal />
    </BookDemoContext.Provider>
  );
}
