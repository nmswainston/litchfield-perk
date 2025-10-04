import React, { useEffect, useState } from "react";
import { Coffee, Clock, MapPin, Instagram } from "lucide-react";
import DottyWord from "../ui/DottyWord";

function useScrolled(threshold = 80) {
  const [scrolled, setScrolled] = useState(false);
  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > threshold);
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, [threshold]);
  return scrolled;
}

function useHeaderAbsorption() {
  const [isOverHero, setIsOverHero] = useState(true);
  const [scrollProgress, setScrollProgress] = useState(0);
  
  useEffect(() => {
    const onScroll = () => {
      const scrollY = window.scrollY;
      // More accurate hero height calculation based on actual hero section
      const heroHeight = 1000; // Increased to account for padding and content
      
      // Check if header is over hero section
      const overHero = scrollY < heroHeight;
      setIsOverHero(overHero);
      
      // Calculate scroll progress (0 to 1) for smooth transitions
      const progress = Math.min(scrollY / heroHeight, 1);
      setScrollProgress(progress);
    };
    
    onScroll();
    window.addEventListener("scroll", onScroll, { passive: true });
    return () => window.removeEventListener("scroll", onScroll);
  }, []);
  
  return { isOverHero, scrollProgress };
}


export default function ScrollHeader() {
  const scrolled = useScrolled(120);
  const { isOverHero, scrollProgress } = useHeaderAbsorption();

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.3s ease',
        // Base background - starts transparent, becomes botanical pattern
        backgroundColor: isOverHero ? 'transparent' : 'transparent',
        backdropFilter: isOverHero ? 'blur(5px)' : 'blur(10px)',
        borderBottom: isOverHero ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isOverHero ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)',
        // Smooth opacity transition based on scroll progress
        opacity: isOverHero ? 0.95 + (scrollProgress * 1.05) : 1
      }}
    >
      {/* Botanical Pattern Background Layer - transitions based on scroll */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          zIndex: -2,
          opacity: scrollProgress, // Fades in as you scroll
          transition: 'opacity 0.3s ease'
        }}
      />
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          backgroundImage: 'url(/botanical-pattern.png)',
          backgroundRepeat: 'repeat',
          backgroundSize: '900px 400px',
          backgroundPosition: 'center top',
          opacity: 0.15 * scrollProgress, // Botanical pattern fades in with scroll
          mixBlendMode: 'multiply',
          zIndex: -1,
          transition: 'opacity 0.3s ease'
        }}
      />
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        height: '80px',
        padding: '0 20px',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'space-between',
        position: 'relative',
        zIndex: 1
      }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Coffee style={{ 
            color: isOverHero ? '#00d294' : '#00d294', 
            width: '24px', 
            height: '24px' 
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DottyWord 
              text="LITCHFIELD PERK" 
              size="text-xl md:text-2xl" 
              color={scrollProgress > 0.6 ? '#000000' : '#ffffff'}
              textShadow={scrollProgress > 0.6 ? '1px 1px 2px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.8)'}
            />
          </div>
        </div>
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          <a href="#menu" style={{ 
            color: scrollProgress > 0.6 ? '#000000' : '#ffffff', 
            textDecoration: 'none', 
            fontWeight: '600',
            textShadow: scrollProgress > 0.6 ? '1px 1px 2px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.8)',
            transition: 'all 0.3s ease'
          }}>Menu</a>
          <a href="#hours" style={{ 
            color: scrollProgress > 0.6 ? '#000000' : '#ffffff', 
            textDecoration: 'none', 
            fontWeight: '600',
            textShadow: scrollProgress > 0.6 ? '1px 1px 2px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.8)',
            transition: 'all 0.3s ease'
          }}>Hours</a>
          <a href="#visit" style={{ 
            color: scrollProgress > 0.6 ? '#000000' : '#ffffff', 
            textDecoration: 'none', 
            fontWeight: '600',
            textShadow: scrollProgress > 0.6 ? '1px 1px 2px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.8)',
            transition: 'all 0.3s ease'
          }}>Visit</a>
          <a href="#instagram" style={{ 
            color: scrollProgress > 0.6 ? '#000000' : '#ffffff', 
            textDecoration: 'none', 
            fontWeight: '600',
            textShadow: scrollProgress > 0.6 ? '1px 1px 2px rgba(255, 255, 255, 0.5)' : '2px 2px 4px rgba(0, 0, 0, 0.8)',
            transition: 'all 0.3s ease'
          }}>Instagram</a>
          <a
            href="#visit"
            style={{
              backgroundColor: '#00d294',
              color: '#000000',
              padding: '8px 16px',
              borderRadius: '20px',
              textDecoration: 'none',
              fontWeight: '600',
              boxShadow: '0 2px 8px rgba(0, 210, 148, 0.3)',
              transition: 'all 0.3s ease'
            }}
          >
            Order ahead
          </a>
        </nav>
      </div>
    </header>
  );
}
