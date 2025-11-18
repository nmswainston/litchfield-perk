import React, { useState, useEffect, useRef } from "react";
import { ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getReviews } from "../../utils/reviews";
import { Section, Container, Button } from "../ui";
import analytics from "../../utils/analytics";

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const [reviews, setReviews] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const intervalRef = useRef(null);

  // Load reviews on component mount
  useEffect(() => {
    const loadReviews = async () => {
      setIsLoading(true);
      try {
        const reviewsData = await getReviews();
        setReviews(reviewsData);
      } catch (error) {
        console.error("Error loading reviews:", error);
      } finally {
        setIsLoading(false);
      }
    };

    loadReviews();
  }, []);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isPaused && reviews.length > 0) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 6000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused, reviews.length]);

  const nextReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      analytics.trackReviewNavigation(
        "next",
        (currentIndex + 1) % reviews.length,
      );
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex(
        (prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length,
      );
      analytics.trackReviewNavigation(
        "prev",
        (currentIndex - 1 + reviews.length) % reviews.length,
      );
    }
  };

  const goToReview = (index) => {
    if (reviews.length > 0) {
      setCurrentIndex(index);
      analytics.trackReviewNavigation("dot_click", index);
    }
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
        <div className="mb-12">
          <h2 className="text-section-title text-brand-text mb-5 text-center">
            Customer Reviews
          </h2>
          <p className="text-body text-brand-text-light mb-0 max-w-3xl mx-auto">
            See what our customers are saying about us
          </p>
        </div>

        {/* Reviews Carousel */}
        {isLoading ? (
          <div className="container-narrow mb-10 bg-brand-background rounded-3xl p-10 text-center shadow-soft">
            <div className="flex justify-center items-center h-50 text-lg text-brand-text-muted">
              Loading reviews...
            </div>
          </div>
        ) : (
          <div
            className="relative container-narrow mb-10 bg-brand-background rounded-3xl p-10 shadow-soft overflow-hidden"
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
            {/* Navigation Arrows */}
            <Button
              onClick={prevReview}
              variant="icon"
              size="none"
              className="btn-circle absolute left-5 top-1/2 -translate-y-1/2 w-12 h-12 z-10"
              aria-label="Previous review"
            >
              <ChevronLeft size={18} color="currentColor" />
            </Button>

            <Button
              onClick={nextReview}
              variant="icon"
              size="none"
              className="btn-circle absolute right-5 top-1/2 -translate-y-1/2 w-12 h-12 z-10"
              aria-label="Next review"
            >
              <ChevronRight size={18} color="currentColor" />
            </Button>

            {/* Review Content */}
            <div className="px-15">
              {/* Review Text */}
              <blockquote className="relative text-body text-brand-text-light italic mb-8 min-h-30 flex items-center">
                <span
                  className="absolute -left-4 -top-4 text-6xl leading-none text-brand-accent select-none"
                  aria-hidden
                >
                  “
                </span>
                <span
                  className="absolute -right-4 -bottom-8 text-6xl leading-none text-brand-accent select-none"
                  aria-hidden
                >
                  ”
                </span>
                <span className="relative z-10">{`"${currentReview.text}"`}</span>
              </blockquote>

              {/* Customer Info */}
              <div className="flex items-center justify-center gap-4">
                {/* Avatar Circle */}
                <div className="w-15 h-15 rounded-full bg-brand-primary text-brand-secondary flex items-center justify-center text-xl font-bold flex-shrink-0">
                  {currentReview.avatar}
                </div>

                <div className="text-left">
                  <div className="text-subheading text-brand-text mb-1">
                    {currentReview.name}
                  </div>
                  <div className="text-body text-brand-text-muted">
                    {currentReview.date}
                  </div>
                </div>
              </div>

              {/* Dots Indicator */}
              <div className="flex justify-center gap-2 mt-8">
                {reviews.map((_, index) => {
                  const isActive = index === currentIndex;
                  return (
                    <button
                      key={index}
                      onClick={() => goToReview(index)}
                      className="touch-target p-0 bg-transparent border-none cursor-pointer"
                      aria-label={`Go to review ${index + 1}`}
                      aria-current={isActive ? "true" : undefined}
                    >
                      <span
                        className={`block w-3 h-3 rounded-full transition-all duration-200 ${
                          isActive
                            ? "bg-brand-primary"
                            : "bg-brand-border hover:bg-brand-text-muted"
                        }`}
                      />
                    </button>
                  );
                })}
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
          onClick={() =>
            analytics.trackContactConversion(
              "google_reviews",
              "reviews_section",
            )
          }
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
