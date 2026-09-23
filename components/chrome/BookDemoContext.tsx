"use client";

import * as React from "react";

type BookDemoContextValue = {
  open: boolean;
  setOpen: (next: boolean) => void;
  source: string;
  setSource: (s: string) => void;
};

const BookDemoContext = React.createContext<BookDemoContextValue | null>(null);

export { BookDemoContext };

export function useBookDemo() {
  const ctx = React.useContext(BookDemoContext);
  if (!ctx) {
    throw new Error("useBookDemo must be used within BookDemoModalProvider");
  }
  return ctx;
}