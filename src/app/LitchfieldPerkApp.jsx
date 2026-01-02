/**
 * LitchfieldPerkApp Component
 * 
 * Main application component that orchestrates all page sections.
 * Implements error boundaries for graceful error handling and
 * scroll tracking for analytics. Includes accessibility skip links.
 * 
 * @component
 */
import { useEffect } from "react";
import { useLocation } from "react-router-dom";
import ScrollHeader from "../components/layout/ScrollHeader";
import HeroSection from "../components/sections/HeroSection";
import MenuSection from "../components/sections/MenuSection";
import HoursSection from "../components/sections/HoursSection";
import VisitSection from "../components/sections/VisitSection";
import AboutUs from "../components/sections/AboutUs";
import AppCTASection from "../components/sections/AppCTASection";
import ReviewsSection from "../components/sections/ReviewsSection";
import InstagramSection from "../components/sections/InstagramSection";
import Footer from "../components/sections/Footer";
import { ErrorBoundary, StickyAppBar } from "../components/ui";
import { useScrollTracking } from "../hooks";

export default function LitchfieldPerkApp() {
  // Track scroll depth and section visibility
  const { reviewsRef, instagramRef } = useScrollTracking();
  const location = useLocation();

  // Handle hash navigation when arriving from other pages
  useEffect(() => {
    if (location.hash) {
      const elementId = location.hash.substring(1);
      const element = document.getElementById(elementId);
      if (element) {
        setTimeout(() => {
          element.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }, 100);
      }
    }
  }, [location.hash]);

  return (
    <div className="bg-brand-background text-brand-text min-h-screen font-sans">
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
      <ErrorBoundary componentName="AppCTASection">
        <AppCTASection />
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
      
      {/* Mobile Sticky App Bar */}
      <ErrorBoundary componentName="StickyAppBar">
        <StickyAppBar />
      </ErrorBoundary>
    </div>
  );
}
