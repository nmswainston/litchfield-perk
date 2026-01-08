import { useState, useEffect, useRef } from "react";
import { Coffee, Menu, X, Smartphone, ChevronDown } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button, AppStoreLinks, NavLinks } from "../ui";
import logoImage from "../../assets/logo-512.png";
import { APP_IOS_URL, APP_ANDROID_URL, APP_NAME, STORE_URL, BUSINESS_INFO } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

export default function ScrollHeader() {
  const { isOverHero, scrollProgress } = useOptimizedScroll();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);
  const [appDropdownOpen, setAppDropdownOpen] = useState(false);
  const appDropdownRef = useRef(null);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

  useEffect(() => {
    if (!appDropdownOpen) return;

    const handleClickOutside = (e) => {
      if (appDropdownRef.current && !appDropdownRef.current.contains(e.target)) {
        setAppDropdownOpen(false);
      }
    };

    const timeoutId = setTimeout(() => {
      document.addEventListener("pointerdown", handleClickOutside);
    }, 0);

    return () => {
      clearTimeout(timeoutId);
      document.removeEventListener("pointerdown", handleClickOutside);
    };
  }, [appDropdownOpen]);

  const headerOpacity = isOverHero 
    ? Math.min(0.9 + (scrollProgress * 0.15), 1) 
    : 1;

  const backgroundOpacity = Math.min(scrollProgress * 1.2, 1);
  const patternOpacity = Math.min(scrollProgress * 0.2, 0.15);
  const showRing = (!isOverHero) || (scrollProgress > 0.05);
  const headerShadow = isOverHero 
    ? (showRing ? 'inset 0 0 0 1px rgba(0,0,0,0.06)' : 'none')
    : 'inset 0 0 0 1px rgba(0,0,0,0.06), 0 2px 18px rgba(0,0,0,0.10)';

  const handleLogoClick = (e) => {
    if (location.pathname === '/wholesale') {
      return;
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
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        height: '72px',
        opacity: headerOpacity,
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
      {isOverHero && (
        <>
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
              opacity: backgroundOpacity
            }}
          />
          
          <div 
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
            style={{
              backgroundImage: 'url(/botanical-pattern.png)',
              backgroundSize: '120% auto',
              backgroundPosition: 'center',
              backgroundRepeat: 'repeat-y',
              opacity: patternOpacity
            }}
          />
        </>
      )}

      {!isOverHero && (
        <>
          <div 
            className="absolute inset-0 transition-opacity duration-500"
            style={{
              background: 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
              opacity: 0.95
            }}
          />
          
          <div 
            className="absolute inset-0 mix-blend-multiply transition-opacity duration-500"
            style={{
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
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-3 min-w-0">
          <Link 
            to="/" 
            onClick={location.pathname !== '/wholesale' ? handleLogoClick : undefined}
            className="flex items-center min-w-0 gap-2.5 sm:gap-3 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2" 
            aria-label="Go to homepage"
          >
            <img
              src={logoImage}
              alt="Litchfield Perk"
              className="h-10 w-10 sm:h-11 sm:w-11 header-logo-img flex-shrink-0"
              loading="eager"
              width={512}
              height={512}
            />
            
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

          <div className="hidden lg:flex xl:hidden items-center hide-on-short gap-5 min-w-0">
            <NavLinks />
          </div>

          <div className="hidden xl:flex items-center hide-on-short gap-6 flex-1 justify-center">
            <NavLinks />
          </div>

          <div className="flex items-center gap-3 lg:gap-4 flex-shrink-0">
            <div className="hide-on-short hidden lg:flex items-center gap-3">
              <a 
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\D/g, '')}`}
                className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary whitespace-nowrap leading-tight"
                aria-label={`Call us at ${BUSINESS_INFO.contact.phone}`}
              >
                {BUSINESS_INFO.contact.phone}
              </a>
              
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
            <div className="space-y-3">
              <NavLinks 
                variant="mobile" 
                onLinkClick={() => setMenuOpen(false)}
              />
            </div>

            <div className="border-t border-gray-200 my-4"></div>

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