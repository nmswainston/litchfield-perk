import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Instagram } from "lucide-react";
import { ResponsiveImage, Pill, Section, Container, Button, FriendsWordmark, FriendsWordmarkTo } from "../ui";
import analytics from "../../utils/analytics";

// Constants
const BUSINESS_ADDRESS = "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340";
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
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply bg-[url('/public/botanical-pattern.png')] bg-[length:80%_auto] bg-center bg-repeat"
        />
        
        <Container className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center w-full"
          >

            {/* Accessible heading only (hidden visually) */}
            <h1 id="hero-heading" className="sr-only">Welcome</h1>
            {/* Friends-styled mark (decorative) */}
            <div className="mt-1 text-brand-text flex items-start justify-center gap-3">
              <FriendsWordmark width={520} height={180} radius={120} letterSize={58} letterSpacing={3} />
              <div className="pt-6">
                <FriendsWordmarkTo />
              </div>
            </div>
            {/* Logo */}
            <ResponsiveImage
              src="/src/assets/logo-512.png"
              alt="Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience"
              dimensions={{ width: 400, height: 400 }}
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto mb-4 sm:mb-5 drop-shadow-lg"
              loading="eager"
            />
            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-brand-text mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            >
              The One Where You Get Great Coffee.
            </motion.p>

            {/* Single primary CTA */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex items-center justify-center mb-6 sm:mb-8 px-4"
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
              transition={{ duration: 0.8, delay: 0.8, ease: "easeOut" }}
              className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 mb-6 sm:mb-8 px-4"
            >
              <Pill
                icon={<Clock className="w-4 h-4" />}
                text="Mon-Fri: 6AM-2PM Sat: 7AM-12PM  Sun: Closed"
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary rounded-full px-3 py-2 text-sm pill-mobile hero-pill focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              />
              {/* Custom Address Display for Mobile with Maps Link */}
              <a
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                aria-label={`Open directions to ${BUSINESS_ADDRESS} in your maps app`}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary rounded-full px-3 py-2 text-sm pill-mobile hero-pill focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              >
                <div className="flex items-center gap-2">
                  <MapPin className="w-4 h-4 opacity-80" />
                  <div className="text-left">
                    <div className="hidden sm:block">{BUSINESS_ADDRESS}</div>
                    <div className="block sm:hidden">
                      <div>4870 N Litchfield Rd Ste 103</div>
                      <div>Litchfield Park, AZ 85340</div>
                    </div>
                  </div>
                </div>
              </a>
              <Pill
                icon={<Instagram className="w-4 h-4" />}
                text={INSTAGRAM_HANDLE}
                href={INSTAGRAM_URL}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary rounded-full px-3 py-2 text-sm pill-mobile hero-pill focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2"
              />
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </main>
  );
}