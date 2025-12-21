/**
 * ScrollHeader Component
 * 
 * Fixed navigation header that transforms as user scrolls past the hero section.
 * Features smooth opacity transitions, botanical pattern absorption effect,
 * and responsive mobile menu. Includes navigation links and contact information.
 * 
 * HEADER SPACING FIX (2024):
 * - Removed inline padding styles that could cause layout shifts
 * - Fixed logo sizing (mobile was too large)
 * - Replaced margin/spacing hacks with consistent gap utilities
 * - Ensured stable header height (80px) with no padding changes on scroll
 * - Simplified phone number visibility logic (removed redundant classes)
 * - Nav links use gap-5, CTAs use gap-4 for consistent spacing
 * 
 * @component
 */
import { useState, useEffect } from "react";
import { Coffee } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button } from "../ui";
import logoImage from "../../assets/logo-512.png";

// Constants
const SCROLL_CLOSE_THRESHOLD = 100; // Close mobile menu when scrolling past this
const BACKGROUND_THRESHOLD = 0.1; // Earlier background fade-in
const FULL_OPACITY_THRESHOLD = 0.8; // When header reaches full opacity

export default function ScrollHeader() {
  const { scrollY, isScrolled: _isScrolled, isOverHero, scrollProgress } = useOptimizedScroll();
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
  const location = useLocation();

  // Close mobile menu when scrolling
  useEffect(() => {
    if (isMobileMenuOpen && scrollY > SCROLL_CLOSE_THRESHOLD) {
      setIsMobileMenuOpen(false);
    }
  }, [scrollY, isMobileMenuOpen]);

  // Close mobile menu on Escape key press
  useEffect(() => {
    const handleEscape = (e) => {
      if (e.key === 'Escape' && isMobileMenuOpen) {
        setIsMobileMenuOpen(false);
      }
    };
    window.addEventListener('keydown', handleEscape);
    return () => window.removeEventListener('keydown', handleEscape);
  }, [isMobileMenuOpen]);

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

  // Note: All text colors now use CSS classes (text-brand-text) for consistency with design system

  /**
   * Handle logo click - navigate to home or scroll to top
   */
  const handleLogoClick = (e) => {
    if (location.pathname === '/wholesale') {
      // On wholesale page, navigate to home
      return; // Link will handle navigation
    }
    e.preventDefault();
    const mainContent = document.getElementById('main-content');
    
    if (mainContent && typeof mainContent.scrollIntoView === 'function') {
      mainContent.scrollIntoView({ behavior: 'smooth', block: 'start' });
      return;
    }
    
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <header
      className="fixed top-0 left-0 right-0 z-50"
      style={{
        // Dynamic styles based on scroll position - opacity, background, and shadow change as user scrolls
        // Must remain inline since values are computed from scroll state
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '80px', // Fixed height for header - no layout shifts
        opacity: headerOpacity,
        // Match the hero background after leaving hero: same warm paper gradient, no filters
        background: isOverHero 
          ? 'transparent' 
          : 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
        backgroundColor: isOverHero ? 'transparent' : 'var(--color-brand-background, #F5F1E8)',
        backdropFilter: 'none',
        borderBottom: isOverHero ? 'none' : '1px solid rgba(224, 224, 224, 0.3)',
        boxShadow: headerShadow,
        transition: 'opacity 300ms ease-out, background-color 300ms ease-out, box-shadow 300ms ease-out'
      }}
    >
      {/* Background layers for header absorption effect */}
      {isOverHero && (
        <>
          {/* Gradient background */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              // Dynamic opacity based on scroll progress - fades in as header transitions
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              opacity: backgroundOpacity
            }}
          />
          
          {/* Botanical pattern overlay */}
          <div 
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
            style={{
              // Dynamic opacity for botanical pattern absorption effect - increases as user scrolls
              backgroundImage: 'url(/botanical-pattern.png)',
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
          {/* Gradient background matching hero paper tone */}
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              // Static gradient background when scrolled past hero - opacity value could be CSS variable but kept inline for consistency with dynamic version above
              background: 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
              opacity: 0.95
            }}
          />
          
          {/* Botanical pattern overlay to persist pattern beyond hero */}
          <div 
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
            style={{
              // Botanical pattern background for scrolled state - opacity is static but kept inline for consistency with dynamic version above
              backgroundImage: 'url(/botanical-pattern.png)',
              backgroundSize: '120% auto',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat-y',
              opacity: 0.15
            }}
          />
        </>
      )}

      <nav 
        className="relative px-4 sm:px-6 lg:px-8 header-nav h-full flex items-center"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4">
          {/* Logo - Left Side */}
          <Link 
            to="/" 
            onClick={location.pathname !== '/wholesale' ? handleLogoClick : undefined}
            className="flex items-center flex-shrink-0 gap-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" 
            aria-label="Go to homepage"
          >
            {/* Logo - Consistent sizing across breakpoints */}
            <img
              src={logoImage}
              alt="Litchfield Perk"
              className="h-10 w-10 sm:h-12 sm:w-12 header-logo-img flex-shrink-0"
              loading="eager"
              width={512}
              height={512}
            />
            
            {/* Desktop Logo + Text (hidden on short landscape mobile) */}
            <div className="hidden sm:flex items-center header-text">
              <DottyWord 
                text="Litchfield Perk" 
                color="var(--color-brand-text)"
                textShadow="none"
                size="text-lg lg:text-xl xl:text-2xl"
                className="transition-all duration-300"
              />
            </div>
          </Link>

          {/* Navigation Links - Center (desktop only, lg breakpoint and above) */}
          <div className="hidden lg:flex items-center hide-on-short gap-6">
            {location.pathname === '/' ? (
              <>
                <a 
                  href="#menu" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="View our menu"
                >
                  Menu
                </a>
                <a 
                  href="#hours" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="View our hours"
                >
                  Hours
                </a>
                <a 
                  href="#visit" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="Visit our location"
                >
                  Visit
                </a>
                <a 
                  href="#reviews" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="Read customer reviews"
                >
                  Reviews
                </a>
              </>
            ) : (
              <>
                <Link 
                  to="/#menu" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="View our menu"
                >
                  Menu
                </Link>
                <Link 
                  to="/#hours" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="View our hours"
                >
                  Hours
                </Link>
                <Link 
                  to="/#visit" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="Visit our location"
                >
                  Visit
                </Link>
                <Link 
                  to="/#reviews" 
                  className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
                  aria-label="Read customer reviews"
                >
                  Reviews
                </Link>
              </>
            )}
            <Link 
              to="/wholesale" 
              className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary"
              aria-label="Wholesale Partner Program"
            >
              Wholesale
            </Link>
          </div>

          {/* Contact & CTA - Right Side */}
          <div className="flex items-center gap-4 flex-shrink-0">
            {/* Desktop: Phone + Order Button (hidden on mobile/tablet) */}
            <div className="hide-on-short hidden lg:flex items-center gap-4">
              {/* Phone Number */}
              <a 
                href="tel:+14808234073"
                className="text-sm font-medium text-brand-text transition-all duration-200 hover:text-brand-primary whitespace-nowrap"
                aria-label="Call us at (480) 823-4073"
              >
                (480) 823-4073
              </a>
              
              {/* Order Button */}
              {location.pathname === '/' ? (
                <Button
                  href="#menu"
                  variant="primary"
                  size="sm"
                  className="text-sm px-4 py-2 btn-mobile flex-shrink-0"
                  aria-label="Browse our menu"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Order
                </Button>
              ) : (
                <Link to="/#menu">
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-sm px-4 py-2 btn-mobile flex-shrink-0"
                    aria-label="Browse our menu"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Order
                  </Button>
                </Link>
              )}
            </div>

            {/* Tablet: Order Button only (md to lg breakpoint, no phone to prevent collisions) */}
            <div className="hide-on-short hidden md:flex lg:hidden items-center">
              {location.pathname === '/' ? (
                <Button
                  href="#menu"
                  variant="primary"
                  size="sm"
                  className="text-sm px-4 py-2 btn-mobile flex-shrink-0"
                  aria-label="Browse our menu"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Order
                </Button>
              ) : (
                <Link to="/#menu">
                  <Button
                    variant="primary"
                    size="sm"
                    className="text-sm px-4 py-2 btn-mobile flex-shrink-0"
                    aria-label="Browse our menu"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Order
                  </Button>
                </Link>
              )}
            </div>
            
            {/* Mobile menu button - visible on mobile only (hidden on tablet and desktop md+) */}
            <button 
              className="md:hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 touch-target flex-shrink-0 text-brand-text"
              aria-label={isMobileMenuOpen ? "Close mobile menu" : "Open mobile menu"}
              aria-expanded={isMobileMenuOpen}
              onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
            >
              {isMobileMenuOpen ? (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                </svg>
              ) : (
                <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
                </svg>
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile Menu Dropdown - visible on mobile only (< md breakpoint) */}
      {isMobileMenuOpen && (
        <div 
          className="md:hidden border-t border-brand-border-light bg-brand-background-light"
          style={{ 
            // Mobile menu background gradient - uses CSS variables but inline style ensures consistent rendering across browsers
            background: 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
            backgroundColor: 'var(--color-brand-background, #F5F1E8)'
          }}
        >
          <nav className="px-4 py-4 space-y-2" role="navigation" aria-label="Mobile navigation">
            {location.pathname === '/' ? (
              <>
                <a 
                  href="#menu" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </a>
                <a 
                  href="#hours" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hours
                </a>
                <a 
                  href="#visit" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Visit
                </a>
                <a 
                  href="#reviews" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reviews
                </a>
              </>
            ) : (
              <>
                <Link 
                  to="/#menu" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Menu
                </Link>
                <Link 
                  to="/#hours" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Hours
                </Link>
                <Link 
                  to="/#visit" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Visit
                </Link>
                <Link 
                  to="/#reviews" 
                  className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  Reviews
                </Link>
              </>
            )}
            <Link 
              to="/wholesale" 
              className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              Wholesale
            </Link>
            <a 
              href="tel:+14808234073"
              className="block py-3 px-4 text-base font-medium text-brand-text rounded-lg transition-colors duration-200 hover:bg-white/20"
              onClick={() => setIsMobileMenuOpen(false)}
            >
              (480) 823-4073
            </a>
            <div className="pt-2">
              {location.pathname === '/' ? (
                <Button
                  href="#menu"
                  variant="primary"
                  size="default"
                  className="w-full text-center"
                  onClick={() => setIsMobileMenuOpen(false)}
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Order
                </Button>
              ) : (
                <Link to="/#menu" onClick={() => setIsMobileMenuOpen(false)}>
                  <Button
                    variant="primary"
                    size="default"
                    className="w-full text-center"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Order
                  </Button>
                </Link>
              )}
            </div>
          </nav>
        </div>
      )}
    </header>
  );
}