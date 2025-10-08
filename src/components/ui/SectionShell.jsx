import React from "react";

/*
 * SectionShell: standardized section header shell
 * Layout: kicker → title → subhead → content → fine-rule divider
 */
export default function SectionShell({
  kicker,
  title,
  subhead,
  children,
  align = "center", // 'left' | 'center' | 'right'
  className = "",
  divider = true,
  kickerId,
  titleId,
  subheadId,
}) {
  const alignmentClass =
    align === "left"
      ? "text-left items-start"
      : align === "right"
        ? "text-right items-end"
        : "text-center items-center";

  return (
    <div
      className={`w-full flex flex-col ${alignmentClass} gap-2 sm:gap-3 ${className}`}
    >
      {kicker ? (
        <div
          id={kickerId}
          className="uppercase tracking-[0.18em] text-xs sm:text-sm font-semibold text-brand-text-muted"
        >
          {kicker}
        </div>
      ) : null}

      {title ? (
        <h2 id={titleId} className="text-section-title text-brand-text">
          {title}
        </h2>
      ) : null}

      {subhead ? (
        <p id={subheadId} className="text-body text-brand-text-muted max-w-3xl">
          {subhead}
        </p>
      ) : null}

      {children ? <div className="w-full mt-4 sm:mt-6">{children}</div> : null}

      {divider ? (
        <hr
          className="mt-6 sm:mt-8 border-t border-brand-border-light w-full"
          aria-hidden="true"
        />
      ) : null}
    </div>
  );
}
