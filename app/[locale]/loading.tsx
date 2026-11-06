import { SectionLabel } from "@/components/editorial/SectionLabel";

/**
 * Route-level loading state. Static export prerenders every route, so this
 * shows up on slow client-side navigations only — but it should still use the
 * site's hairline rhythm rather than a spinner.
 */
export default function Loading() {
  return (
    <section className="bg-canvas">
      <div className="shell py-16 sm:py-24 lg:py-32">
        <SectionLabel>載入中</SectionLabel>

        <div className="mt-10 grid grid-cols-1 lg:grid-cols-12 gap-x-8 gap-y-14">
          <div className="lg:col-span-7">
            <div
              aria-hidden
              className="h-12 w-full max-w-xl rounded-sm bg-surface-pearl"
            />
            <div
              aria-hidden
              className="mt-5 h-12 w-4/5 max-w-md rounded-sm bg-surface-pearl"
            />
            <div
              aria-hidden
              className="mt-6 h-4 w-full max-w-lg rounded-sm bg-surface-pearl"
            />
            <div
              aria-hidden
              className="mt-2.5 h-4 w-3/4 max-w-sm rounded-sm bg-surface-pearl"
            />
            <div
              aria-hidden
              className="mt-10 h-12 w-40 rounded-pill bg-surface-pearl"
            />
          </div>

          <div className="lg:col-span-5 flex items-start justify-center lg:justify-end">
            <div
              aria-hidden
              className="w-full max-w-[320px] aspect-square rounded-sm bg-surface-pearl"
            />
          </div>
        </div>

        <span className="sr-only" role="status" aria-live="polite">
          載入中
        </span>
      </div>
    </section>
  );
}
