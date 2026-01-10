import { useEffect, useRef, useState } from 'react';
import analytics from '../utils/analytics';

const SECTION_VISIBILITY_THRESHOLD = 0.8;

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
