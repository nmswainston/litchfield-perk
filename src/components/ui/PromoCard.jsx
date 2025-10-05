import React from "react";
import { motion } from "framer-motion";

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
    <motion.div
      initial={{ opacity: 0, y: 8 }}
      whileInView={{ opacity: 1, y: 0 }}
      viewport={{ once: true, amount: 0.2 }}
      transition={{ duration: 0.28, ease: "easeOut" }}
      whileHover={{ scale: 1.02 }}
      className={[
        "relative overflow-hidden",
        "bg-brand-secondary text-brand-text",
        "rounded-2xl",
        "shadow-[0_10px_30px_rgba(0,0,0,0.10)]",
        "transition-transform duration-200",
        "hover:scale-[1.02] hover:shadow-[0_14px_36px_rgba(0,0,0,0.12)]",
        className,
      ].filter(Boolean).join(" ")}
      style={{
        clipPath: "polygon(0 0, 92% 0, 100% 10%, 100% 100%, 6% 100%, 0 88%)",
        backgroundImage: image ? `url(${image})` : undefined,
        backgroundSize: image ? "cover" : undefined,
        backgroundPosition: image ? "center" : undefined,
      }}
    >
      {/* subtle inner fade for readability over photos */}
      <div className="absolute inset-0 pointer-events-none" style={{
        background: image ? "linear-gradient(180deg, rgba(245,241,232,0.86) 0%, rgba(245,241,232,0.70) 40%, rgba(245,241,232,0.60) 100%)" : undefined
      }} />

      {/* Ribbon corner */}
      {ribbonText && (
        <div className="absolute right-0 top-0 z-10">
          <div
            className="relative text-brand-secondary"
            aria-label={ribbonText}
          >
            {/* ribbon body */}
            <div
              className="px-3 py-1 text-sm font-semibold bg-brand-600 shadow-[0_6px_16px_rgba(0,0,0,0.18)]"
              style={{
                clipPath: "polygon(0 0, 100% 0, 100% 75%, 86% 100%, 0 100%)",
                transform: "translateY(6px)",
                borderTopLeftRadius: "10px",
              }}
            >
              {ribbonText}
            </div>
            {/* small notch shadow feather */}
            <svg width="24" height="16" viewBox="0 0 24 16" className="absolute right-0 top-full -mt-1" aria-hidden>
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
          <p className="text-sm md:text-base text-brand-text-muted mb-3">{subtitle}</p>
        )}
        {children}
      </div>
    </motion.div>
  );

  if (href) {
    return (
      <a href={href} className="block focus:outline-none focus:ring-2 focus:ring-brand-600 focus:ring-offset-2 rounded-2xl">
        {content}
      </a>
    );
  }
  return content;
}


