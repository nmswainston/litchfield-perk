/**
 * useScrollTracking Hook
 * 
 * Tracks scroll depth and section visibility for analytics.
 * Monitors when user reaches specific sections (Reviews, Instagram)
 * and triggers analytics events once per section.
 * 
 * @returns {Object} Object containing:
 *   - scrollPercent: Overall page scroll percentage
 *   - reachedSections: Object with boolean flags for each section
 *   - reviewsRef: Ref to attach to Reviews section
 *   - instagramRef: Ref to attach to Instagram section
 */
import { useEffect, useRef, useState } from 'react';
import analytics from '../utils/analytics';

// Constants
const SECTION_VISIBILITY_THRESHOLD = 0.8; // 80% of viewport height

export function useScrollTracking() {
  const [scrollPercent, setScrollPercent] = useState(0);
  const [reachedSections, setReachedSections] = useState({
    reviews: false,
    instagram: false
  });
  
  const reviewsRef = useRef(null);
  const instagramRef = useRef(null);
  const hasTrackedReviews = useRef(false);
  const hasTrackedInstagram = useRef(false);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.pageYOffset || document.documentElement.scrollTop;
      const documentHeight = document.documentElement.scrollHeight - window.innerHeight;
      const currentScrollPercent = Math.round((scrollTop / documentHeight) * 100);
      
      setScrollPercent(currentScrollPercent);

      // Track Reviews section visibility
      if (reviewsRef.current && !hasTrackedReviews.current) {
        const reviewsRect = reviewsRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isReviewsVisible = reviewsRect.top <= viewportHeight * SECTION_VISIBILITY_THRESHOLD;
        
        if (isReviewsVisible) {
          setReachedSections(prev => ({ ...prev, reviews: true }));
          hasTrackedReviews.current = true;
          analytics.trackScrollDepth('reviews', currentScrollPercent);
        }
      }

      // Track Instagram section visibility
      if (instagramRef.current && !hasTrackedInstagram.current) {
        const instagramRect = instagramRef.current.getBoundingClientRect();
        const viewportHeight = window.innerHeight;
        const isInstagramVisible = instagramRect.top <= viewportHeight * SECTION_VISIBILITY_THRESHOLD;
        
        if (isInstagramVisible) {
          setReachedSections(prev => ({ ...prev, instagram: true }));
          hasTrackedInstagram.current = true;
          analytics.trackScrollDepth('instagram', currentScrollPercent);
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

    window.addEventListener('scroll', throttledScroll, { passive: true });
    
    // Initial check in case page loads with sections already visible
    handleScroll();

    return () => {
      window.removeEventListener('scroll', throttledScroll);
    };
  }, []);

  return {
    scrollPercent,
    reachedSections,
    reviewsRef,
    instagramRef
  };
}
