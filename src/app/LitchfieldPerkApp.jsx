/**
 * LitchfieldPerkApp Component
 * 
 * Main application component that orchestrates all page sections.
 * Implements error boundaries for graceful error handling and
 * scroll tracking for analytics. Includes accessibility skip links.
 * 
 * @component
 */
import { THEME } from "../constants";
import ScrollHeader from "../components/layout/ScrollHeader";
import HeroSection from "../components/sections/HeroSection";
import MenuSection from "../components/sections/MenuSection";
import HoursSection from "../components/sections/HoursSection";
import VisitSection from "../components/sections/VisitSection";
import AboutUs from "../components/sections/AboutUs";
import ReviewsSection from "../components/sections/ReviewsSection";
import InstagramSection from "../components/sections/InstagramSection";
import Footer from "../components/sections/Footer";
import { ErrorBoundary } from "../components/ui";
import { useScrollTracking } from "../hooks";

export default function LitchfieldPerkApp() {
  // Track scroll depth and section visibility
  const { reviewsRef, instagramRef } = useScrollTracking();

  return (
    <div 
      style={{
        backgroundColor: THEME.colors.background, 
        color: THEME.colors.text,
        minHeight: '100vh',
        fontFamily: THEME.typography.fontFamily
      }}
    >
      {/* Skip links for accessibility */}
      <a 
        href="#main-content" 
        className="skip-link"
        aria-label="Skip to main content"
      >
        Skip to main content
      </a>
      <a 
        href="#menu" 
        className="skip-link"
        aria-label="Skip to menu"
      >
        Skip to menu
      </a>
      
      {/* Scroll Header */}
      <ErrorBoundary componentName="ScrollHeader">
        <ScrollHeader />
      </ErrorBoundary>

      {/* Sections */}
      <ErrorBoundary componentName="HeroSection">
        <HeroSection />
      </ErrorBoundary>
      <ErrorBoundary componentName="MenuSection">
        <MenuSection />
      </ErrorBoundary>
      <ErrorBoundary componentName="HoursSection">
        <HoursSection />
      </ErrorBoundary>
      <ErrorBoundary componentName="VisitSection">
        <VisitSection />
      </ErrorBoundary>
      <ErrorBoundary componentName="AboutUs">
        <AboutUs />
      </ErrorBoundary>
      <div ref={reviewsRef}>
        <ErrorBoundary componentName="ReviewsSection">
          <ReviewsSection />
        </ErrorBoundary>
      </div>
      <div ref={instagramRef}>
        <ErrorBoundary componentName="InstagramSection">
          <InstagramSection />
        </ErrorBoundary>
      </div>
      <ErrorBoundary componentName="Footer">
        <Footer />
      </ErrorBoundary>
    </div>
  );
}
