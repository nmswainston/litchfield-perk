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
      <div 
        className="bg-gradient-to-br from-brand-background-light to-brand-background-dark px-4 sm:px-5 relative overflow-hidden flex flex-col min-h-screen min-h-[100svh]"
        style={{
          paddingTop: '80px' // Account for fixed header (80px) so content doesn't sit underneath
        }}
      >
        {/* Botanical Pattern */}
        <div className="absolute inset-0 opacity-30 mix-blend-multiply hero-pattern-bg" />

        <Container className="relative z-10 w-full flex-1 flex flex-col">
          {/* Main Hero Content - Vertically Centered */}
          <div className="flex-1 flex flex-col justify-center items-center text-center w-full py-6 sm:py-8 md:py-10">
            {/* 
              Hero Vertical Rhythm System:
              - Uses space-y-* for consistent vertical spacing between elements
              - Mobile: space-y-3 (tighter spacing to reduce empty feeling)
              - Desktop: space-y-4 (maintains hierarchy with tighter spacing)
              - All elements centered with flex flex-col items-center
              - Intentional spacing between headline words, logo, tagline, and CTAs
            */}
            <div className="flex flex-col items-center text-center w-full space-y-3 sm:space-y-4 md:space-y-5">
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

