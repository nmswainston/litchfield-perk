import React, { useMemo, useCallback, useRef, useEffect } from "react";
import { useOptimizedScroll, useHeaderAnimations, useMobileMenu, useReducedMotion } from "../../hooks";
import { DottyWord, ResponsiveImage } from "../ui";
import HeaderBackground from "./HeaderBackground";
import NavigationLinks from "./NavigationLinks";
import MobileMenu from "./MobileMenu";

export default function ScrollHeader() {
  const { isOverHero, scrollProgress } = useOptimizedScroll();
  const reduceMotion = useReducedMotion();
  const { isMenuOpen, menuButtonRef, menuPanelRef, closeMenu, toggleMenu } = useMobileMenu();
  
  const {
    headerOpacity,
    backgroundOpacity,
    patternOpacity,
    showRing,
    headerShadow,
    isPast60,
    textColor,
    textShadow
  } = useHeaderAnimations(scrollProgress, isOverHero, reduceMotion);

  const handleLogoClick = useCallback((e) => {
    e.preventDefault();
    const el = document.getElementById("main-content");
    if (el && typeof el.scrollIntoView === "function") {
      el.scrollIntoView({ behavior: "smooth", block: "start" });
      return;
    }
    window.scrollTo({ top: 0, behavior: "smooth" });
  }, []);

  // Memoized header styles for performance
  const headerStyle = useMemo(() => ({
    opacity: headerOpacity,
    isolation: "isolate",
    background: isOverHero
      ? "transparent"
      : "linear-gradient(135deg, var(--color-brand-background-light, #F9F6F0) 0%, var(--color-brand-background-dark, #ECE6D9) 100%)",
    backgroundColor: isOverHero
      ? "transparent"
      : "var(--color-brand-background, #F5F1E8)",
    backdropFilter: "none",
    borderBottom: "none",
    boxShadow: headerShadow,
  }), [headerOpacity, isOverHero, headerShadow]);

  const headerClassName = useMemo(() => {
    const baseClasses = "fixed top-0 left-0 right-0 z-[2000]";
    const transitionClasses = reduceMotion ? "" : " transition-all duration-300 ease-out";
    const ringClasses = showRing ? " ring-1 ring-black/5" : "";
    return `${baseClasses}${transitionClasses}${ringClasses}`;
  }, [reduceMotion, showRing]);

  const navStyle = useMemo(() => ({
    paddingTop: isPast60 ? "0.75rem" : "1rem",
    paddingBottom: isPast60 ? "0.75rem" : "1rem",
  }), [isPast60]);

  // Keep header offset equal to actual header height so anchors land below it
  const headerRef = useRef(null);
  useEffect(() => {
    const updateHeaderOffset = () => {
      const height = headerRef.current?.getBoundingClientRect().height || 0;
      if (height > 0) {
        document.documentElement.style.setProperty("--header-offset", `${Math.ceil(height)}px`);
      }
    };
    updateHeaderOffset();
    window.addEventListener("resize", updateHeaderOffset);
    return () => window.removeEventListener("resize", updateHeaderOffset);
  }, []);

  // Recompute when header compacts/expands
  useEffect(() => {
    const height = headerRef.current?.getBoundingClientRect().height || 0;
    if (height > 0) {
      document.documentElement.style.setProperty("--header-offset", `${Math.ceil(height)}px`);
    }
  }, [isPast60]);

  return (
    <header
      ref={headerRef}
      className={headerClassName}
      style={headerStyle}
      role="banner"
      aria-label="Site header"
    >
      {/* Background layers for header absorption effect */}
      <HeaderBackground
        isOverHero={isOverHero}
        backgroundOpacity={backgroundOpacity}
        patternOpacity={patternOpacity}
        reduceMotion={reduceMotion}
      />

      <nav
        className="relative z-10 px-4 sm:px-6 lg:px-8 py-4 sm:py-5 header-nav"
        role="navigation"
        aria-label="Main navigation"
        aria-expanded={isMenuOpen}
        style={navStyle}
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo - Left Side */}
          <a
            href="#main-content"
            onClick={handleLogoClick}
            className="flex items-center flex-shrink-0 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
            aria-label="Scroll to top"
          >
            {/* Mobile Logo */}
            <ResponsiveImage
              src="/logo-512.png"
              alt="Litchfield Perk"
              dimensions={{ width: 128, height: 128 }}
              className="h-32 w-32 sm:h-12 sm:w-12 transition-all duration-300 header-logo-img"
              style={{ transform: `scale(${isPast60 ? 0.88 : 1})` }}
              sizes={{ mobile: "128px", desktop: "48px" }}
              loading="eager"
            />

            {/* Desktop Logo + Text (hidden on short landscape mobile) */}
            <div className="hidden sm:flex items-center ml-3 header-text">
              <DottyWord
                text="Litchfield Perk"
                color={textColor}
                textShadow={textShadow}
                size="text-lg lg:text-xl xl:text-2xl"
                className="transition-all duration-300 font-header"
              />
            </div>
          </a>

          {/* Navigation Links - Center (hidden on short landscape mobile) */}
          <NavigationLinks
            textColor={textColor}
            textShadow={textShadow}
          />

          {/* Contact - Right Side */}
          <div className="flex items-center space-x-3">
            {/* Hide these on short landscape mobile */}
            <div className="hide-on-short hidden md:flex items-center">
              {/* Phone Number - Hidden on mobile */}
              <a
                href="tel:+14808234073"
                className="hidden sm:block text-sm font-medium transition-all duration-200 hover:text-brand-primary focus:outline-none focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
                style={{
                  color: textColor,
                  textShadow: textShadow,
                }}
                aria-label="Call us at (480) 823-4073"
              >
                (480) 823-4073
              </a>
            </div>

            {/* Mobile menu button - remains visible */}
            <button
              ref={menuButtonRef}
              className="block md:!hidden p-2 rounded-lg hover:bg-white/10 transition-colors duration-200 touch-target focus:outline-none focus-visible:outline-2 focus-visible:outline-brand-primary focus-visible:outline-offset-2"
              style={{ color: textColor }}
              aria-label={isMenuOpen ? "Close menu" : "Open mobile menu"}
              aria-controls="mobile-menu"
              aria-expanded={isMenuOpen}
              aria-haspopup="menu"
              onClick={toggleMenu}
            >
              <svg
                className="w-6 h-6"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
                aria-hidden="true"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d={isMenuOpen ? "M6 18L18 6M6 6l12 12" : "M4 6h16M4 12h16M4 18h16"}
                />
              </svg>
            </button>
          </div>
        </div>
      </nav>

      {/* Mobile menu overlay + panel */}
      <MobileMenu
        isOpen={isMenuOpen}
        onClose={closeMenu}
        menuPanelRef={menuPanelRef}
        textColor={textColor}
      />
    </header>
  );
}