import { useEffect, useState, useCallback, useRef } from "react";

/**
 * Optimized scroll hook with debouncing and requestAnimationFrame
 * Provides smooth scroll-based animations and state management
 *
 * @returns {Object} Scroll data including position, progress, and states
 */
export function useOptimizedScroll() {
  const [scrollData, setScrollData] = useState({
    scrollY: 0,
    isScrolled: false,
    isOverHero: true,
    scrollProgress: 0,
    heroHeight: typeof window !== "undefined" ? window.innerHeight : 800, // Use viewport height
  });

  const rafRef = useRef();
  const timeoutRef = useRef();

  const updateScrollData = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight; // Use actual viewport height

    // Smooth easing function for opacity curve
    const easeInOutCubic = (t) =>
      t < 0.5 ? 4 * t * t * t : 1 - Math.pow(-2 * t + 2, 3) / 2;

    // Calculate scroll progress with easing
    const rawProgress = Math.min(scrollY / heroHeight, 1);
    const easedProgress = easeInOutCubic(rawProgress);

    // Clamp progress to avoid jitter
    const clampedProgress = Math.max(0, Math.min(1, easedProgress));

    setScrollData({
      scrollY,
      isScrolled: scrollY > 120,
      isOverHero: scrollY < heroHeight,
      scrollProgress: clampedProgress,
      heroHeight,
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

    // Debounced scroll handler
    const debouncedScroll = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleScroll, 16); // ~60fps
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
