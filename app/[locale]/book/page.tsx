"use client";

import * as React from "react";
import { useEffect } from "react";
import { useRouter, usePathname } from "@/lib/i18n/navigation";
import { useBookDemo } from "@/components/chrome/useBookDemo";

export default function BookPage() {
  const router = useRouter();
  const pathname = usePathname();
  const { setOpen, setSource } = useBookDemo();

  useEffect(() => {
    setSource(`direct:${pathname}`);
    setOpen(true);
    // Redirect to home after opening modal
    const t = setTimeout(() => router.replace("/"), 100);
    return () => clearTimeout(t);
  }, [setOpen, setSource, router, pathname]);

  return (
    <div className="mx-auto max-w-[600px] px-4 py-24 text-center">
      <p className="text-body text-ink-muted-80">開啟預約表單中...</p>
    </div>
  );
}