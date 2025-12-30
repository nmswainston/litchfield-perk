/**
 * ScrollHeader Component
 * 
 * Fixed navigation header that transforms as user scrolls past the hero section.
 * Features smooth opacity transitions, botanical pattern absorption effect.
 * Includes navigation links and contact information.
 * 
 * HEADER SPACING FIX:
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
import { Coffee, Menu, X } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button } from "../ui";
import logoImage from "../../assets/logo-512.png";

// Constants
const BACKGROUND_THRESHOLD = 0.1; // Earlier background fade-in
const FULL_OPACITY_THRESHOLD = 0.8; // When header reaches full opacity

export default function ScrollHeader() {
  const { isScrolled: _isScrolled, isOverHero, scrollProgress } = useOptimizedScroll();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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

          {/* Navigation Links - Center (hidden on short landscape mobile) */}
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

            {/* Mobile/Tablet: Hamburger Menu Button */}
            <button
              onClick={() => setMenuOpen(!menuOpen)}
              className="lg:hidden p-2 text-brand-text hover:text-brand-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded"
              aria-expanded={menuOpen}
              aria-controls="mobile-menu"
              aria-label={menuOpen ? "Close menu" : "Open menu"}
            >
              {menuOpen ? (
                <X className="w-6 h-6" />
              ) : (
                <Menu className="w-6 h-6" />
              )}
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile/Tablet Dropdown Menu */}
      {menuOpen && (
        <div
          id="mobile-menu"
          className="lg:hidden absolute top-full left-0 right-0 z-50 border-b border-gray-200 shadow-lg"
          style={{
            background: 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
            backgroundColor: 'var(--color-brand-background, #F5F1E8)'
          }}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="px-4 py-6 space-y-4">
            {/* Navigation Links */}
            <div className="space-y-3">
              {location.pathname === '/' ? (
                <>
                  <a
                    href="#menu"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Menu
                  </a>
                  <a
                    href="#hours"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Hours
                  </a>
                  <a
                    href="#visit"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Visit
                  </a>
                  <a
                    href="#reviews"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Reviews
                  </a>
                </>
              ) : (
                <>
                  <Link
                    to="/#menu"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Menu
                  </Link>
                  <Link
                    to="/#hours"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Hours
                  </Link>
                  <Link
                    to="/#visit"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Visit
                  </Link>
                  <Link
                    to="/#reviews"
                    onClick={() => setMenuOpen(false)}
                    className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                    role="menuitem"
                  >
                    Reviews
                  </Link>
                </>
              )}
              <Link
                to="/wholesale"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                role="menuitem"
              >
                Wholesale
              </Link>
            </div>

            {/* Divider */}
            <div className="border-t border-gray-200 my-4"></div>

            {/* Contact & CTA */}
            <div className="space-y-3">
              <a
                href="tel:+14808234073"
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                role="menuitem"
                aria-label="Call us at (480) 823-4073"
              >
                (480) 823-4073
              </a>
              {location.pathname === '/' ? (
                <Button
                  href="#menu"
                  variant="primary"
                  size="sm"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-sm px-4 py-2"
                  aria-label="Browse our menu"
                >
                  <Coffee className="w-4 h-4 mr-2" />
                  Order
                </Button>
              ) : (
                <Link
                  to="/#menu"
                  onClick={() => setMenuOpen(false)}
                  className="block"
                >
                  <Button
                    variant="primary"
                    size="sm"
                    className="w-full text-sm px-4 py-2"
                    aria-label="Browse our menu"
                  >
                    <Coffee className="w-4 h-4 mr-2" />
                    Order
                  </Button>
                </Link>
              )}
            </div>
          </div>
        </div>
      )}
    </header>
  );
}