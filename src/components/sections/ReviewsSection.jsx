import React, { useState, useEffect, useRef } from "react";
import { Star, ChevronLeft, ChevronRight } from "lucide-react";

// Sample reviews data
const reviews = [
  {
    id: 1,
    name: "Alexandria A.",
    rating: 5,
    text: "First time trying. Will definitely be back. Tried one of their cold brew and their specialty latte. Both were super good. I'm always hesitant to try new coffee because I like my coffee to actually taste like coffee, not sugary milk. I was very pleased and highly recommend it.",
    avatar: "AA",
    date: "2 weeks ago"
  },
  {
    id: 2,
    name: "Skylar W.",
    rating: 5,
    text: "My boyfriend and I visited Litchfield Perk, and the cold brew here quickly moved into his top 3 in the state. Personally, I loved the added touch of the chocolate espresso bean with the drink, and the pastries here are the best I've ever had.",
    avatar: "SW",
    date: "1 month ago"
  },
  {
    id: 3,
    name: "Michael R.",
    rating: 5,
    text: "Amazing coffee and atmosphere! The baristas are friendly and the pastries are fresh. Perfect spot to work or catch up with friends. Highly recommend the Central Perk Special!",
    avatar: "MR",
    date: "3 weeks ago"
  },
  {
    id: 4,
    name: "Sarah L.",
    rating: 5,
    text: "Best coffee in Litchfield Park! The cold brew is smooth and the specialty drinks are creative. The staff remembers your order and makes you feel like family. Love this place!",
    avatar: "SL",
    date: "1 week ago"
  },
  {
    id: 5,
    name: "David K.",
    rating: 5,
    text: "Great coffee, great vibes! The botanical pattern and cozy seating make it the perfect place to relax. The menu has something for everyone and the quality is consistently excellent.",
    avatar: "DK",
    date: "2 weeks ago"
  }
];

export default function ReviewsSection() {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const intervalRef = useRef(null);

  // Auto-advance every 6 seconds
  useEffect(() => {
    if (!isPaused) {
      intervalRef.current = setInterval(() => {
        setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
      }, 6000);
    } else {
      clearInterval(intervalRef.current);
    }

    return () => clearInterval(intervalRef.current);
  }, [isPaused]);

  const nextReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex + 1) % reviews.length);
  };

  const prevReview = () => {
    setCurrentIndex((prevIndex) => (prevIndex - 1 + reviews.length) % reviews.length);
  };

  const goToReview = (index) => {
    setCurrentIndex(index);
  };

  const currentReview = reviews[currentIndex];

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
        </a>
      </div>
    </section>
  );
}
