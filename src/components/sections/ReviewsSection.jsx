import { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getReviews } from "../../utils/reviews";
import { Section, Container, Button, SectionShell } from "../ui";
import analytics from "../../utils/analytics";

const AUTO_ADVANCE_INTERVAL = 6000;
const MIN_SWIPE_DISTANCE = 50;
const SKELETON_REVIEW_COUNT = 4;

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [isExpanded, setIsExpanded] = useState(false);
  const intervalRef = useRef(null);
  const touchStartX = useRef(0);
  const touchEndX = useRef(0);

  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch {
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

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
      setIsExpanded(false); // Reset expanded state when changing reviews
      analytics.trackReviewNavigation('next', (currentIndex + 1) % reviews.length);
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
      setIsExpanded(false); // Reset expanded state when changing reviews
      analytics.trackReviewNavigation('prev', (currentIndex - 1 + reviews.length) % reviews.length);
    }
  };

  const goToReview = (index) => {
    if (reviews.length > 0) {
      setCurrentIndex(index);
      setIsExpanded(false); // Reset expanded state when changing reviews
      analytics.trackReviewNavigation('dot_click', index);
    }
  };

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
      nextReview();
    } else if (distance < -MIN_SWIPE_DISTANCE) {
      prevReview();
    }

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
        <SectionShell
          title="Customer Reviews"
          titleId="reviews-heading"
          subhead="See what our customers are saying about us"
          align="center"
          divider={false}
          className="mb-8 sm:mb-10"
        >
        {isLoading ? (
          <div className="relative max-w-4xl mx-auto mb-10 bg-brand-background rounded-2xl p-5 sm:p-8 md:p-10 shadow-md border border-brand-border/20 overflow-hidden">
            <div className="px-4 sm:px-8 md:px-12 lg:px-16">
              <div className="relative mb-6 sm:mb-8 min-h-[120px] flex items-center">
                <div className="absolute -left-2 sm:-left-4 -top-4 w-12 h-12 sm:w-16 sm:h-16 bg-brand-border/30 rounded-full animate-pulse-soft" />
                <div className="absolute -right-2 sm:-right-4 -bottom-8 w-12 h-12 sm:w-16 sm:h-16 bg-brand-border/30 rounded-full animate-pulse-soft" />
                <div className="relative z-10 mx-auto max-w-prose sm:max-w-[38ch] w-full space-y-3">
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '100%' }} />
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '95%' }} />
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '80%' }} />
                  <div className="h-4 bg-brand-border/40 rounded skeleton-shimmer" style={{ width: '60%' }} />
                </div>
              </div>

              <div className="flex items-center justify-center gap-4 sm:gap-6">
                <div className="w-14 h-14 sm:w-16 sm:h-16 bg-brand-border/40 rounded-full skeleton-shimmer flex-shrink-0" />
                <div className="text-left space-y-2">
                  <div className="h-5 w-32 bg-brand-border/40 rounded skeleton-shimmer" />
                  <div className="h-4 w-24 bg-brand-border/30 rounded skeleton-shimmer" />
                </div>
              </div>

              <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
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
        ) : reviews.length === 0 ? (
          <div className="relative max-w-4xl mx-auto mb-10 bg-brand-background rounded-2xl p-5 sm:p-8 md:p-10 shadow-md border border-brand-border/20 overflow-hidden">
            <div className="text-center py-8 px-4">
              <p className="text-base sm:text-lg text-brand-text-muted leading-relaxed">
                No reviews available at this time. Check back soon!
              </p>
            </div>
          </div>
        ) : (
          <div 
            className="relative max-w-4xl mx-auto mb-10 bg-brand-background rounded-2xl p-5 sm:p-8 md:p-10 shadow-md border border-brand-border/20 overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
            onFocus={() => setIsPaused(true)}
            onBlur={() => setIsPaused(false)}
            onTouchStart={handleTouchStart}
            onTouchMove={handleTouchMove}
            onTouchEnd={handleTouchEnd}
          >
            {/* Desktop navigation buttons - absolute positioned on md+ */}
            <button
              onClick={prevReview}
              className="review-nav-btn review-nav-btn--desktop absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full p-0 z-10 hidden md:inline-flex"
              aria-label="Previous review"
            >
              <ChevronLeft size={20} />
            </button>

            <button
              onClick={nextReview}
              className="review-nav-btn review-nav-btn--desktop absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 rounded-full p-0 z-10 hidden md:inline-flex"
              aria-label="Next review"
            >
              <ChevronRight size={20} />
            </button>

            <div className="px-4 sm:px-8 md:px-12 lg:px-16">
              {/* A) Review quote text */}
              <blockquote className="relative text-base sm:text-lg text-brand-text-light italic mb-6 sm:mb-8 leading-relaxed sm:leading-7">
                <span className="absolute -left-2 sm:-left-4 -top-4 text-5xl sm:text-6xl leading-none text-brand-accent select-none opacity-60" aria-hidden>“</span>
                <span className="absolute -right-2 sm:-right-4 -bottom-8 text-5xl sm:text-6xl leading-none text-brand-accent select-none opacity-60" aria-hidden>”</span>
                <div className="relative z-10 mx-auto max-w-none sm:max-w-[38ch]">
                  <p className={isExpanded ? "" : "line-clamp-6 sm:line-clamp-none"}>
                    {currentReview.text}
                  </p>
                  {currentReview.text && currentReview.text.length > 200 && (
                    <button
                      onClick={() => setIsExpanded(!isExpanded)}
                      className="mt-3 text-sm text-brand-primary hover:text-brand-accent font-medium transition-colors sm:hidden"
                      aria-expanded={isExpanded}
                    >
                      {isExpanded ? "Read less" : "Read more"}
                    </button>
                  )}
                </div>
              </blockquote>

              {/* B) Controls row - mobile only, centered above reviewer */}
              <div className="mt-6 flex items-center justify-center gap-4 md:hidden">
                <button
                  onClick={prevReview}
                  className="review-nav-btn w-12 h-12 rounded-full p-0 flex items-center justify-center"
                  aria-label="Previous review"
                >
                  <ChevronLeft size={20} />
                </button>

                <button
                  onClick={nextReview}
                  className="review-nav-btn w-12 h-12 rounded-full p-0 flex items-center justify-center"
                  aria-label="Next review"
                >
                  <ChevronRight size={20} />
                </button>
              </div>

              {/* C) Reviewer attribution - with margin after controls on mobile */}
              <div className="flex items-center justify-center gap-4 sm:gap-6 mt-4 md:mt-0">
                <div className="w-14 h-14 sm:w-16 sm:h-16 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center text-lg sm:text-xl font-bold flex-shrink-0">
                  {currentReview.avatar}
                </div>

                <div className="text-left">
                  <div className="text-base sm:text-lg text-brand-text mb-1 font-semibold">
                    {currentReview.name}
                  </div>
                  <div className="text-sm sm:text-base text-brand-text-muted leading-relaxed">
                    {currentReview.date}
                  </div>
                </div>
              </div>

              {/* D) Pagination dots */}
              <div className="flex justify-center gap-2 sm:gap-3 mt-6 sm:mt-8">
                {reviews.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => goToReview(index)}
                    className={`rounded-full border-none cursor-pointer transition-all duration-200
                      w-2 h-2 sm:w-3 sm:h-3
                      ${
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
        </SectionShell>

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