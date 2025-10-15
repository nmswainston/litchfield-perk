import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { Section, Container, Button } from "../ui";

// Constants
const BUSINESS_ADDRESS =
  "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340";
const PHONE_NUMBER = "(480) 823-4073";
const GOOGLE_STATIC_MAPS_KEY = import.meta.env.VITE_GOOGLE_MAPS_STATIC_KEY;
const STATIC_MAP_ZOOM = 15;

export default function VisitSection() {
  const staticMapUrl = GOOGLE_STATIC_MAPS_KEY
    ? `https://maps.googleapis.com/maps/api/staticmap?center=${encodeURIComponent(
        BUSINESS_ADDRESS
      )}&zoom=${STATIC_MAP_ZOOM}&size=1200x600&scale=2&maptype=roadmap&markers=color:red%7C${encodeURIComponent(
        BUSINESS_ADDRESS
      )}&key=${GOOGLE_STATIC_MAPS_KEY}`
    : null;
  return (
    <Section
      id="visit"
      background="white"
      padding="lg"
      aria-labelledby="visit-heading"
    >
      <Container>
        <div className="mb-8 sm:mb-10">
          <h2 className="text-section-title text-brand-text mb-4 sm:mb-5 text-center px-4">
            Visit Us
          </h2>
          <p className="text-body text-brand-text-muted mb-0 max-w-3xl mx-auto px-4">
            Come experience the Litchfield Perk difference
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 container-narrow">
          {/* Location and Contact tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="card-light p-6 sm:p-8 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-subheading text-brand-text mb-1">
                  Location
                </h3>
                <p className="text-body text-brand-text-light m-0">
                  {BUSINESS_ADDRESS}
                </p>
              </div>

              <Button
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="secondary"
                size="default"
                className="w-full text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4 h-12 mt-auto"
                aria-label="Get directions to Litchfield Perk - Opens in new tab"
              >
                Get Directions
              </Button>
            </div>

            <div className="card-light p-6 sm:p-8 h-full flex flex-col">
              <div className="mb-6">
                <h3 className="text-subheading text-brand-text mb-1">
                  Contact
                </h3>
                <p className="text-body text-brand-text-light m-0">
                  Call us for questions or to place an order
                </p>
              </div>

              <Button
                href={`tel:${PHONE_NUMBER}`}
                variant="secondary"
                size="default"
                className="w-full text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4 h-12 gap-0 mt-auto"
                aria-label={`Call Litchfield Perk at ${PHONE_NUMBER}`}
              >
                {PHONE_NUMBER}
              </Button>
            </div>
          </div>

          {/* Static Map Preview */}
          <a
            href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Open Google Maps for ${BUSINESS_ADDRESS}`}
            className="block group"
          >
            {staticMapUrl ? (
              <img
                src={staticMapUrl}
                alt={`Map showing the location: ${BUSINESS_ADDRESS}`}
                className="w-full h-auto rounded-2xl ring-1 ring-brand-border shadow-soft"
                style={{ maxHeight: 280, objectFit: "cover" }}
                loading="lazy"
              />
            ) : (
              <div
                className="relative overflow-hidden rounded-2xl ring-1 ring-brand-border shadow-soft"
                style={{ height: 280, background: "#E9E5DA" }}
              >
                {/* Simple lightweight map-like grid */}
                <div
                  aria-hidden="true"
                  className="absolute inset-0 opacity-40"
                  style={{
                    backgroundImage:
                      "linear-gradient(0deg, rgba(0,0,0,0.05) 1px, transparent 1px), linear-gradient(90deg, rgba(0,0,0,0.05) 1px, transparent 1px)",
                    backgroundSize: "36px 36px",
                  }}
                />
                {/* Decorative roads */}
                <div
                  aria-hidden="true"
                  className="absolute -inset-10 rotate-6 opacity-30"
                  style={{
                    backgroundImage:
                      "repeating-linear-gradient(90deg, rgba(0,0,0,0.08) 0 2px, transparent 2px 18px)",
                    maskImage:
                      "radial-gradient(80% 40% at 50% 60%, black 60%, transparent 70%)",
                  }}
                />

                {/* Pin */}
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="flex items-center gap-2 bg-white/90 backdrop-blur px-4 py-2 rounded-full ring-1 ring-brand-border shadow-sm group-hover:shadow-md transition-shadow">
                    <MapPin className="w-4 h-4 text-brand-primary" />
                    <span className="text-sm text-brand-text">Open in Google Maps</span>
                  </div>
                </div>
              </div>
            )}
          </a>
        </div>
      </Container>
    </Section>
  );
}
