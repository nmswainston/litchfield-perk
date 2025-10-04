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
      <div className="bg-gradient-to-br from-brand-background-light to-brand-background-dark py-30 px-5 relative overflow-hidden">
        {/* Botanical Pattern Background for header absorption */}
        <div 
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: 'url(/images/optimized/botanical-pattern-desktop.png)',
            backgroundSize: 'cover',
            backgroundPosition: 'center',
            backgroundRepeat: 'no-repeat'
          }}
        />
        
        <Container className="relative z-10">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.8, ease: "easeOut" }}
            className="text-center"
          >
            {/* Logo */}
            <ResponsiveImage
              src="/images/optimized/logo-512"
              alt="Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience"
              sizes={{ mobile: '200px', desktop: '300px' }}
              dimensions={{ width: 300, height: 300 }}
              className="h-25 w-auto mx-auto mb-5 drop-shadow-lg"
              loading="eager"
              onError={(e) => {
                e.target.src = '/src/assets/logo-512.png';
              }}
            />

            {/* Main Heading */}
            <motion.h1
              id="hero-heading"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.2, ease: "easeOut" }}
              className="text-4xl md:text-6xl font-bold text-brand-text mb-4 leading-tight"
            >
              Welcome to{" "}
              <span className="text-brand-primary">Litchfield Perk</span>
            </motion.h1>

            {/* Subtitle */}
            <motion.p
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.4, ease: "easeOut" }}
              className="text-lg md:text-xl text-brand-text mb-8 max-w-2xl mx-auto leading-relaxed"
            >
              Litchfield Park's friendly neighborhood cafe. Fresh coffee, baked goods, and good vibes.
            </motion.p>

            {/* CTA Buttons */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 0.6, ease: "easeOut" }}
              className="flex flex-col sm:flex-row items-center justify-center gap-5 mb-8"
            >
              <Button
                href="#menu"
                variant="primary"
                size="lg"
                onClick={() => analytics.trackCTAClick('shop_now', 'hero')}
                className="min-w-40"
                aria-label="Browse our menu - View coffee, food, and specialty drinks"
              >
                Shop Now
              </Button>
              <Button
                href="#visit"
                variant="secondary"
                size="lg"
                onClick={() => analytics.trackCTAClick('visit_us', 'hero')}
                className="min-w-40"
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
              className="flex flex-wrap items-center justify-center gap-4 mb-8"
            >
              <Pill
                icon={<Clock className="w-4 h-4" />}
                text="Open Daily"
                className="bg-brand-primary text-brand-secondary"
              />
              <Pill
                icon={<MapPin className="w-4 h-4" />}
                text="Litchfield Park"
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary"
              />
              <Pill
                icon={<Instagram className="w-4 h-4" />}
                text={INSTAGRAM_HANDLE}
                href={INSTAGRAM_URL}
                className="bg-brand-secondary text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-brand-secondary"
              />
            </motion.div>

            {/* Address */}
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.8, delay: 1.0, ease: "easeOut" }}
              className="text-brand-text-light text-sm md:text-base"
            >
              <p className="mb-2 font-medium">📍 {BUSINESS_ADDRESS}</p>
              <p className="text-brand-text-muted">
                Mon-Fri: 6AM-6PM • Sat-Sun: 7AM-3PM
              </p>
            </motion.div>
          </motion.div>
        </Container>
      </div>
    </main>
  );
}