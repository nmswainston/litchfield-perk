/**
 * HeroSection Component
 * 
 * Main hero banner featuring the cafe logo, tagline, and primary call-to-action.
 * Includes quick info pills for hours, location, and social media links.
 * Implements smooth animations using Framer Motion.
 * 
 * @component
 */
import { motion } from "framer-motion";
import { Clock, MapPin, Instagram } from "lucide-react";
import { Pill, Container, Button } from "../ui";
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
const HERO_LOGO_ALT = "Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience";

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
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: 'url(/botanical-pattern.png)',
            backgroundSize: '80% auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat'
          }}
        />
        
        <Container className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: ANIMATION_DURATION, ease: ANIMATION_EASING }}
            className="text-center w-full"
          >

          {/* Visible hero heading using auditionable header font */}
          <h1
            id="hero-heading"
            className="text-brand-text mb-1 sm:mb-2"
            style={{
              fontFamily: 'var(--font-family-header)',
              fontSize: 'clamp(40px, 6vw, 72px)',
              fontWeight: 800,
              letterSpacing: '0.02em',
              lineHeight: 1.1
            }}
          >
            Welcome
            <span
              style={{
                display: 'block',
                fontFamily: 'var(--font-family-header)',
                fontSize: 'clamp(24px, 3.5vw, 40px)', // approximate h2/section-title size
                fontWeight: 700,
                letterSpacing: '0.02em',
                lineHeight: 1.2
              }}
            >
              to
            </span>
          </h1>
            {/* Logo */}
            <img
              src={logoImage}
              alt={HERO_LOGO_ALT}
              width={400}
              height={400}
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto mt-1 sm:mt-2 mb-3 sm:mb-5 drop-shadow-lg"
              loading="eager"
            />
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATION_DURATION, 
                delay: ANIMATION_DELAY_STAGGER * 2, 
                ease: ANIMATION_EASING 
              }}
              className="text-base sm:text-lg md:text-xl text-brand-text mb-5 sm:mb-6 max-w-2xl mx-auto leading-relaxed px-4"
            >
              The One Where You Get Great Coffee.
            </motion.p>

            {/* Single primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATION_DURATION, 
                delay: ANIMATION_DELAY_STAGGER * 3, 
                ease: ANIMATION_EASING 
              }}
              className="flex items-center justify-center mb-5 sm:mb-6 px-4"
            >
              <Button
                href="#menu"
                variant="filled"
                size="lg"
                onClick={() => analytics.trackCTAClick('shop_now', 'hero')}
                className="sm:min-w-44 btn-mobile text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4"
                aria-label="Browse our menu - View coffee, food, and specialty drinks"
              >
                <span className="clamp-2-mobile">Menu</span>
              </Button>
            </motion.div>

            {/* Quick Info Pills */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ 
                duration: ANIMATION_DURATION, 
                delay: ANIMATION_DELAY_STAGGER * 4, 
                ease: ANIMATION_EASING 
              }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4"
            >
              <Pill
                icon={<Clock className="w-4 h-4" />}
                text="Mon-Fri: 5:30AM-2PM Sat: 7AM-12PM Sun: Closed"
                className="bg-brand-primary text-brand-primary hero-pill"
              />
              {/* Custom Address Display for Mobile with Maps Link */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_INFO.address.full)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open directions to ${BUSINESS_INFO.address.full} in your maps app`}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary rounded-full px-3 py-2 text-sm pill-mobile hero-pill focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-80" />
                  <div className="text-left">
                    <div className="hidden sm:block">{BUSINESS_INFO.address.full}</div>
                    <div className="block sm:hidden">
                      <div>{BUSINESS_INFO.address.street}</div>
                      <div>{BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}</div>
                    </div>
                  </div>
                </div>
              </a>
              <Pill
                icon={<Instagram className="w-4 h-4" />}
                text={INSTAGRAM_HANDLE}
                href={INSTAGRAM_URL}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-brand-secondary hero-pill"
              />
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </main>
  );
}