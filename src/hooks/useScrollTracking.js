/**
 * Hook for tracking scroll depth and section visibility
 * Tracks when user reaches specific sections (Reviews, Instagram)
 */

import { useEffect, useRef, useState } from "react";
import analytics from "../utils/analytics";

export function useScrollTracking() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [reachedSections, setReachedSections] = useState({
    reviews: false,
    instagram: false,
  });

  const reviewsRef = useRef(null);
  const instagramRef = useRef(null);
  const hasTrackedReviews = useRef(false);
  const hasTrackedInstagram = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop =
        window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight =
        document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPercent = Math.round(
        (scrollTop / documentHeight) * 100,
      );

      setScrollPercent(currentScrollPercent);

      // Track Reviews section
      if (reviewsRef.current && !hasTrackedReviews.current) {
        const reviewsRect = reviewsRef.current.getBoundingClientRect();
        const isReviewsVisible = reviewsRect.top <= window.innerHeight * 0.8;

        if (isReviewsVisible) {
          setReachedSections((prev) => ({ ...prev, reviews: true }));
          hasTrackedReviews.current = true;
          analytics.trackScrollDepth("reviews", currentScrollPercent);
        }
      }

      // Track Instagram section
      if (instagramRef.current && !hasTrackedInstagram.current) {
        const instagramRect = instagramRef.current.getBoundingClientRect();
        const isInstagramVisible =
          instagramRect.top <= window.innerHeight * 0.8;

        if (isInstagramVisible) {
          setReachedSections((prev) => ({ ...prev, instagram: true }));
          hasTrackedInstagram.current = true;
          analytics.trackScrollDepth("instagram", currentScrollPercent);
        }
      }
    };

    // Throttle scroll events for performance
    let ticking = false;
    const throttledScroll = () => {
      if (!ticking) {
        requestAnimationFrame(() => {
          handleScroll();
          ticking = false;
        });
        ticking = true;
      }
    };

    window.addEventListener("scroll", throttledScroll, { passive: true });

    // Initial check in case page loads with sections already visible
    handleScroll();

    return () => {
      window.removeEventListener("scroll", throttledScroll);
    };
  }, []);

  return {
    scrollPercent,
    reachedSections,
    reviewsRef,
    instagramRef,
  };
}
