/**
 * HeroSection Component
 *
 * Main hero banner featuring the cafe logo, tagline, and primary call-to-action.
 * Includes quick info card for hours, location, and social media links.
 * Implements smooth animations using Framer Motion.
 *
 * @component
 */
import { motion } from "framer-motion";
import { Clock, MapPin, Instagram } from "lucide-react";
import { Container, Button } from "../ui";
import analytics from "../../utils/analytics";
import logoImage from "../../assets/logo-512.png";
import { BUSINESS_INFO } from "../../constants/business";

// Animation constants
const ANIMATION_DURATION = 0.8;
const ANIMATION_DELAY_STAGGER = 0.2;
const ANIMATION_EASING = "easeOut";

// Component constants
const INSTAGRAM_HANDLE = BUSINESS_INFO.social.instagram.handle;
const INSTAGRAM_URL = BUSINESS_INFO.social.instagram.url;
const HERO_LOGO_ALT =
  "Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience";

const PHONE_NUMBER = BUSINESS_INFO.phone;
const ORDERING_URL = BUSINESS_INFO.orderingUrl;

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
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
            className="text-center w-full"
          >
            {/* Heading */}
            <h1
              id="hero-heading"
              className="text-brand-text mb-1 sm:mb-1.5"
              style={{
                fontFamily: "var(--font-family-header)",
                fontSize: "clamp(36px, 5vw, 64px)",
                fontWeight: 800,
                letterSpacing: "0.02em",
                lineHeight: 1.1,
              }}
            >
              Welcome
              <span
                style={{
                  display: "block",
                  fontFamily: "var(--font-family-header)",
                  fontSize: "clamp(22px, 3vw, 34px)",
                  fontWeight: 700,
                  letterSpacing: "0.02em",
                  lineHeight: 1.2,
                }}
              >
                to
              </span>
            </h1>

            {/* Logo */}
            <img
              src={logoImage}
              alt={HERO_LOGO_ALT}
              width={320}
              height={320}
              className="h-28 sm:h-36 md:h-40 w-auto mx-auto mt-1 sm:mt-1.5 mb-3 sm:mb-4 drop-shadow-lg"
              loading="eager"
            />

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: ANIMATION_DELAY_STAGGER * 2,
                ease: ANIMATION_EASING,
              }}
              className="text-sm sm:text-lg md:text-xl text-brand-text mb-4 sm:mb-5 max-w-2xl mx-auto leading-relaxed px-4"
            >
              The One Where You Get Great Coffee.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: ANIMATION_DELAY_STAGGER * 3,
                ease: ANIMATION_EASING,
              }}
              className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 mb-4 sm:mb-5 px-4"
            >
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
            </motion.div>

            {/* Info Card */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{
                duration: ANIMATION_DURATION,
                delay: ANIMATION_DELAY_STAGGER * 4,
                ease: ANIMATION_EASING,
              }}
              className="mx-auto max-w-5xl px-4 mt-4"
            >
              <div className="rounded-3xl bg-white/75 backdrop-blur-sm border border-brand-primary/20 shadow-sm px-5 py-4 sm:px-7 sm:py-5">
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
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </main>
  );
}
