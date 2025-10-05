import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Instagram } from "lucide-react";
import { ResponsiveImage, Pill, Section, Container, Button } from "../ui";
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
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: 'url(/public/botanical-pattern.png)',
            backgroundSize: '120% auto',
            backgroundPosition: 'center',
            backgroundRepeat: 'repeat-y'
          }}
        />
        
        <Container className="relative z-10 w-full">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center w-full"
          >
            {/* Logo */}
            <ResponsiveImage
              src="/src/assets/logo-512.png"
              alt="Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience"
              dimensions={{ width: 400, height: 400 }}
              className="h-32 sm:h-40 md:h-48 w-auto mx-auto mb-4 sm:mb-5 drop-shadow-lg"
              loading="eager"
            />

            {/* Main Heading */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand-text mb-3 sm:mb-4 leading-tight px-2"
            >
              Welcome to{" "}
              <span className="text-brand-primary">Litchfield Perk</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-base sm:text-lg md:text-xl text-brand-text mb-6 sm:mb-8 max-w-2xl mx-auto leading-relaxed px-4"
            >
              Litchfield Park's friendly neighborhood cafe. Fresh coffee, baked goods, and good vibes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-4 sm:gap-5 mb-6 sm:mb-8 px-4"
            >
              <Button
                href="#menu"
                variant="primary"
                size="lg"
                onClick={() => analytics.trackCTAClick('shop_now', 'hero')}
                className="w-full sm:min-w-40 btn-mobile"
                aria-label="Browse our menu - View coffee, food, and specialty drinks"
              >
                Menu
              </Button>
              <Button
                href="#visit"
                variant="secondary"
                size="lg"
                onClick={() => analytics.trackCTAClick('visit_us', 'hero')}
                className="w-full sm:min-w-40 btn-mobile"
                aria-label="Visit our cafe - Get directions and contact information"
              >
                Visit Us
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
                className="bg-brand-primary text-brand-secondary"
              />
              <Pill
                icon={<MapPin className="w-4 h-4" />}
                text={BUSINESS_ADDRESS}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary"
              />
              <Pill
                icon={<Instagram className="w-4 h-4" />}
                text={INSTAGRAM_HANDLE}
                href={INSTAGRAM_URL}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-brand-secondary"
              />
            </motion.div>

          </motion.div>
        </Container>
      </div>
    </main>
  );
}