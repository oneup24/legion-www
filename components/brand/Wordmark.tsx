import * as React from "react";

/**
 * The LegionOne wordmark.
 *
 * Set as live text rather than an image so it stays crisp at every size and
 * can be translated. Gilroy is a commercial licence and is not bundled, so
 * the brand slot `--font-brand` sits in front of Poppins; dropping in the
 * licensed woff2 files switches the whole site over with no code change.
 */
export function Wordmark({
  className = "",
  size = "md",
}: {
  className?: string;
  size?: "sm" | "md" | "lg";
}) {
  const scale =
    size === "sm"
      ? "text-[17px]"
      : size === "lg"
        ? "text-[30px] sm:text-[36px]"
        : "text-[21px] sm:text-[24px]";

  return (
    <span
      className={`inline-flex items-baseline font-display font-medium tracking-[-0.035em] ${scale} ${className}`}
    >
      Legion
      <span className="relative inline-block">
        One
        <span
          aria-hidden
          className="absolute left-0 right-0 -bottom-[2px] h-[2px] bg-accent"
        />
      </span>
    </span>
  );
}
