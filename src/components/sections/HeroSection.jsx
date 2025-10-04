import React from "react";
import { motion } from "framer-motion";
import { Clock, MapPin, Instagram } from "lucide-react";
import ResponsiveImage from "../ui/ResponsiveImage";
import Pill from "../ui/Pill";

// Constants
const BUSINESS_ADDRESS = "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340";
const INSTAGRAM_HANDLE = "@litchfieldperk";
const INSTAGRAM_URL = "https://www.instagram.com/litchfieldperk/";

export default function HeroSection() {
  return (
    <main 
      id="main-content" 
      style={{ 
        backgroundColor: '#ffffff',
        padding: '0',
        textAlign: 'center'
      }}
      aria-labelledby="hero-heading"
    >
      {/* Hero Banner */}
      <div style={{
        background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
        padding: '120px 20px 60px 20px', // Reduced padding for more compact design
        position: 'relative',
        overflow: 'hidden'
      }}>
        {/* Botanical Pattern Background for header absorption */}
        <div 
          style={{
            position: 'absolute',
            top: 0,
            left: 0,
            right: 0,
            bottom: 0,
            backgroundImage: 'url(/images/optimized/botanical-pattern-desktop.png)',
            backgroundRepeat: 'repeat',
            backgroundSize: '900px 400px',
            backgroundPosition: 'center top',
            mixBlendMode: 'multiply'
          }}
        />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative', zIndex: 1 }}>
          <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.6 }}>
            <div style={{ 
              textAlign: 'center',
              marginBottom: '40px'
            }}>
              <ResponsiveImage
                src="/images/optimized/logo-512"
                alt="Litchfield Perk cafe logo - a circular coffee shop emblem with coffee cup icon and green branding, representing our friendly neighborhood coffee experience"
                sizes={{ mobile: '200px', desktop: '300px' }}
                dimensions={{ width: 300, height: 300 }}
                style={{ 
                  height: '100px', 
                  width: 'auto', 
                  marginBottom: '20px',
                  filter: 'drop-shadow(0 4px 8px rgba(0, 0, 0, 0.1))'
                }}
                loading="eager"
                onError={(e) => {
                  // Fallback to original logo if optimized version fails
                  e.target.src = '/src/assets/logo-512.png';
                }}
              />
              <h1 id="hero-heading" style={{ 
                fontSize: 'clamp(36px, 5vw, 56px)', 
                fontWeight: '700', 
                color: '#000000',
                marginBottom: '16px',
                textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
                lineHeight: '1.2'
              }}>
                The one where coffee is always there for you
              </h1>
              <p style={{ 
                fontSize: 'clamp(16px, 2.5vw, 22px)',
                color: '#666666',
                maxWidth: '700px',
                margin: '0 auto 30px auto',
                lineHeight: '1.6',
                fontWeight: '400'
              }}>
                Small‑batch roasts, house syrups, and a couch with your name on it.
              </p>
            </div>
            
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '20px',
              marginBottom: '30px'
            }}>
              <a 
                href="#menu" 
                className="btn-primary touch-target"
                style={{
                  backgroundColor: '#00a070',
                  color: '#ffffff',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '18px',
                  boxShadow: '0 6px 12px rgba(0, 160, 112, 0.3)',
                  transition: 'all 0.3s ease',
                  border: 'none',
                  cursor: 'pointer',
                  minWidth: '160px',
                  minHeight: '44px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Browse our menu - View coffee, food, and specialty drinks"
              >
                Shop Now
              </a>
              <a 
                href="#visit" 
                className="btn-secondary touch-target"
                style={{
                  backgroundColor: '#ffffff',
                  color: '#00a070',
                  padding: '18px 36px',
                  borderRadius: '12px',
                  textDecoration: 'none',
                  fontWeight: '700',
                  fontSize: '18px',
                  border: '2px solid #00a070',
                  boxShadow: '0 6px 12px rgba(0, 0, 0, 0.1)',
                  transition: 'all 0.3s ease',
                  cursor: 'pointer',
                  minWidth: '160px',
                  minHeight: '44px',
                  textAlign: 'center',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center'
                }}
                aria-label="Visit our cafe - Get directions and contact information"
              >
                Visit Us
              </a>
            </div>

            {/* Quick Info Pills */}
            <div style={{ 
              display: 'flex', 
              flexWrap: 'wrap', 
              alignItems: 'center', 
              justifyContent: 'center', 
              gap: '16px',
              marginTop: '20px'
            }}>
              <Pill icon={Clock}>Mon–Fri 5:30a–2p • Sat 7a–12p • Sun Closed</Pill>
              <Pill icon={MapPin}>{BUSINESS_ADDRESS}</Pill>
              <a href={INSTAGRAM_URL} target="_blank" rel="noreferrer" style={{ textDecoration: 'none' }}>
                <Pill icon={Instagram}>{INSTAGRAM_HANDLE}</Pill>
              </a>
            </div>
          </motion.div>
        </div>
      </div>
    </main>
  );
}
