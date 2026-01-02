/**
 * HeroSection Component
 *
 * Main hero banner featuring the cafe logo, tagline, and primary call-to-action.
 * Includes quick info card for hours, location, and social media links.
 *
 * TYPOGRAPHY FIX:
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
import { BUSINESS_INFO, APP_STORE_URL, PHONE_NUMBER, INSTAGRAM_HANDLE, INSTAGRAM_URL } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

// Component constants
const HERO_LOGO_ALT =
  "Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience";

export default function HeroSection() {
  return (
    <HeroShell
      id="main-content"
      className="bg-brand-background text-center p-0"
      aria-labelledby="hero-heading"
    >
      {/* Welcome text - Secondary supporting element */}
      {/* Desktop: Tighter spacing between "Welcome" and "to" */}
      <h1
        id="hero-heading"
        className="display-hero text-brand-text font-semibold md:text-[clamp(2rem,5vw,3.5rem)] lg:text-[clamp(2.25rem,5.5vw,4rem)]"
      >
        Welcome
        <span className="block mt-1.5 sm:mt-2 lg:mt-1 text-[clamp(1.25rem,3.5vw,2rem)] md:text-[clamp(1.5rem,4vw,2.5rem)] lg:text-[clamp(1.75rem,4.5vw,2.75rem)] font-semibold leading-[1.1] tracking-[0.02em]">
          to
        </span>
      </h1>

      {/* Logo - Primary visual anchor */}
      {/* Desktop: Slightly reduced size to prevent pushing content too far down */}
      <img
        src={logoImage}
        alt={HERO_LOGO_ALT}
        width={320}
        height={320}
        className="h-40 max-h-[180px] sm:h-56 sm:max-h-none md:h-[340px] lg:h-[320px] w-auto drop-shadow-md"
        loading="eager"
      />

      {/* Subtitle */}
      <p className="text-lg sm:text-xl md:text-xl lg:text-xl text-brand-text max-w-2xl mx-auto leading-relaxed px-4">
        The One Where You Get Great Coffee.
      </p>

      {/* CTA Buttons - Mobile-first hierarchy */}
      {/* Desktop: Reduced top margin for tighter spacing */}
      <div className="w-full px-4 mt-6 sm:mt-5 md:mt-3 lg:mt-2">
        <div className="flex flex-col sm:flex-row items-center justify-center gap-0 sm:gap-4 max-w-2xl mx-auto">
          {/* Mobile: Stacked vertical layout with clear hierarchy */}
          {/* Desktop: Horizontal layout (unchanged) */}
          
          {/* Get the App - Primary CTA */}
          <Button
            href={APP_STORE_URL}
            variant="filled"
            size="lg"
            onClick={() => {
              trackAppStoreClick("hero", APP_STORE_URL);
              analytics.trackCTAClick("app", "hero");
            }}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-2.5 sm:py-3.5 h-[48px] sm:h-auto rounded-xl sm:rounded-lg"
            aria-label="Get the Litchfield Perk app on Google Play"
            target="_blank"
            rel="noopener noreferrer"
          >
            Get the App
          </Button>

          {/* Menu - Secondary CTA */}
          <Button
            href="#menu"
            variant="secondary"
            size="lg"
            onClick={() => analytics.trackCTAClick("menu", "hero")}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-2.5 sm:py-3.5 h-[44px] sm:h-auto rounded-xl sm:rounded-lg mt-4 sm:mt-0"
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
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-2.5 sm:py-3.5 h-[44px] sm:h-auto rounded-xl sm:rounded-lg mt-2 sm:mt-0"
            aria-label={"Call Litchfield Perk at " + PHONE_NUMBER}
          >
            Call
          </Button>
        </div>
      </div>
    </HeroShell>
  );
}
