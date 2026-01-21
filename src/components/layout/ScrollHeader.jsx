import { useState, useEffect } from "react";
import { Coffee, Menu, X, Smartphone, Instagram, Facebook } from "lucide-react";
import { Link, useLocation } from "react-router-dom";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button, AppStoreLinks, NavLinks, TikTokIcon } from "../ui";
import logoImage from "../../assets/logo-512.png";
import { APP_IOS_URL, APP_ANDROID_URL, APP_NAME, STORE_URL, BUSINESS_INFO } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

export default function ScrollHeader() {
  const { isOverHero, scrollProgress } = useOptimizedScroll();
  const location = useLocation();
  const [menuOpen, setMenuOpen] = useState(false);

  useEffect(() => {
    setMenuOpen(false);
  }, [location.pathname]);

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
        background: isOverHero 
          ? 'transparent' 
          : 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
        backgroundColor: isOverHero ? 'transparent' : 'var(--color-brand-background, #F5F1E8)',
        backdropFilter: 'none',
        borderBottom: isOverHero ? 'none' : '1px solid rgba(224, 224, 224, 0.3)',
        boxShadow: headerShadow,
        transition: 'background-color 300ms ease-out, box-shadow 300ms ease-out'
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
        <div className="max-w-7xl mx-auto w-full flex items-center justify-between gap-4 lg:gap-6 min-w-0">
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
                size="text-sm md:text-base lg:text-lg xl:text-xl"
                className="transition-all duration-300 whitespace-nowrap"
              />
            </div>
          </Link>

          <div className="hidden xl:flex items-center hide-on-short flex-1 justify-center">
            <NavLinks />
          </div>

          <div className="flex items-center gap-4 lg:gap-5 flex-shrink-0">
            <div className="hide-on-short hidden lg:flex items-center gap-4">
              <a 
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\D/g, '')}`}
                className="text-[13px] font-medium text-brand-text transition-all duration-200 hover:text-brand-primary whitespace-nowrap leading-tight"
                aria-label={`Call us at ${BUSINESS_INFO.contact.phone}`}
              >
                {BUSINESS_INFO.contact.phone}
              </a>
              
              <Button
                href={STORE_URL}
                variant="primary"
                size="sm"
                className="text-[13px] px-3.5 py-1.5 btn-mobile flex-shrink-0 gap-1.5"
                aria-label="Shop online at Litchfield Perk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="w-3.5 h-3.5" />
                Store
              </Button>
            </div>

            <div className="hide-on-short hidden md:flex lg:hidden items-center">
              <Button
                href={STORE_URL}
                variant="primary"
                size="sm"
                className="text-sm px-4 py-2 btn-mobile flex-shrink-0 gap-2"
                aria-label="Shop online at Litchfield Perk"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Coffee className="w-4 h-4" />
                Store
              </Button>
            </div>

            <button
              type="button"
              onClick={(e) => {
                e.stopPropagation();
                setMenuOpen((prev) => !prev);
              }}
              className="xl:hidden p-2 text-brand-text hover:text-brand-primary transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded"
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
          className="xl:hidden absolute top-full left-0 right-0 z-50 border-b border-gray-200 shadow-lg animate-slide-down"
          style={{
            // Background color is intentionally fixed for brand; do not change via automated refactors or design adjustments.
            background: 'linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)',
            backgroundColor: 'var(--color-brand-background, #F5F1E8)',
            height: 'calc(100dvh - 72px)',
            maxHeight: 'calc(100dvh - 72px)',
            overflowY: 'auto'
          }}
          role="menu"
          aria-label="Mobile navigation menu"
        >
          <div className="px-4 pt-4 pb-6 space-y-3">
            <div className="space-y-3">
              <NavLinks 
                variant="mobile" 
                linkClassName="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-1.5"
                onLinkClick={() => setMenuOpen(false)}
              />
            </div>

            <div className="border-t border-brand-border-light my-3" />

            <div className="space-y-3">
              <a
                href={`tel:${BUSINESS_INFO.contact.phone.replace(/\D/g, '')}`}
                onClick={() => setMenuOpen(false)}
                className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-1.5"
                role="menuitem"
                aria-label={`Call us at ${BUSINESS_INFO.contact.phone}`}
              >
                {BUSINESS_INFO.contact.phone}
              </a>
              <div className="border-t border-brand-border-light pt-3 space-y-3">
                <div className="space-y-2">
                  <div className="mobile-menu-heading">
                    Download the App
                  </div>
                  <div className="space-y-1">
                    <a
                      href={APP_IOS_URL}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => {
                        trackAppStoreClick("header", APP_IOS_URL);
                        setMenuOpen(false);
                      }}
                      className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-1 inline-flex items-center gap-2"
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
                      className="block text-base font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary py-1 inline-flex items-center gap-2"
                      role="menuitem"
                      aria-label={`Get the ${APP_NAME} app on Google Play`}
                    >
                      <Smartphone className="w-4 h-4" />
                      Google Play
                    </a>
                  </div>
                </div>

                <div className="space-y-2">
                  <div className="mobile-menu-heading">
                    Follow
                  </div>
                  <div className="flex items-center gap-3 text-brand-text-muted">
                    <a
                      href={BUSINESS_INFO.social.instagram.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-brand-border-light bg-white/60 hover:bg-white hover:shadow-sm active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                      aria-label={`Open our Instagram profile ${BUSINESS_INFO.social.instagram.handle} in a new tab`}
                    >
                      <Instagram className="w-5 h-5 text-brand-text" aria-hidden="true" />
                    </a>
                    <a
                      href={BUSINESS_INFO.social.tiktok.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-brand-border-light bg-white/60 hover:bg-white hover:shadow-sm active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                      aria-label={`Open our TikTok profile ${BUSINESS_INFO.social.tiktok.handle} in a new tab`}
                    >
                      <TikTokIcon className="w-5 h-5 text-brand-text" aria-hidden="true" />
                    </a>
                    <a
                      href={BUSINESS_INFO.social.facebook.url}
                      target="_blank"
                      rel="noopener noreferrer"
                      onClick={() => setMenuOpen(false)}
                      className="inline-flex items-center justify-center w-11 h-11 rounded-xl border border-brand-border-light bg-white/60 hover:bg-white hover:shadow-sm active:scale-[0.98] transition focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40"
                      aria-label="Open our Facebook page in a new tab"
                    >
                      <Facebook className="w-5 h-5 text-brand-text" aria-hidden="true" />
                    </a>
                  </div>
                </div>

                <Button
                  href={STORE_URL}
                  variant="primary"
                  size="sm"
                  onClick={() => setMenuOpen(false)}
                  className="w-full text-sm px-4 py-2 gap-2 mt-2"
                  aria-label="Shop online at Litchfield Perk"
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Coffee className="w-4 h-4" />
                  Store
                </Button>
              </div>
            </div>
          </div>
        </div>
      )}
    </header>
  );
}