import { NotFoundPage } from "@/components/sections/NotFoundPage";

/**
 * Locale-aware 404 for in-app notFound() calls.
 *
 * Static hosting serves out/404.html instead — see app/[locale]/404/page.tsx
 * and the postbuild step that promotes it.
 */
export default function LocaleNotFound() {
  return <NotFoundPage />;
}
