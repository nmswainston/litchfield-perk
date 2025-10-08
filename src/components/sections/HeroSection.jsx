import React from "react";
import { Clock, MapPin, Instagram } from "lucide-react";
import { ResponsiveImage, Pill, Section, Container, Button } from "../ui";
import analytics from "../../utils/analytics";

// Constants
const BUSINESS_ADDRESS =
  "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340";
const INSTAGRAM_HANDLE = "@litchfieldperk";
const INSTAGRAM_URL = "https://www.instagram.com/litchfieldperk/";

export default function HeroSection() {
  return (
    <main
      id="main-content"
      className="bg-brand-background text-center p-0"
      aria-labelledby="hero-heading"
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-brand-background-light to-brand-background-dark min-h-screen flex items-center justify-center px-4 sm:px-5 relative overflow-hidden">
        {/* Botanical Pattern Background for header absorption */}
        <div className="absolute inset-0 opacity-30 mix-blend-multiply bg-botanical" />

        <Container className="relative z-10 w-full">
          <div className="text-center w-full animate-fade-in-up">
            {/* Visible hero heading using auditionable header font */}
            <h1
              id="hero-heading"
              className="text-hero-heading text-brand-text mb-1 sm:mb-2"
            >
              Welcome
              <span className="text-section-title">to</span>
            </h1>
            {/* Logo */}
            <ResponsiveImage
              src="/logo-512.png"
              alt="Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience"
              dimensions={{ width: 400, height: 400 }}
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto mt-1 sm:mt-2 mb-3 sm:mb-5 drop-shadow-lg"
              loading="eager"
              sizes={{ mobile: "256px", desktop: "400px" }}
            />
            {/* Subtitle */}
            <p
              className="text-body text-brand-text mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4 animate-fade-in-up"
              style={{ animationDelay: "0.4s" }}
            >
              The One Where You Get Great Coffee.
            </p>

            {/* Single primary CTA */}
            <div
              className="flex items-center justify-center mb-5 sm:mb-6 px-4 animate-fade-in-up"
              style={{ animationDelay: "0.6s" }}
            >
              <Button
                href="#menu"
                variant="filled"
                size="lg"
                onClick={() => analytics.trackCTAClick("shop_now", "hero")}
                className="sm:min-w-44 btn-mobile text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4"
                aria-label="Browse our menu - View coffee, food, and specialty drinks"
              >
                <span className="clamp-2-mobile">Menu</span>
              </Button>
            </div>

            {/* Quick Info Pills */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4 text-center">
              {/* Hours pill - unified stacked layout across all breakpoints */}
              <div className="pill-hero pill-mobile transition-colors duration-200 w-fit mx-auto sm:w-auto">
                <div className="flex items-center justify-center gap-2">
                  <Clock className="w-4 h-4 opacity-80 flex-shrink-0" />
                  <div className="text-center">
                    <div className="leading-tight">
                      <div>Mon-Fri: 6AM-2PM</div>
                      <div>Sat: 7AM-12PM • Sun: Closed</div>
                    </div>
                  </div>
                </div>
              </div>
              {/* Address pill - unified stacked layout across all breakpoints */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open directions to ${BUSINESS_ADDRESS} in your maps app`}
                className="pill-hero pill-mobile focus-ring"
              >
                <div className="flex items-center justify-center gap-2">
                  <MapPin className="w-4 h-4 opacity-80" />
                  <div className="text-center leading-tight">
                    <div>4870 N Litchfield Rd Ste 103</div>
                    <div>Litchfield Park, AZ 85340</div>
                  </div>
                </div>
              </a>
              <Pill
                icon={<Instagram className="w-4 h-4" />}
                text={INSTAGRAM_HANDLE}
                href={INSTAGRAM_URL}
                className="pill-hero text-center hover:bg-brand-primary hover:text-brand-secondary"
              />
            </div>
          </div>
        </Container>
      </div>
    </main>
  );
}
