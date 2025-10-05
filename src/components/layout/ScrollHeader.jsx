import React from "react";
import { Coffee, Clock, MapPin, Instagram } from "lucide-react";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button } from "../ui";

export default function ScrollHeader() {
  const { scrollY, isScrolled, isOverHero, scrollProgress } = useOptimizedScroll();

  // Optimized thresholds for smooth transitions (non-text)
  const backgroundThreshold = 0.1; // Earlier background fade-in
  const fullOpacityThreshold = 0.8; // When header reaches full opacity

  // Micro-interaction thresholds
  const isPast60 = scrollProgress >= 0.6; // 60% of hero height

  // Smooth opacity calculations with better curves
  // As the botanical pattern absorbs into the header over the hero,
  // gently increase header opacity to feel like glass picking up background.
  const headerOpacity = isOverHero 
    ? Math.min(0.9 + (scrollProgress * 0.15), 1) 
    : 1;

  const backgroundOpacity = Math.min(scrollProgress * 1.2, 1);
  const patternOpacity = Math.min(scrollProgress * 0.2, 0.15);

  // Show subtle inner ring when pattern is present/visible
  const showRing = (!isOverHero) || (scrollProgress > 0.05);

  // Premium inset ring + soft drop shadow when condensed
  const headerShadow = isOverHero 
    ? (showRing ? 'inset 0 0 0 1px rgba(0,0,0,0.06)' : 'none')
    : 'inset 0 0 0 1px rgba(0,0,0,0.06), 0 2px 18px rgba(0,0,0,0.10)';

  // Fixed text appearance (no animation)
  const textColor = '#000000';
  const textShadow = 'none';

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
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ease-out${showRing ? ' ring-1 ring-black/5' : ''}`}
      style={{
        opacity: headerOpacity,
        backgroundColor: isOverHero ? 'transparent' : 'rgba(255, 255, 255, 0.95)',
        backdropFilter: isOverHero ? 'none' : 'blur(10px)',
        borderBottom: isOverHero ? 'none' : '1px solid rgba(224, 224, 224, 0.3)',
        boxShadow: headerShadow
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
        style={{ paddingTop: isPast60 ? '0.75rem' : '1rem', paddingBottom: isPast60 ? '0.75rem' : '1rem' }}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Left Side */}
          <a href="#main-content" onClick={handleLogoClick} className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" aria-label="Scroll to top">
            {/* Mobile Logo */}
            <img
              src="/src/assets/logo-512.png"
              alt="Litchfield Perk"
              className="h-32 w-32 sm:h-12 sm:w-12 transition-all duration-300 header-logo-img"
              style={{ transform: `scale(${isPast60 ? 0.88 : 1})` }}
            />
            
            {/* Desktop Logo + Text (hidden on short landscape mobile) */}
            <div className="hidden sm:flex items-center ml-3 header-text">
              
              <DottyWord 
                text="Litchfield Perk" 
                color={textColor}
                textShadow={textShadow}
                size="text-lg lg:text-xl xl:text-2xl"
                className="transition-all duration-300"
              />
            </div>
          </a>

          {/* Navigation Links - Center (hidden on short landscape mobile) */}
          <div className={`hidden md:flex items-center hide-on-short transition-all duration-300 ${isPast60 ? 'gap-6' : 'gap-4'}`}>
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
            {/* Hide these on short landscape mobile */}
            <div className="hide-on-short hidden md:flex items-center space-x-4">
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
            </div>
            
            {/* Mobile menu button - remains visible */}
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