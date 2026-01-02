/**
 * HeroShell Component
 * 
 * Reusable hero section wrapper providing consistent structure, spacing,
 * and layout for hero sections across the site. Ensures identical
 * visual appearance and behavior regardless of content.
 * 
 * @component
 * @param {string} id - Main element ID
 * @param {string} ariaLabelledBy - ID of the heading element for aria-labelledby
 * @param {React.ReactNode} children - Hero content (title, subtitle, buttons)
 * @param {React.ReactNode} bottomContent - Optional content to anchor at bottom (e.g., info card)
 */
import Container from "./Container";

export default function HeroShell({ 
  id = "main-content",
  ariaLabelledBy,
  children,
  bottomContent
}) {
  return (
    <main
      id={id}
      className="bg-brand-background text-center p-0"
      aria-labelledby={ariaLabelledBy}
    >
      {/* Hero Banner */}
      {/* Desktop: Full viewport height with compact content to fit first screen */}
      <div 
        className="bg-gradient-to-br from-brand-background-light to-brand-background-dark px-4 sm:px-5 relative overflow-hidden flex flex-col min-h-[100svh] md:h-screen lg:h-screen"
        style={{
          paddingTop: 'calc(72px + env(safe-area-inset-top, 0px))' // Account for fixed header (72px) + safe area on mobile
        }}
      >
        {/* Botanical Pattern - Reduced opacity on desktop for cleaner content readability */}
        <div className="absolute inset-0 opacity-30 lg:opacity-20 mix-blend-multiply hero-pattern-bg" />

        <Container className="relative z-10 w-full flex-1 flex flex-col">
          {/* Main Hero Content - Vertically Centered */}
          {/* Desktop: Minimal vertical padding to fit content within viewport */}
          <div className="flex-1 flex flex-col justify-center items-center text-center w-full py-4 sm:py-6 md:py-2 lg:py-0">
            {/* 
              Hero Vertical Rhythm System:
              - Uses space-y-* for consistent vertical spacing between elements
              - Mobile: space-y-2 (unchanged - prevents regression)
              - Tablet: space-y-2.5 (tighter spacing to reduce vertical gaps)
              - Desktop: space-y-2 (tighter spacing for more compact, intentional feel)
              - All elements centered with flex flex-col items-center
              - Intentional spacing between headline words, logo, tagline, and CTAs
              - Desktop: Content constrained to max-width 1200px for balanced, centered layout
            */}
            <div className="flex flex-col items-center text-center w-full space-y-2 sm:space-y-3 md:space-y-2.5 lg:space-y-2 lg:max-w-[1200px]">
              {children}
            </div>
          </div>

          {/* Optional Bottom Content (e.g., Info Card) */}
          {bottomContent && (
            <div className="mx-auto max-w-5xl w-full px-4 pb-4 sm:pb-6 md:pb-8">
              {bottomContent}
            </div>
          )}
        </Container>
      </div>
    </main>
  );
}

