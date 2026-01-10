import { useEffect, useState, useCallback, useRef } from 'react';

const SCROLL_THRESHOLD = 120;
const DEBOUNCE_DELAY = 16;
const DEFAULT_HERO_HEIGHT = 800;

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

  const easeInOutCubic = (t) => {
    return t < 0.5 
      ? 4 * t * t * t 
      : 1 - Math.pow(-2 * t + 2, 3) / 2;
  };

  const updateScrollData = useCallback(() => {
    const scrollY = window.scrollY;
    const heroHeight = window.innerHeight;
    const rawProgress = Math.min(scrollY / heroHeight, 1);
    const easedProgress = easeInOutCubic(rawProgress);
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

    const debouncedScroll = () => {
      clearTimeout(timeoutRef.current);
      timeoutRef.current = setTimeout(handleScroll, DEBOUNCE_DELAY);
    };

    updateScrollData();
    window.addEventListener("scroll", debouncedScroll, { passive: true });
    
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
