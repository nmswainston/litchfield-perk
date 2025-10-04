import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight, ExternalLink } from "lucide-react";
import { getReviews } from "../../utils/reviews";

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
        console.error('Error loading reviews:', error);
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
    }
  };

  const prevReview = () => {
    if (reviews.length > 0) {
      setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
    }
  };

  const goToReview = (index) => {
    if (reviews.length > 0) {
      setCurrentIndex(index);
    }
  };

  const currentReview = reviews[currentIndex] || reviews[0];

  return (
    <section 
      id="reviews" 
      style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="reviews-heading"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Customer Reviews
          </h2>
          <p style={{ 
            color: '#333333', 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            See what our customers are saying about us
          </p>
        </div>

        {/* Reviews Carousel */}
        {isLoading ? (
          <div style={{
            maxWidth: '800px',
            margin: '0 auto 40px auto',
            backgroundColor: '#ffffff',
            borderRadius: '20px',
            padding: '40px',
            boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
            textAlign: 'center'
          }}>
            <div style={{
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              height: '200px',
              fontSize: '18px',
              color: '#666666'
            }}>
              Loading reviews...
            </div>
          </div>
        ) : (
          <div 
            style={{
              position: 'relative',
              maxWidth: '800px',
              margin: '0 auto 40px auto',
              backgroundColor: '#ffffff',
              borderRadius: '20px',
              padding: '40px',
              boxShadow: '0 12px 32px rgba(0, 0, 0, 0.1)',
              overflow: 'hidden'
            }}
            onMouseEnter={() => setIsPaused(true)}
            onMouseLeave={() => setIsPaused(false)}
          >
          {/* Navigation Arrows */}
          <button
            onClick={prevReview}
            className="touch-target"
            style={{
              position: 'absolute',
              left: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#00a070',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#008060';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00a070';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
            aria-label="Previous review"
          >
            <ChevronLeft size={20} />
          </button>

          <button
            onClick={nextReview}
            className="touch-target"
            style={{
              position: 'absolute',
              right: '20px',
              top: '50%',
              transform: 'translateY(-50%)',
              backgroundColor: '#00a070',
              color: '#ffffff',
              border: 'none',
              borderRadius: '50%',
              width: '48px',
              height: '48px',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              cursor: 'pointer',
              transition: 'all 0.2s ease',
              zIndex: 2
            }}
            onMouseEnter={(e) => {
              e.target.style.backgroundColor = '#008060';
              e.target.style.transform = 'translateY(-50%) scale(1.1)';
            }}
            onMouseLeave={(e) => {
              e.target.style.backgroundColor = '#00a070';
              e.target.style.transform = 'translateY(-50%) scale(1)';
            }}
            aria-label="Next review"
          >
            <ChevronRight size={20} />
          </button>

          {/* Review Content */}
          <div style={{ padding: '0 60px' }}>
            {/* Stars */}
            <div style={{ 
              display: 'flex', 
              justifyContent: 'center', 
              marginBottom: '24px' 
            }}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  size={24}
                  style={{
                    color: '#fbbf24',
                    fill: '#fbbf24',
                    margin: '0 2px'
                  }}
                />
              ))}
            </div>

            {/* Review Text */}
            <blockquote style={{
              fontSize: '18px',
              lineHeight: '1.7',
              color: '#333333',
              fontStyle: 'italic',
              marginBottom: '32px',
              minHeight: '120px',
              display: 'flex',
              alignItems: 'center'
            }}>
              "{currentReview.text}"
            </blockquote>

            {/* Customer Info */}
            <div style={{
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              gap: '16px'
            }}>
              {/* Avatar Circle */}
              <div style={{
                width: '60px',
                height: '60px',
                borderRadius: '50%',
                backgroundColor: '#00a070',
                color: '#ffffff',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                fontSize: '20px',
                fontWeight: '700',
                flexShrink: 0
              }}>
                {currentReview.avatar}
              </div>

              <div style={{ textAlign: 'left' }}>
                <div style={{
                  fontSize: '18px',
                  fontWeight: '700',
                  color: '#000000',
                  marginBottom: '4px'
                }}>
                  {currentReview.name}
                </div>
                <div style={{
                  fontSize: '14px',
                  color: '#666666'
                }}>
                  {currentReview.date}
                </div>
              </div>
            </div>
          </div>

          {/* Dots Indicator */}
          <div style={{
            display: 'flex',
            justifyContent: 'center',
            gap: '8px',
            marginTop: '32px'
          }}>
            {reviews.map((_, index) => (
              <button
                key={index}
                onClick={() => goToReview(index)}
                className="touch-target"
                style={{
                  width: '12px',
                  height: '12px',
                  borderRadius: '50%',
                  border: 'none',
                  backgroundColor: index === currentIndex ? '#00a070' : '#e0e0e0',
                  cursor: 'pointer',
                  transition: 'all 0.2s ease'
                }}
                onMouseEnter={(e) => {
                  if (index !== currentIndex) {
                    e.target.style.backgroundColor = '#b0b0b0';
                  }
                }}
                onMouseLeave={(e) => {
                  if (index !== currentIndex) {
                    e.target.style.backgroundColor = '#e0e0e0';
                  }
                }}
                aria-label={`Go to review ${index + 1}`}
              />
            ))}
          </div>
        </div>
        )}

        {/* See All Reviews Link */}
        <a
          href="https://www.google.com/search?q=Litchfield+Perk+Litchfield+Park+reviews"
          target="_blank"
          rel="noopener noreferrer"
          className="btn-primary touch-target"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00a070',
            color: '#ffffff',
            padding: '14px 28px',
            borderRadius: '12px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            transition: 'all 0.2s ease',
            minHeight: '44px',
            minWidth: '44px'
          }}
          onMouseEnter={(e) => {
            e.target.style.backgroundColor = '#008060';
            e.target.style.transform = 'translateY(-2px)';
            e.target.style.boxShadow = '0 8px 20px rgba(0, 160, 112, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.backgroundColor = '#00a070';
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
          aria-label="See all reviews on Google - Opens in new tab"
        >
          <Star size={18} aria-hidden="true" />
          See all on Google
          <ExternalLink size={16} aria-hidden="true" />
        </a>
      </div>
    </section>
  );
}
