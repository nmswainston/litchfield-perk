import React from "react";
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

// Litchfield Perk — Friends‑inspired React site
// Now organized into modular sections for better maintainability

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
      {/* Skip to main content link for accessibility */}
      <a 
        href="#main-content" 
        style={{
          position: 'absolute',
          left: '-10000px',
          top: 'auto',
          width: '1px',
          height: '1px',
          overflow: 'hidden'
        }}
      >
        Skip to main content
      </a>
      
      {/* Scroll Header */}
      <ErrorBoundary componentName="ScrollHeader">
        <ScrollHeader />
      </ErrorBoundary>

      {/* Sections */}
      <HeroSection />
      <MenuSection />
      <HoursSection />
      <VisitSection />
  <AboutUs />
      <div ref={reviewsRef}>
        <ErrorBoundary componentName="ReviewsSection">
          <ReviewsSection />
        </ErrorBoundary>
      </div>
      <div ref={instagramRef}>
        <InstagramSection />
      </div>
      <Footer />
    </div>
  );
}
