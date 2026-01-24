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
      {/* Safari compatibility: Use vh with svh fallback for mobile Safari address bar handling */}
      <div 
        className="bg-gradient-to-br from-brand-background-light to-brand-background-dark px-4 sm:px-5 relative overflow-hidden flex flex-col min-h-screen md:h-screen lg:h-screen"
        style={{
          paddingTop: 'calc(72px + env(safe-area-inset-top, 0px))',
          // Modern browsers: use svh (small viewport height) for better mobile Safari support
          minHeight: 'min(100vh, 100svh)'
        }}
      >
        <div className="absolute inset-0 opacity-30 lg:opacity-20 mix-blend-multiply hero-pattern-bg" />

        <Container className="relative z-10 w-full flex-1 flex flex-col">
          <div className="flex-1 flex flex-col justify-center items-center text-center w-full py-4 sm:py-6 md:py-2 lg:py-0">
            <div className="flex flex-col items-center text-center w-full space-y-2 sm:space-y-3 md:space-y-2.5 lg:space-y-2 lg:max-w-[1200px]">
              {children}
            </div>
          </div>
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

