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
import { Button, HeroShell } from "../ui";
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
    <HeroShell
      id="main-content"
      ariaLabelledBy="hero-heading"
      bottomContent={
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
      }
    >
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
        className="h-40 sm:h-48 md:h-56 w-auto drop-shadow-md"
        loading="eager"
      />

      {/* Subtitle */}
      <p className="text-lg sm:text-xl md:text-2xl text-brand-text max-w-2xl mx-auto leading-relaxed px-4 body-text">
        The One Where You Get Great Coffee.
      </p>

      {/* CTA Buttons - Mobile-first hierarchy */}
      <div className="w-full px-4 mt-10 sm:mt-6">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-4 max-w-2xl mx-auto">
          {/* Mobile: Stacked vertical layout with clear hierarchy */}
          {/* Desktop: Horizontal layout (unchanged) */}
          
          {/* Order - Primary CTA */}
          <Button
            href={ORDERING_URL}
            variant="filled"
            size="lg"
            onClick={() => analytics.trackCTAClick("order", "hero")}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5 h-[54px] sm:h-auto rounded-xl sm:rounded-lg"
            aria-label="Order online from Litchfield Perk"
          >
            Order
          </Button>

          {/* Menu - Secondary CTA */}
          <Button
            href="#menu"
            variant="secondary"
            size="lg"
            onClick={() => analytics.trackCTAClick("menu", "hero")}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5 h-[46px] sm:h-auto rounded-xl sm:rounded-lg mt-5 sm:mt-0"
            aria-label="Browse our menu - View coffee, food, and specialty drinks"
          >
            Menu
          </Button>

          {/* Call - Secondary CTA */}
          <Button
            href={"tel:" + PHONE_NUMBER}
            variant="secondary"
            size="lg"
            onClick={() => analytics.trackCTAClick("call", "hero")}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5 h-[46px] sm:h-auto rounded-xl sm:rounded-lg mt-2.5 sm:mt-0"
            aria-label={"Call Litchfield Perk at " + PHONE_NUMBER}
          >
            Call
          </Button>
        </div>
      </div>
    </HeroShell>
  );
}
