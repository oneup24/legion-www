"use client";

import * as React from "react";
import { useSearchParams, usePathname, useRouter } from "next/navigation";
import { BookDemoContext } from "./BookDemoContext";
import { BookDemoModal } from "./BookDemoModal";

export function BookDemoModalProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const [open, setOpen] = React.useState(false);
  const [source, setSource] = React.useState("nav");
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const router = useRouter();

  React.useEffect(() => {
    if (searchParams?.get("book") === "1") {
      setSource(`deeplink:${pathname}`);
      setOpen(true);
    }
  }, [searchParams, pathname]);

  const handleSetOpen = React.useCallback(
    (next: boolean) => {
      setOpen(next);
      if (!next && searchParams?.get("book") === "1") {
        const params = new URLSearchParams(searchParams.toString());
        params.delete("book");
        const qs = params.toString();
        router.replace(qs ? `${pathname}?${qs}` : pathname, { scroll: false });
      }
    },
    [searchParams, pathname, router],
  );

  return (
    <BookDemoContext.Provider
      value={{ open, setOpen: handleSetOpen, source, setSource }}
    >
      {children}
      <BookDemoModal />
    </BookDemoContext.Provider>
  );
}