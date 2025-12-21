/**
 * HeroSection Component
 *
 * Main hero banner featuring the cafe logo, tagline, and primary call-to-action.
 * Includes quick info card for hours, location, and social media links.
 *
 * TYPOGRAPHY FIX (2024):
 * - Restored "Welcome to" font styling to use header font family (Caveat) for Friends-style look
 * - "Welcome" uses display-hero class with full styling (font-family, weight, tracking, size)
 * - "to" maintains header font family with relative sizing that scales responsively
 * - Both words now consistently use var(--font-family-header) for the Friends-themed typography
 *
 * @component
 */
import { Clock, MapPin, Instagram } from "lucide-react";
import { Container, Button } from "../ui";
import analytics from "../../utils/analytics";
import logoImage from "../../assets/logo-512.png";
import { BUSINESS_INFO } from "../../constants/business";

// Component constants
const INSTAGRAM_HANDLE = BUSINESS_INFO.social.instagram.handle;
const INSTAGRAM_URL = BUSINESS_INFO.social.instagram.url;
const HERO_LOGO_ALT =
  "Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience";

const PHONE_NUMBER = BUSINESS_INFO.contact.phone;
const ORDERING_URL = BUSINESS_INFO.contact.website;

export default function HeroSection() {
  return (
    <main
      id="main-content"
      className="bg-brand-background text-center p-0"
      aria-labelledby="hero-heading"
    >
      {/* Hero Banner */}
      <div className="bg-gradient-to-br from-brand-background-light to-brand-background-dark px-4 sm:px-5 pt-20 pb-10 relative overflow-hidden">
        {/* Botanical Pattern */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: "url(/botanical-pattern.png)",
            backgroundSize: "80% auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}
        />

        <Container className="relative z-10 w-full">
          {/* 
            Hero Vertical Rhythm System:
            - Uses space-y-* for consistent vertical spacing between elements
            - Mobile: space-y-5 (tighter for less scrolling)
            - Desktop: space-y-7 (more breathing room while maintaining hierarchy)
            - All elements centered with flex flex-col items-center
            - Intentional spacing between headline words, logo, tagline, and CTAs
          */}
          <div className="flex flex-col items-center text-center w-full space-y-5 sm:space-y-6 md:space-y-7">
            {/* Heading */}
            <h1
              id="hero-heading"
              className="display-hero text-brand-text"
            >
              Welcome
              <span className="block mt-1.5 sm:mt-2 text-[clamp(1.5rem,4vw,2.5rem)] font-bold leading-[1.1] tracking-[0.02em]">
                to
              </span>
            </h1>

            {/* Logo */}
            <img
              src={logoImage}
              alt={HERO_LOGO_ALT}
              width={320}
              height={320}
              className="h-32 sm:h-40 md:h-44 w-auto drop-shadow-md"
              loading="eager"
            />

            {/* Subtitle */}
            <p className="text-lg sm:text-xl md:text-2xl text-brand-text max-w-2xl mx-auto leading-relaxed px-4 body-text">
              The One Where You Get Great Coffee.
            </p>

            {/* CTA Buttons */}
            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
              {/* Menu */}
              <Button
                href="#menu"
                variant="filled"
                size="lg"
                onClick={() => analytics.trackCTAClick("menu", "hero")}
                className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5"
                aria-label="Browse our menu - View coffee, food, and specialty drinks"
              >
                Menu
              </Button>

              {/* Call – same style as Menu/Order so text is visible */}
              <Button
                href={"tel:" + PHONE_NUMBER}
                variant="filled"
                size="lg"
                onClick={() => analytics.trackCTAClick("call", "hero")}
                className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5"
                aria-label={"Call Litchfield Perk at " + PHONE_NUMBER}
              >
                Call
              </Button>

              {/* Order */}
              <Button
                href={ORDERING_URL}
                variant="filled"
                size="lg"
                onClick={() => analytics.trackCTAClick("order", "hero")}
                className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5"
                aria-label="Order online from Litchfield Perk"
              >
                Order
              </Button>
            </div>
          </div>

          {/* Info Card */}
          <div className="mx-auto max-w-5xl px-4 mt-6 sm:mt-8 md:mt-10">
              <div className="rounded-xl bg-white/90 backdrop-blur-sm border border-brand-border shadow-md px-5 py-4 sm:px-7 sm:py-5">
                <div className="grid gap-5 md:grid-cols-3">
                  {/* Hours */}
                  <div className="flex items-start gap-3 text-left">
                    <Clock className="mt-1 h-5 w-5 flex-shrink-0 text-brand-primary" />
                    <div className="text-xs sm:text-sm leading-snug text-brand-text">
                      <div className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-brand-primary/80 mb-1">
                        Hours
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div>Mon–Fri: 5:30 AM – 2:00 PM</div>
                        <div>Sat: 7:00 AM – 12:00 PM</div>
                        <div>Sun: Closed</div>
                      </div>
                    </div>
                  </div>

                  {/* Address */}
                  <a
                    href={
                      "https://maps.google.com/?q=" +
                      encodeURIComponent(BUSINESS_INFO.address.full)
                    }
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={
                      "Open directions to " +
                      BUSINESS_INFO.address.full +
                      " in your maps app"
                    }
                    className="flex items-start gap-3 text-left group cursor-pointer no-underline"
                  >
                    <MapPin className="mt-1 h-5 w-5 flex-shrink-0 text-brand-primary group-hover:text-brand-secondary transition-colors duration-200" />
                    <div className="text-xs sm:text-sm leading-snug text-brand-text group-hover:text-brand-secondary transition-colors duration-200">
                      <div className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-brand-primary/80 mb-1">
                        Visit us
                      </div>
                      <div className="flex flex-col gap-0.5">
                        <div>4870 N Litchfield Rd Suite 103</div>
                        <div>Litchfield Park, AZ 85340</div>
                      </div>
                    </div>
                  </a>

                  {/* Instagram */}
                  <a
                    href={INSTAGRAM_URL}
                    target="_blank"
                    rel="noopener noreferrer"
                    aria-label={"Follow " + INSTAGRAM_HANDLE + " on Instagram"}
                    className="flex items-start gap-3 text-left group cursor-pointer no-underline"
                  >
                    <Instagram className="mt-1 h-5 w-5 flex-shrink-0 text-brand-primary group-hover:text-brand-secondary transition-colors duration-200" />
                    <div className="text-xs sm:text-sm leading-snug text-brand-text group-hover:text-brand-secondary transition-colors duration-200">
                      <div className="text-[0.65rem] sm:text-[0.7rem] font-semibold uppercase tracking-[0.15em] text-brand-primary/80 mb-1">
                        Follow
                      </div>
                      <div>{INSTAGRAM_HANDLE}</div>
                    </div>
                  </a>
                </div>
              </div>
            </div>
        </Container>
      </div>
    </main>
  );
}
