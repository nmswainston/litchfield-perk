import React from "react";
import ScrollHeader from "./ScrollHeader";
import HeroSection from "./components/sections/HeroSection";
import MenuSection from "./components/sections/MenuSection";
import HoursSection from "./components/sections/HoursSection";
import VisitSection from "./components/sections/VisitSection";
import ReviewsSection from "./components/sections/ReviewsSection";
import InstagramSection from "./components/sections/InstagramSection";
import Footer from "./components/sections/Footer";

// Litchfield Perk — Friends‑inspired React site
// Now organized into modular sections for better maintainability

export default function LitchfieldPerkSite() {
  return (
    <div 
      style={{
        backgroundColor: '#ffffff', 
        color: '#000000',
        minHeight: '100vh',
        fontFamily: 'Arial, sans-serif'
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
      <ScrollHeader />

      {/* Sections */}
      <HeroSection />
      <MenuSection />
      <HoursSection />
      <VisitSection />
      <ReviewsSection />
      <InstagramSection />
      <Footer />
    </div>
  );
}
