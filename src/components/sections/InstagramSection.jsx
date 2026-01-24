import { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import InstagramWidget from "../widgets/InstagramWidget";
import { Section, Container, Button, SectionShell } from "../ui";
import analytics from "../../utils/analytics";
import { INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../../constants/business";

const INTERSECTION_ROOT_MARGIN = "200px";
const INTERSECTION_THRESHOLD = 0.1;
const SKELETON_GRID_ITEMS = 6;

export default function InstagramSection() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    // Safari compatibility: IntersectionObserver supported in Safari 12.1+
    if (typeof IntersectionObserver === 'undefined') {
      // Fallback for very old browsers: show content immediately
      setReady(true);
      return;
    }
    
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
        <SectionShell
          title="Follow Us"
          titleId="instagram-heading"
          subhead="See what's brewing on Instagram"
          align="center"
          divider={false}
          className="mb-8 sm:mb-10"
        >
          {/* Vibe Gallery: up to 3 per row with soft borders and rounded-xl */}
        {!ready ? (
          <div className="bg-brand-background-dark rounded-xl mx-auto max-w-2xl relative overflow-hidden ring-1 ring-brand-border">
            {/* Main skeleton container */}
            <div className="p-8 sm:p-10">
              {/* Top loading indicator */}
              <div className="flex flex-col items-center gap-4 mb-6 sm:mb-8">
                <div className="w-12 h-12 bg-brand-border/40 rounded-full skeleton-shimmer" />
                <div className="h-5 w-48 bg-brand-border/40 rounded skeleton-shimmer" />
                <div className="h-4 w-36 bg-brand-border/30 rounded skeleton-shimmer" />
              </div>
              <div className="grid grid-cols-3 gap-2 sm:gap-3">
                {Array.from({ length: SKELETON_GRID_ITEMS }, (_, i) => (
                  <div
                    key={i}
                    className="aspect-square bg-brand-border/30 rounded-lg sm:rounded-xl overflow-hidden relative"
                    style={{ 
                      animationDelay: `${(i + 1) * 0.08}s` 
                    }}
                  >
                    <div className="absolute inset-0 skeleton-shimmer bg-gradient-to-br from-brand-border/30 via-brand-border/20 to-brand-border/30" />
                    <div className="absolute inset-0 bg-gradient-to-br from-transparent via-transparent to-brand-border/10" />
                  </div>
                ))}
              </div>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
            <InstagramWidget cardClassName="rounded-xl ring-1 ring-brand-border overflow-hidden" />
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
        </SectionShell>
      </Container>
    </Section>
  );
}