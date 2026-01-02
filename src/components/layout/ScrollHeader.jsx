/**
 * ScrollHeader Component
 * 
 * Fixed navigation header that transforms as user scrolls past the hero section.
 * Features smooth opacity transitions, botanical pattern absorption effect.
 * Includes navigation links and contact information.
 * 
 * HEADER SPACING & ALIGNMENT:
 * - Normalized vertical padding with flex items-center for consistent baseline alignment
 * - Navigation links gap set to gap-4 for optimal, readable spacing
 * - Utility actions gap set to gap-3 for balanced spacing between phone, CTA, and button
 * - Logo and text use gap-2.5 on mobile, gap-3 on desktop for optimal spacing
 * - Header content constrained to max-w-7xl container for consistency with site layout
 * - All elements vertically centered using flex items-center on single baseline
 * - Fixed header height (72px) optimized for viewport usage
 * - Mobile spacing optimized while maintaining touch targets and logo legibility
 * 
 * @component
 */
import { useState, useEffect, useRef } from "react";
import { Coffee, Menu, X, Smartphone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button, AppStoreLinks } from "../ui";
import logoImage from "../../assets/logo-512.png";
import { APP_IOS_URL, APP_ANDROID_URL, APP_NAME, STORE_URL, BUSINESS_INFO } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

