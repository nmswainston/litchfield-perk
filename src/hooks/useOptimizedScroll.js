/**
 * useOptimizedScroll Hook
 * 
 * Optimized scroll tracking hook with debouncing and requestAnimationFrame.
 * Provides smooth scroll-based animations and state management for header transitions.
 * Uses easing functions for natural-feeling progress calculations.
 * 
 * @returns {Object} Scroll data object containing:
 *   - scrollY: Current scroll position in pixels
 *   - isScrolled: Boolean indicating if scrolled past threshold
 *   - isOverHero: Boolean indicating if still over hero section
 *   - scrollProgress: Normalized progress (0-1) with easing applied
 *   - heroHeight: Current viewport height
 */
import { useEffect, useState, useCallback, useRef } from 'react';

// Constants
const SCROLL_THRESHOLD = 120; // Pixels scrolled before isScrolled becomes true
const DEBOUNCE_DELAY = 16; // ~60fps
const DEFAULT_HERO_HEIGHT = 800; // Fallback for SSR

export function useOptimizedScroll() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    isScrolled: false,
    isOverHero: true,
    scrollProgress: 0,
    heroHeight: typeof window !== 'undefined' ? window.innerHeight : DEFAULT_HERO_HEIGHT
  });

  const rafRef = useRef();
  const timeoutRef = useRef();

  /**
   * Smooth easing function for natural-feeling progress curves
   * @param {number} t - Progress value (0-1)
   * @returns {number} Eased progress value
   */
  const easeInOutCubic = (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  /**
   * Update scroll data with optimized calculations
   */
  const updateScrollData = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    
    // Calculate scroll progress with easing
    const rawProgress = Math.min(scrollY / heroHeight, 1);
    const easedProgress = easeInOutCubic(rawProgress);
    
    // Clamp progress to avoid jitter
    const clampedProgress = Math.max(0, Math.min(1, easedProgress));
    
    setScrollData({
      scrollY,
      isScrolled: scrollY > SCROLL_THRESHOLD,
      isOverHero: scrollY < heroHeight,
      scrollProgress: clampedProgress,
      heroHeight
    });
  }, []);

  useEffect(() => {
    let ticking = false;

    const handleScroll = () => {
      if (!ticking) {
        rafRef.current = requestAnimationFrame(() => {
          updateScrollData();
          ticking = false;
        });
        ticking = true;
      }
    };

    // Debounced scroll handler for performance
    const debouncedScroll = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleScroll, DEBOUNCE_DELAY);
    };

    // Initial call
    updateScrollData();

    // Add scroll listener
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    
    // Cleanup
    return () => {
      window.removeEventListener("scroll", debouncedScroll);
      if (rafRef.current) {
        cancelAnimationFrame(rafRef.current);
      }
      if (timeoutRef.current) {
        clearTimeout(timeoutRef.current);
      }
    };
  }, [updateScrollData]);

  return scrollData;
}

export default useOptimizedScroll;
