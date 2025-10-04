import React from "react";
import { Coffee, Clock, MapPin, Instagram } from "lucide-react";
import { useOptimizedScroll } from "../../hooks";
import { DottyWord, Button } from "../ui";

export default function ScrollHeader() {
  const { scrollY, isScrolled, isOverHero, scrollProgress } = useOptimizedScroll();

  // Optimized thresholds for smooth transitions
  const textColorThreshold = 0.3; // Earlier text color change
  const backgroundThreshold = 0.1; // Earlier background fade-in
  const fullOpacityThreshold = 0.8; // When header reaches full opacity

  // Smooth opacity calculations with better curves
  const headerOpacity = isOverHero 
    ? Math.min(0.95 + (scrollProgress * 0.05), 1) 
    : 1;

  const backgroundOpacity = Math.min(scrollProgress * 1.2, 1);
  const patternOpacity = Math.min(scrollProgress * 0.2, 0.15);

  // Text color with smoother transition
  const textColor = scrollProgress > textColorThreshold ? '#000000' : '#ffffff';
  const textShadow = scrollProgress > textColorThreshold 
    ? '1px 1px 2px rgba(255, 255, 255, 0.5)' 
    : '2px 2px 4px rgba(0, 0, 0, 0.8)';

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
              backgroundSize: 'cover',
              backgroundPosition: 'center',
              backgroundRepeat: 'no-repeat',
              opacity: patternOpacity
            }}
          />
        </>
      )}

      <nav 
        className="relative px-5 py-4"
        role="navigation"
        aria-label="Main navigation"
      >
        <div className="max-w-7xl mx-auto flex items-center justify-between">
          {/* Logo */}
          <div className="flex items-center">
            <DottyWord 
              text="Litchfield Perk" 
              color={textColor}
              textShadow={textShadow}
              className="text-2xl font-bold transition-all duration-300"
            />
          </div>

          {/* Navigation Links */}
          <div className="hidden md:flex items-center space-x-8">
            <a 
              href="#menu" 
              className="menu-item touch-target text-base font-medium transition-colors duration-200 hover:text-brand-primary"
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
              className="menu-item touch-target text-base font-medium transition-colors duration-200 hover:text-brand-primary"
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
              className="menu-item touch-target text-base font-medium transition-colors duration-200 hover:text-brand-primary"
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
              className="menu-item touch-target text-base font-medium transition-colors duration-200 hover:text-brand-primary"
              style={{ 
                color: textColor,
                textShadow: textShadow
              }}
              aria-label="Read customer reviews"
            >
              Reviews
            </a>
          </div>

          {/* CTA Button */}
          <div className="flex items-center space-x-4">
            <Button
              href="#menu"
              variant="primary"
              size="default"
              className="hidden sm:inline-flex"
              aria-label="Browse our menu"
            >
              <Coffee className="w-4 h-4 mr-2" />
              Order Now
            </Button>
          </div>
        </div>
      </nav>
    </header>
  );
}