import React, { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import InstagramWidget from "../widgets/InstagramWidget";
import { Section, Container, Button } from "../ui";
import analytics from "../../utils/analytics";

// Constants
const INSTAGRAM_HANDLE = "@litchfieldperk";
const INSTAGRAM_URL = "https://www.instagram.com/litchfieldperk/";

export default function InstagramSection() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      {
        rootMargin: "200px", // Start loading 200px before it's visible
        threshold: 0.1, // Trigger when 10% is visible
      },
    );

    if (ref.current) {
      io.observe(ref.current);
    }

    return () => io.disconnect();
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
        <div className="mb-10">
          <h2 className="text-section-title text-brand-text mb-5 text-center">
            Follow Us
          </h2>
          <p className="text-body text-brand-text-muted mb-0 max-w-3xl mx-auto">
            See what's brewing on Instagram
          </p>
        </div>

        {/* Vibe Gallery: up to 3 per row with soft borders and rounded-2xl */}
        {!ready ? (
          <div className="h-100 bg-brand-background-dark rounded-2xl flex items-center justify-center mx-auto max-w-2xl relative overflow-hidden ring-1 ring-brand-border">
            {/* Animated loading skeleton */}
            <div className="flex flex-col items-center gap-4">
              <div className="w-12 h-12 bg-brand-border rounded-full animate-pulse-soft" />
              <div className="w-50 h-5 bg-brand-border rounded animate-pulse-soft" />
              <div className="w-38 h-4 bg-brand-border rounded animate-pulse-soft" />
            </div>

            {/* Instagram grid skeleton */}
            <div className="absolute bottom-5 left-5 right-5 grid grid-cols-3 gap-2">
              {[1, 2, 3].map((i) => (
                <div
                  key={i}
                  className="aspect-square bg-brand-border rounded-2xl animate-pulse-soft"
                />
              ))}
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-1 md:grid-cols-1">
            <InstagramWidget
              cardClassName="rounded-2xl ring-1 ring-brand-border overflow-hidden"
              maxPerRow={3}
            />
          </div>
        )}

        <Button
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          variant="primary"
          size="default"
          onClick={() => analytics.trackInstagramFollow("instagram_section")}
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
