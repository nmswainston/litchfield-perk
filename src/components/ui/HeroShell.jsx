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
      {/* Hardened for Edge compatibility: resilient viewport sizing with proper fallbacks */}
      {/* Accounts for fixed header height to ensure CTAs stay visible above fold */}
      <div 
        className="hero-shell-container bg-gradient-to-br from-brand-background-light to-brand-background-dark relative flex flex-col"
        style={{
          paddingTop: 'calc(var(--header-h, 72px) + env(safe-area-inset-top, 0px))'
        }}
      >
        {/* Background wrapper with overflow-hidden scoped to decorative elements only */}
        <div className="absolute inset-0 overflow-hidden">
          <div className="absolute inset-0 opacity-30 lg:opacity-20 mix-blend-multiply hero-pattern-bg" />
        </div>

        {/* Inner content container with proper padding and gap management */}
        <div className="relative z-10 w-full mx-auto max-w-7xl flex-1 flex flex-col items-center justify-center text-center px-4 sm:px-5 py-10 sm:py-14 gap-4 sm:gap-6 lg:gap-8">
          <div className="flex flex-col items-center text-center w-full max-w-[1200px]">
            {children}
          </div>
          {bottomContent && (
            <div className="w-full max-w-5xl px-4 pb-4 sm:pb-6 md:pb-8">
              {bottomContent}
            </div>
          )}
        </div>
      </div>
    </main>
  );
}

