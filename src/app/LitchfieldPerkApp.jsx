import React, { Suspense, useEffect } from "react";
import { THEME } from "../constants";
import ScrollHeader from "../components/layout/ScrollHeader";
import HeroSection from "../components/sections/HeroSection";
import MenuSection from "../components/sections/MenuSection";
import HoursSection from "../components/sections/HoursSection";
import VisitSection from "../components/sections/VisitSection";
import AboutUs from "../components/sections/AboutUs";
import Footer from "../components/sections/Footer";
import { ErrorBoundary } from "../components/ui";
import { useScrollTracking } from "../hooks";

// Lazy-load heavier, below-the-fold sections
const ReviewsSection = React.lazy(() =>
  import("../components/sections/ReviewsSection"),
);
const InstagramSection = React.lazy(() =>
  import("../components/sections/InstagramSection"),
);
// import analytics from "../utils/analytics";

// Litchfield Perk — Friends‑inspired React site
// Now organized into modular sections for better maintainability

export default function LitchfieldPerkApp() {
  // Track scroll depth and section visibility
  const { reviewsRef, instagramRef, reachedSections } = useScrollTracking();

  // Initialize analytics on component mount
  useEffect(() => {
    // Analytics are automatically initialized in the analytics.js file
    // This ensures they load after the component is mounted
    console.log("📊 Analytics initialized for Litchfield Perk");
  }, []);

  // JSON-LD is provided statically in index.html; avoid runtime injection to satisfy strict CSP

  return (
    <div
      className="font-sans"
      style={{
        backgroundColor: THEME.colors.background,
        color: THEME.colors.text,
        minHeight: "100vh",
      }}
    >
      {/* Skip to main content link for accessibility */}
      <a
        href="#main-content"
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>

      {/* Header */}
      <header role="banner">
        <ErrorBoundary componentName="ScrollHeader">
          <ScrollHeader />
        </ErrorBoundary>
      </header>

      {/* Main Content */}
      <main id="main-content" role="main">
        <HeroSection />
        <MenuSection />
        <HoursSection />
        <VisitSection />
        <AboutUs />
        <div id="reviews" ref={reviewsRef}>
          {reachedSections?.reviews ? (
            <Suspense fallback={null}>
              <ErrorBoundary componentName="ReviewsSection">
                <ReviewsSection />
              </ErrorBoundary>
            </Suspense>
          ) : null}
        </div>
        <div id="instagram" ref={instagramRef}>
          {reachedSections?.instagram ? (
            <Suspense fallback={null}>
              <InstagramSection />
            </Suspense>
          ) : null}
        </div>
      </main>

      {/* Footer */}
      <footer role="contentinfo">
        <Footer />
      </footer>
    </div>
  );
}
