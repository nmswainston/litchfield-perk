import React from "react";

/**
 * PromoCard
 * Asymmetrical promotional card with optional top-right ribbon.
 * - Uses clip-path for a subtly skewed silhouette
 * - Feathered soft shadows; accessible contrast by default
 */
export default function PromoCard({
  title,
  subtitle,
  image,
  ribbonText,
  href,
  className,
  children,
}) {
  const content = (
    <div
      className={[
        "relative overflow-hidden",
        "rounded-xl",
        "shadow-md",
        "bg-white",
        "transition-all",
        "duration-200",
        "hover:shadow-lg",
        "promo-card",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
      style={{
        // Dynamic background image from prop - must remain inline since image prop varies per instance
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: image ? "cover" : undefined,
        backgroundPosition: image ? "center" : undefined,
      }}
    >
      {/* subtle inner fade for readability over photos */}
      {image && (
        <div className="absolute inset-0 pointer-events-none promo-card-overlay" />
      )}

      {/* Ribbon corner */}
      {ribbonText && (
        <div className="absolute right-0 top-0 z-10">
          <div
            className="relative text-brand-secondary"
            aria-label={ribbonText}
          >
            {/* ribbon body */}
            <div className="px-3 py-1 text-sm font-semibold bg-brand-600 shadow-[0_6px_16px_rgba(0,0,0,0.18)] promo-card-ribbon">
              {ribbonText}
            </div>
            {/* small notch shadow feather */}
            <svg
              width="24"
              height="16"
              viewBox="0 0 24 16"
              className="absolute right-0 top-full -mt-1"
              aria-hidden
            >
              <path d="M24 0 L14 16 L24 16 Z" fill="rgba(0,0,0,0.10)" />
            </svg>
          </div>
        </div>
      )}

      {/* Content */}
      <div className="relative z-0 p-5 sm:p-6 md:p-7">
        {title && (
          <h3 className="text-xl md:text-2xl font-extrabold tracking-tight mb-1 font-display">
            {title}
          </h3>
        )}
        {subtitle && (
          <p className="text-sm md:text-base text-brand-text-muted mb-3">
            {subtitle}
          </p>
        )}
        {children}
      </div>
    </div>
  );

  if (href) {
    return (
        <a
          href={href}
          className="block focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-xl"
        >
        {content}
      </a>
    );
  }
  return content;
}
