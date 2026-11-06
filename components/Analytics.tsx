"use client";

import * as React from "react";
import Script from "next/script";
import { usePathname } from "next/navigation";

export function Analytics() {
  const gaId = process.env.NEXT_PUBLIC_GA_ID;
  const pathname = usePathname();

  React.useEffect(() => {
    if (!gaId || typeof window === "undefined") return;
    const url = pathname + window.location.search;
    (window as unknown as { gtag: (...args: unknown[]) => void }).gtag?.(
      "config",
      gaId,
      { page_path: url },
    );
  }, [pathname, gaId]);

  if (!gaId) return null;

  return (
    <>
      <Script
        src={`https://www.googletagmanager.com/gtag/js?id=${gaId}`}
        strategy="afterInteractive"
      />
      <Script id="ga-init" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', '${gaId}', { page_path: window.location.pathname });
        `}
      </Script>
    </>
  );
}
