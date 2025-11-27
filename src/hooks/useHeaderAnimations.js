import { useMemo } from "react";

/**
 * Custom hook for managing header animation states and calculations
 * @param {number} scrollProgress - Current scroll progress (0-1)
 * @param {boolean} isOverHero - Whether scroll is over hero section
 * @param {boolean} reduceMotion - User prefers reduced motion
 * @returns {Object} Animation states and styles
 */
export const useHeaderAnimations = (scrollProgress, isOverHero, reduceMotion) => {
  return useMemo(() => {
    // Disable animations if user prefers reduced motion
    const progress = reduceMotion ? 0 : scrollProgress;
    
    // Smooth opacity calculations with better curves
    const headerOpacity = isOverHero 
      ? Math.min(0.9 + progress * 0.15, 1) 
      : 1;
    
    const backgroundOpacity = Math.min(progress * 1.2, 1);
    const patternOpacity = Math.min(progress * 0.2, 0.15);
    
    // Show subtle inner ring when pattern is present/visible
    const showRing = !isOverHero || scrollProgress > 0.05;
    
    // Premium inset ring + soft drop shadow when condensed
    const headerShadow = isOverHero
      ? showRing
        ? "inset 0 0 0 1px rgba(0,0,0,0.06)"
        : "none"
      : "inset 0 0 0 1px rgba(0,0,0,0.06), 0 2px 18px rgba(0,0,0,0.10)";

    // Micro-interaction thresholds
    const isPast60 = scrollProgress >= 0.6; // 60% of hero height

    return {
      headerOpacity,
      backgroundOpacity,
      patternOpacity,
      showRing,
      headerShadow,
      isPast60,
      // Fixed text appearance (no animation)
      textColor: "var(--color-brand-text, #1A1D1C)",
      textShadow: "none"
    };
  }, [scrollProgress, isOverHero, reduceMotion]);
};
