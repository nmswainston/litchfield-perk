import React from "react";
import { Coffee, Clock, MapPin, Instagram } from "lucide-react";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button } from "../ui";

export default function ScrollHeader() {
  const { scrollY, isScrolled, isOverHero, scrollProgress } = useOptimizedScroll();

  // Optimized thresholds for smooth transitions
  const textColorThreshold = 0.4; // Earlier text color change
  const backgroundThreshold = 0.1; // Earlier background fade-in
  const fullOpacityThreshold = 0.8; // When header reaches full opacity

  // Smooth opacity calculations with better curves
  const headerOpacity = isOverHero 
    ? Math.min(0.95 + (scrollProgress * 0.05), 1) 
    : 1;

  const backgroundOpacity = Math.min(scrollProgress * 1.2, 1);
  const patternOpacity = Math.min(scrollProgress * 0.2, 0.15);

  // Smooth color transition based on scroll progress
  const getSmoothColor = (startColor, endColor, progress) => {
    // Validate input parameters
    if (!startColor || !endColor || typeof progress !== 'number') {
      return startColor || '#ffffff';
    }

    // Parse hex colors to RGB
    const hexToRgb = (hex) => {
      if (!hex || typeof hex !== 'string') return null;
      const result = /^#?([a-f\d]{2})([a-f\d]{2})([a-f\d]{2})$/i.exec(hex);
      return result ? {
        r: parseInt(result[1], 16),
        g: parseInt(result[2], 16),
        b: parseInt(result[3], 16)
      } : null;
    };

    const start = hexToRgb(startColor);
    const end = hexToRgb(endColor);
    
    if (!start || !end) {
      return progress > 0.5 ? endColor : startColor;
    }

    const r = Math.round(start.r + (end.r - start.r) * progress);
    const g = Math.round(start.g + (end.g - start.g) * progress);
    const b = Math.round(start.b + (end.b - start.b) * progress);
    return `rgb(${r}, ${g}, ${b})`;
  };

  // Smooth text color transition
  const colorProgress = Math.min(scrollProgress / textColorThreshold, 1);
  const textColor = getSmoothColor('#ffffff', '#000000', colorProgress);
  
  // Smooth text shadow transition
  const shadowOpacity = Math.round((1 - colorProgress) * 0.8 * 100) / 100;
  const whiteShadowOpacity = Math.round(colorProgress * 0.5 * 100) / 100;
  const textShadow = `2px 2px 4px rgba(0, 0, 0, ${shadowOpacity}), 1px 1px 2px rgba(255, 255, 255, ${whiteShadowOpacity})`;

  const handleLogoClick = (e) => {
    e.preventDefault();
    const el = document.getElementById('main-content');
    if (el && typeof el.scrollIntoView === 'function') {
      el.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out"
      style={{
        opacity: headerOpacity,
        backgroundColor: isOverHero ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: isOverHero ? 'none' : 'blur(10px)',
        borderBottom: isOverHero ? 'none' : '1px solid rgba(224, 224, 224, 0.3)',
        boxShadow: isOverHero ? 'none' : '0 2px 20px rgba(0, 0, 0, 0.1)'
      }}
    >
      {/* Background layers for header absorption effect */}
      {isOverHero && (
        <>
          {/* Gradient background */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              opacity: backgroundOpacity
            }}
          />
          
          {/* Botanical pattern overlay */}
          <div 
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
            style={{
              backgroundImage: 'url(/public/botanical-pattern.png)',
              backgroundSize: '120% auto',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat-y',
              opacity: patternOpacity
            }}
          />
        </>
      )}

      {/* Botanical pattern background when scrolled past hero */}
      {!isOverHero && (
        <>
          {/* Gradient background */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              opacity: 0.95
            }}
          />
          
          {/* Botanical pattern overlay */}
          <div 
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
            style={{
              backgroundImage: 'url(/public/botanical-pattern.png)',
              backgroundSize: '120% auto',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat-y',
              opacity: 0.15
            }}
          />
        </>
      )}

      <nav 
        className="relative px-4 sm:px-6 lg:px-8 py-4 sm:py-5 header-nav"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Left Side */}
          <a href="#main-content" onClick={handleLogoClick} className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" aria-label="Scroll to top">
            {/* Mobile Logo */}
            <img
              src="/src/assets/logo-512.png"
              alt="Litchfield Perk"
              className="h-32 w-32 sm:h-12 sm:w-12 transition-all duration-300"
              style={{}}
            />
            
            {/* Desktop Logo + Text */}
            <div className="hidden sm:flex items-center ml-3">
              
              <DottyWord 
                text="Litchfield Perk" 
                color={textColor}
                textShadow={textShadow}
                size="text-lg lg:text-xl xl:text-2xl"
                className="transition-all duration-300"
              />
            </div>
          </a>

          {/* Navigation Links - Center */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#menu" 
              className="text-sm font-medium transition-all duration-200 hover:text-brand-primary"
              style={{ 
                color: textColor,
                textShadow: textShadow
              }}
              aria-label="View our menu"
            >
              Menu
            </a>
            <a 
              href="#hours" 
              className="text-sm font-medium transition-all duration-200 hover:text-brand-primary"
              style={{ 
                color: textColor,
                textShadow: textShadow
              }}
              aria-label="View our hours"
            >
              Hours
            </a>
            <a 
              href="#visit" 
              className="text-sm font-medium transition-all duration-200 hover:text-brand-primary"
              style={{ 
                color: textColor,
                textShadow: textShadow
              }}
              aria-label="Visit our location"
            >
              Visit
            </a>
            <a 
              href="#reviews" 
              className="text-sm font-medium transition-all duration-200 hover:text-brand-primary"
              style={{ 
                color: textColor,
                textShadow: textShadow
              }}
              aria-label="Read customer reviews"
            >
              Reviews
            </a>
          </div>

          {/* Contact & CTA - Right Side */}
          <div className="flex items-center space-x-4">
            {/* Phone Number - Hidden on mobile */}
            <a 
              href="tel:+14808234073"
              className="hidden sm:block text-sm font-medium transition-all duration-200 hover:text-brand-primary"
              style={{ 
                color: textColor,
                textShadow: textShadow
              }}
              aria-label="Call us at (480) 823-4073"
            >
              (480) 823-4073
            </a>
            
            {/* Order Button */}
            <Button
              href="#menu"
              variant="primary"
              size="sm"
              className="text-sm px-4 py-2 btn-mobile"
              aria-label="Browse our menu"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Order
            </Button>
            
            {/* Mobile menu button */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 touch-target"
              style={{ color: textColor }}
              aria-label="Open mobile menu"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
              </svg>
            </button>
          </div>
        </div>
      </nav>
    </header>
  );
}