export default function ScrollHeader() {
  const { isOverHero, scrollProgress } = useOptimizedScroll();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);
  const appDropdownRef = useRef(null);

  // Close menu on route change
  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  // Close app dropdown when clicking outside
  useEffect(() => {
    if (!appDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (appDropdownRef.current && !appDropdownRef.current.contains(e.target)) {
        setAppDropdownOpen(false);
      }
    };

    // Use a small timeout to prevent the handler from firing immediately after opening
    // This prevents iOS Safari from closing the dropdown right after it opens due to event bubbling
    const timeoutId = setTimeout(() => {
      // Use pointerdown instead of mousedown for better iOS Safari compatibility
      document.addEventListener("pointerdown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [appDropdownOpen]);

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
      className="fixed top-0 left-0 right-0 z-50 overflow-x-clip"
      style={{
        // Dynamic styles based on scroll position - opacity, background, and shadow change as user scrolls
        // Must remain inline since values are computed from scroll state
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '72px', // Fixed height for header - optimized for better viewport usage
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
        className="relative px-4 sm:px-6 lg:px-8 header-nav h-full flex items-center overflow-x-clip"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 min-w-0">
          {/* Logo - Left Side */}
          <Link 
            to="/" 
            onClick={location.pathname !== '/wholesale' ? handleLogoClick : undefined}
            className="flex items-center min-w-0 gap-2.5 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" 
            aria-label="Go to homepage"
          >
            {/* Logo - Consistent sizing across breakpoints, optimized for 72px header */}
            <img
              src={logoImage}
              alt="Litchfield Perk"
              className="h-10 w-10 sm:h-11 sm:w-11 header-logo-img flex-shrink-0"
              loading="eager"
              width={512}
              height={512}
            />
            
            {/* Desktop Logo + Text (hidden on short landscape mobile) - Locked to single line */}
            <div className="hidden sm:flex items-center header-text whitespace-nowrap">
              <DottyWord 
                text="Litchfield Perk" 
                color="var(--color-brand-text)"
                textShadow="none"
                size="text-base lg:text-lg xl:text-xl"
                className="transition-all duration-300"
              />
            </div>
          </Link>

          {/* Navigation Links - Center (lg-only, hidden on xl+ where second nav block shows) */}
          <div className="hidden lg:flex xl:hidden items-center hide-on-short gap-5 min-w-0">
            {location.pathname === '/' ? (
              <>
                <a 
                  href="#menu" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our menu"
                >
                  Menu
                </a>
                <a 
                  href="#hours" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our hours"
                >
                  Hours
                </a>
                <a 
                  href="#visit" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Visit our location"
                >
                  Visit
                </a>
                <a 
                  href="#reviews" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Read customer reviews"
                >
                  Reviews
                </a>
              </>
            ) : (
              <>
                <Link 
                  to="/#menu" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our menu"
                >
                  Menu
                </Link>
                <Link 
                  to="/#hours" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our hours"
                >
                  Hours
                </Link>
                <Link 
                  to="/#visit" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Visit our location"
                >
                  Visit
                </Link>
                <Link 
                  to="/#reviews" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Read customer reviews"
                >
                  Reviews
                </Link>
              </>
            )}
            <Link 
              to="/wholesale" 
              className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
              aria-label="Wholesale Partner Program"
            >
              Wholesale
            </Link>
          </div>

          {/* Navigation Links - Center (xl+ only - duplicates were caused by lg:flex and xl:flex both being true at xl widths) */}
          <div className="hidden xl:flex items-center hide-on-short gap-6 flex-1 justify-center">
            {location.pathname === '/' ? (
              <>
                <a 
                  href="#menu" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our menu"
                >
                  Menu
                </a>
                <a 
                  href="#hours" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our hours"
                >
                  Hours
                </a>
                <a 
                  href="#visit" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Visit our location"
                >
                  Visit
                </a>
                <a 
                  href="#reviews" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Read customer reviews"
                >
                  Reviews
                </a>
              </>
            ) : (
              <>
                <Link 
                  to="/#menu" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our menu"
                >
                  Menu
                </Link>
                <Link 
                  to="/#hours" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="View our hours"
                >
                  Hours
                </Link>
                <Link 
                  to="/#visit" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Visit our location"
                >
                  Visit
                </Link>
                <Link 
                  to="/#reviews" 
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
                  aria-label="Read customer reviews"
                >
                  Reviews
                </Link>
              </>
            )}
            <Link 
              to="/wholesale" 
              className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary leading-tight"
              aria-label="Wholesale Partner Program"
            >
              Wholesale
            </Link>
          </div>

          {/* Contact & CTA - Right Side */}
          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            {/* Desktop: Phone + Get App + Store Button (hidden on mobile/tablet) */}
            <div className="hide-on-short hidden lg:flex items-center gap-3">
              {/* Phone Number */}
              <a 
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\D/g, '')}`}
                className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary whitespace-nowrap leading-tight"
                aria-label={`Call us at ${BUSINESS_INFO.contact.phone}`}
              >
                {BUSINESS_INFO.contact.phone}
              </a>
              
              {/* Get the App Dropdown */}
              <div className="relative" ref={appDropdownRef}>
                <button
                  type="button"
                  onClick={(e) => {
                    e.stopPropagation();
                    setAppDropdownOpen((prev) => !prev);
                  }}
                  className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary whitespace-nowrap inline-flex items-center gap-1.5 leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-1"
                  aria-expanded={appDropdownOpen}
                  aria-haspopup="true"
                  aria-label="Download the App"
                >
                  <Smartphone className="w-3.5 h-3.5" />
                  <span>Get the App</span>
                  <ChevronDown className={`w-3 h-3 transition-transform duration-200 ${appDropdownOpen ? 'rotate-180' : ''}`} />
                </button>
                {appDropdownOpen && (
                  <div
                    className="absolute right-0 top-full mt-2 bg-white rounded-lg shadow-lg border border-gray-200 py-2 min-w-[200px] z-50"
                  >
                    <a
                      href={APP_IOS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackAppStoreClick("header", APP_IOS_URL);
                        setAppDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-brand-text hover:bg-brand-50 hover:text-brand-primary transition-colors duration-200"
                      aria-label={`Get the ${APP_NAME} app on the App Store`}
                    >
                      App Store
                    </a>
                    <a
                      href={APP_ANDROID_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackAppStoreClick("header", APP_ANDROID_URL);
                        setAppDropdownOpen(false);
                      }}
                      className="block px-4 py-2 text-sm text-brand-text hover:bg-brand-50 hover:text-brand-primary transition-colors duration-200"
                      aria-label={`Get the ${APP_NAME} app on Google Play`}
                    >
                      Google Play
                    </a>
                  </div>
                )}
              </div>
              
              {/* Store Button */}
              <Button
                href={STORE_URL}
                variant="primary"
                size="sm"
                className="text-[13px] px-3.5 py-1.5 btn-mobile flex-shrink-0"
                aria-label="Shop online at Litchfield Perk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="w-3.5 h-3.5 mr-1.5" />
                Store
              </Button>
            </div>

            {/* Tablet: Store Button only (md to lg breakpoint, no phone to prevent collisions) */}
            <div className="hide-on-short hidden md:flex lg:hidden items-center">
              <Button
                href={STORE_URL}
                variant="primary"
                size="sm"
                className="text-sm px-4 py-2 btn-mobile flex-shrink-0"
                aria-label="Shop online at Litchfield Perk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Store
              </Button>
            </div>

            {/* Mobile/Tablet: Hamburger Menu Button */}
            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
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
          className="lg:hidden absolute top-full left-0 right-0 z-50 border-b border-gray-200 shadow-lg animate-slide-down"
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
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\D/g, '')}`}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2"
                role="menuitem"
                aria-label={`Call us at ${BUSINESS_INFO.contact.phone}`}
              >
                {BUSINESS_INFO.contact.phone}
              </a>
              <div className="space-y-2">
                <div className="text-sm font-medium text-brand-text-muted px-0 py-2">
                  Download the App
                </div>
                <a
                  href={APP_IOS_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackAppStoreClick("header", APP_IOS_URL);
                    setMenuOpen(false);
                  }}
                  className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2 inline-flex items-center gap-2"
                  role="menuitem"
                  aria-label={`Get the ${APP_NAME} app on the App Store`}
                >
                  <Smartphone className="w-4 h-4" />
                  App Store
                </a>
                <a
                  href={APP_ANDROID_URL}
                  target="_blank"
                  rel="noopener noreferrer"
                  onClick={() => {
                    trackAppStoreClick("header", APP_ANDROID_URL);
                    setMenuOpen(false);
                  }}
                  className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-2 inline-flex items-center gap-2"
                  role="menuitem"
                  aria-label={`Get the ${APP_NAME} app on Google Play`}
                >
                  <Smartphone className="w-4 h-4" />
                  Google Play
                </a>
              </div>
              <Button
                href={STORE_URL}
                variant="primary"
                size="sm"
                onClick={() => setMenuOpen(false)}
                className="w-full text-sm px-4 py-2"
                aria-label="Shop online at Litchfield Perk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="w-4 h-4 mr-2" />
                Store
              </Button>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}