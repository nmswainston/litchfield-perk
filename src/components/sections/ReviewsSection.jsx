/**
 * ReviewsSection Component
 * 
 * Displays customer reviews in a carousel format with auto-advance functionality.
 * Supports keyboard navigation, touch gestures, and manual controls.
 * Includes loading states with skeleton UI.
 * 
 * @component
 */
import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getReviews } from "../../utils/reviews";
import { Section, Container, Button } from "../ui";
import analytics from "../../utils/analytics";

// Constants
const AUTO_ADVANCE_INTERVAL = 6000; // 6 seconds
const MIN_SWIPE_DISTANCE = 50; // pixels
const SKELETON_REVIEW_COUNT = 4;

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  // Load reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        // Error handled silently - component will show empty state
        if (import.meta.env.DEV) {
          console.error('Error loading reviews:', error);
        }
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Auto-advance carousel
  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, AUTO_ADVANCE_INTERVAL);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPaused, reviews.length]);

  const nextReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      analytics.trackReviewNavigation('next', (currentIndex + 1) % reviews.length);
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      analytics.trackReviewNavigation('prev', (currentIndex - 1 + reviews.length) % reviews.length);
    }
  };

  const goToReview = (index) => {
    if (reviews.length > 0) {
      setCurrentIndex(index);
      analytics.trackReviewNavigation('dot_click', index);
    }
  };

  // Swipe gesture handlers for mobile
  const handleTouchStart = (e) => {
    touchStartX.current = e.touches[0].clientX;
  };

  const handleTouchMove = (e) => {
    touchEndX.current = e.touches[0].clientX;
  };

  const handleTouchEnd = () => {
    if (!touchStartX.current || !touchEndX.current) return;
    
    const distance = touchStartX.current - touchEndX.current;

    if (distance > MIN_SWIPE_DISTANCE) {
      // Swipe left - next review
      nextReview();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      // Swipe right - previous review
      prevReview();
    }

    // Reset touch positions
    touchStartX.current = 0;
    touchEndX.current = 0;
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <Section 
      id="reviews" 
      background="light"
      padding="lg"
      aria-labelledby="reviews-heading"
    >
      <Container>
        <div className="mb-10 sm:mb-12">
          <h2 id="reviews-heading" className="section-title text-brand-text mb-4 text-center">
            Customer Reviews
          </h2>
          <p className="body-text text-brand-text-muted mb-0 max-w-3xl mx-auto">
            See what our customers are saying about us
          </p>
        </div>

        {/* Reviews Carousel */}
        {isLoading ? (
          <div className="relative max-w-4xl mx-auto mb-10 bg-brand-background rounded-xl p-6 sm:p-8 md:p-10 shadow-md overflow-hidden">
            <div className="px-8 sm:px-12 md:px-16">
              {/* Skeleton quote text - matches actual blockquote structure */}
              <div className="relative mb-6 sm:mb-8 min-h-[120px] flex items-center">
                {/* Skeleton quote marks */}
                <div className="absolute -left-2 sm:-left-4 -top-4 w-12 h-12 sm:w-16 sm:h-16 bg-brand-border/30 rounded-full animate-pulse-soft" />
                <div className="absolute -right-2 sm:-right-4 -bottom-8 w-12 h-12 sm:w-16 sm:h-16 bg-brand-border/30 rounded-full animate-pulse-soft" />
                {/* Skeleton text lines with shimmer */}
                <div className="relative z-10 px-4 w-full space-y-3">
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '100%' }} />
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '95%' }} />
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '80%' }} />
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '60%' }} />
                </div>
              </div>

              {/* Skeleton customer info - matches actual layout */}
              <div className="flex items-center justify-center gap-4">
                {/* Skeleton avatar */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-border/40 rounded-full skeleton-shimmer flex-shrink-0" />
                {/* Skeleton name and date */}
                <div className="text-left space-y-2">
                  <div className="h-5 w-32 bg-brand-border/40 rounded skeleton-shimmer" />
                  <div className="h-4 w-24 bg-brand-border/30 rounded skeleton-shimmer" />
                </div>
              </div>

              {/* Skeleton dots indicator */}
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {Array.from({ length: SKELETON_REVIEW_COUNT }, (_, i) => (
                  <div
                    key={i}
                    className="w-3 h-3 rounded-full bg-brand-border/40 animate-pulse-soft"
                    style={{ animationDelay: `${(i + 1) * 0.15}s` }}
                  />
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div 
            className="relative max-w-4xl mx-auto mb-10 bg-brand-background rounded-xl p-8 sm:p-10 shadow-md overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Navigation Arrows */}
            <button
              onClick={prevReview}
              className="review-nav-btn absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full p-0 z-10 md:flex"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextReview}
              className="review-nav-btn absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full p-0 z-10 md:flex"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>

            {/* Review Content */}
            <div className="px-8 sm:px-12 md:px-16">
              {/* Review Text */}
              <blockquote className="relative body-text text-brand-text-light italic mb-6 sm:mb-8 min-h-[120px] flex items-center">
                <span className="absolute -left-2 sm:-left-4 -top-4 text-5xl sm:text-6xl leading-none text-brand-accent select-none opacity-60" aria-hidden>“</span>
                <span className="absolute -right-2 sm:-right-4 -bottom-8 text-5xl sm:text-6xl leading-none text-brand-accent select-none opacity-60" aria-hidden>”</span>
                <span className="relative z-10 px-4">{currentReview.text}</span>
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar Circle */}
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0">
                  {currentReview.avatar}
                </div>

                <div className="text-left">
                  <div className="subheading text-brand-text mb-1">
                    {currentReview.name}
                  </div>
                  <div className="body-text text-brand-text-muted">
                    {currentReview.date}
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-6 sm:mt-8">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`w-3 h-3 rounded-full border-none cursor-pointer transition-all duration-200 touch-target ${
                      index === currentIndex 
                        ? 'bg-brand-primary' 
                        : 'bg-brand-border hover:bg-brand-text-muted'
                    }`}
                    aria-label={`Go to review ${index + 1}`}
                  />
                ))}
              </div>
            </div>
          </div>
        )}

        {/* See All Reviews Link */}
        <Button
          href="https://www.google.com/search?q=Litchfield+Perk+Litchfield+Park+reviews"
          target="_blank"
          rel="noopener noreferrer"
          variant="ghost"
          size="default"
          onClick={() => analytics.trackContactConversion('google_reviews', 'reviews_section')}
          className="inline-flex items-center gap-2"
          aria-label="See all reviews on Google - Opens in new tab"
        >
          See all on Google
          <ExternalLink size={16} aria-hidden="true" />
        </Button>
      </Container>
    </Section>
  );
}