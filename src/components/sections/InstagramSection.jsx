/**
 * InstagramSection Component
 * 
 * Displays Instagram feed widget with lazy loading using Intersection Observer.
 * Shows skeleton loading state until the widget is ready to render.
 * Includes follow button with analytics tracking.
 * 
 * @component
 */
import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import InstagramWidget from "../widgets/InstagramWidget";
import { Section, Container, Button } from "../ui";
import analytics from "../../utils/analytics";
import { BUSINESS_INFO } from "../../constants/business";

// Constants
const INSTAGRAM_HANDLE = BUSINESS_INFO.social.instagram.handle;
const INSTAGRAM_URL = BUSINESS_INFO.social.instagram.url;
const INTERSECTION_ROOT_MARGIN = "200px"; // Start loading 200px before visible
const INTERSECTION_THRESHOLD = 0.1; // Trigger when 10% is visible
const SKELETON_GRID_ITEMS = 6;

export default function InstagramSection() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          observer.disconnect();
        }
      },
      { 
        rootMargin: INTERSECTION_ROOT_MARGIN,
        threshold: INTERSECTION_THRESHOLD
      }
    );
    
    if (ref.current) {
      observer.observe(ref.current);
    }
    
    return () => {
      observer.disconnect();
    };
  }, []);

  return (
    <Section 
      id="instagram" 
      ref={ref}
      background="white"
      padding="lg"
      aria-labelledby="instagram-heading"
    >
      <Container>
<<<<<<< HEAD
        <div className="mb-10 sm:mb-12">
          <h2 id="instagram-heading" className="section-title text-brand-text mb-4 text-center">
=======
        <div className="mb-8 sm:mb-10">
          <h2 className="section-title text-brand-text mb-4 sm:mb-5 text-center">
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
            Follow Us
          </h2>
          <p className="body-text text-brand-text-muted mb-0 max-w-3xl mx-auto">
            See what's brewing on Instagram
          </p>
        </div>
        
<<<<<<< HEAD
        {/* Vibe Gallery: up to 3 per row with soft borders and rounded-xl */}
        {!ready ? (
          <div className="bg-brand-background-dark rounded-xl mx-auto max-w-2xl relative overflow-hidden ring-1 ring-brand-border">
=======
        {/* Vibe Gallery: up to 3 per row with soft borders and rounded-2xl */}
        {!ready ? (
          <div className="bg-brand-background-dark rounded-2xl mx-auto max-w-2xl relative overflow-hidden ring-1 ring-brand-border">
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
            {/* Main skeleton container */}
            <div className="p-8 sm:p-10">
              {/* Top loading indicator */}
              <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 bg-brand-border/40 rounded-full skeleton-shimmer" />
                <div className="h-5 w-48 bg-brand-border/40 rounded skeleton-shimmer" />
                <div className="h-4 w-36 bg-brand-border/30 rounded skeleton-shimmer" />
              </div>
              
              {/* Instagram grid skeleton - matches actual widget layout */}
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {Array.from({ length: SKELETON_GRID_ITEMS }, (_, i) => (
                  <div
                    key={i}
<<<<<<< HEAD
                    className="aspect-square bg-brand-border/30 rounded-lg sm:rounded-xl overflow-hidden relative"
=======
                    className="aspect-square bg-brand-border/30 rounded-xl sm:rounded-2xl overflow-hidden relative"
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
                    style={{ animationDelay: `${(i + 1) * 0.08}s` }}
                  >
                    {/* Shimmer effect */}
                    <div className="absolute inset-0 skeleton-shimmer bg-gradient-to-br from-brand-border/30 via-brand-border/20 to-brand-border/30" />
                    {/* Subtle gradient overlay for depth */}
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-border/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
<<<<<<< HEAD
            <InstagramWidget cardClassName="rounded-xl ring-1 ring-brand-border overflow-hidden" maxPerRow={3} />
=======
            <InstagramWidget cardClassName="rounded-2xl ring-1 ring-brand-border overflow-hidden" maxPerRow={3} />
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
          </div>
        )}
        
        <Button
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noopener noreferrer"
          variant="primary"
          size="default"
          onClick={() => analytics.trackInstagramFollow('instagram_section')}
          className="inline-flex items-center gap-2 mt-6"
          aria-label={`Follow us on Instagram at ${INSTAGRAM_HANDLE} - Opens in new tab`}
        >
          <Instagram className="w-4 h-4" aria-hidden="true" /> 
          Follow {INSTAGRAM_HANDLE}
        </Button>
      </Container>
    </Section>
  );
}