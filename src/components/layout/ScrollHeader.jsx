import React from "react";
import { Coffee, Clock, MapPin, Instagram } from "lucide-react";
import { useOptimizedScroll } from "../../hooks";
import DottyWord from "../ui/DottyWord";


export default function ScrollHeader() {
  const { scrollY, isScrolled, isOverHero, scrollProgress } = useOptimizedScroll();

  // Optimized thresholds for smooth transitions
  const textColorThreshold = 0.3; // Earlier text color change
  const backgroundThreshold = 0.1; // Earlier background fade-in
  const fullOpacityThreshold = 0.8; // When header reaches full opacity

  // Smooth opacity calculations with better curves
  const headerOpacity = isOverHero 
    ? Math.min(0.95 + (scrollProgress * 0.05), 1) 
    : 1;

  const backgroundOpacity = Math.min(scrollProgress * 1.2, 1);
  const patternOpacity = Math.min(scrollProgress * 0.2, 0.15);

  // Text color with smoother transition
  const textColor = scrollProgress > textColorThreshold ? '#000000' : '#ffffff';
  const textShadow = scrollProgress > textColorThreshold 
    ? '1px 1px 2px rgba(255, 255, 255, 0.5)' 
    : '2px 2px 4px rgba(0, 0, 0, 0.8)';

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 50,
        transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)', // Smoother easing
        backgroundColor: 'transparent',
        backdropFilter: isOverHero ? 'blur(5px)' : 'blur(10px)',
        borderBottom: isOverHero ? 'none' : '1px solid rgba(255, 255, 255, 0.1)',
        boxShadow: isOverHero ? 'none' : '0 4px 12px rgba(0, 0, 0, 0.15)',
        opacity: headerOpacity
      }}
    >
      {/* Gradient Background Layer - smooth fade-in */}
      <div
        style={{
          position: 'absolute',
          top: 0,
          left: 0,
          right: 0,
          bottom: 0,
          background: 'linear-gradient(135deg, #f8f9fa 0%, #e9ecef 100%)',
          zIndex: -2,
          opacity: backgroundOpacity,
          transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Botanical Pattern Background Layer - smooth fade-in */}
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
          opacity: patternOpacity,
          mixBlendMode: 'multiply',
          zIndex: -1,
          transition: 'opacity 0.2s cubic-bezier(0.4, 0, 0.2, 1)'
        }}
      />
      
      {/* Header Content */}
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
        {/* Logo Section */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '12px' }}>
          <Coffee style={{ 
            color: '#00d294', 
            width: '24px', 
            height: '24px',
            transition: 'all 0.2s ease'
          }} />
          <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'center' }}>
            <DottyWord 
              text="LITCHFIELD PERK" 
              size="text-xl md:text-2xl" 
              color={textColor}
              textShadow={textShadow}
            />
          </div>
        </div>
        
        {/* Navigation */}
        <nav style={{ display: 'flex', gap: '20px', alignItems: 'center' }}>
          {['Menu', 'Hours', 'Visit', 'Instagram'].map((item, index) => (
            <a 
              key={item}
              href={`#${item.toLowerCase()}`} 
              style={{ 
                color: textColor, 
                textDecoration: 'none', 
                fontWeight: '600',
                textShadow: textShadow,
                transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
                padding: '8px 12px',
                borderRadius: '6px',
                position: 'relative'
              }}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = 'rgba(0, 210, 148, 0.1)';
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = 'transparent';
              }}
            >
              {item}
            </a>
          ))}
          
          {/* CTA Button */}
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
              transition: 'all 0.2s cubic-bezier(0.4, 0, 0.2, 1)',
              marginLeft: '8px'
            }}
            onMouseEnter={(e) => {
              e.target.style.transform = 'translateY(-1px)';
              e.target.style.boxShadow = '0 4px 12px rgba(0, 210, 148, 0.4)';
            }}
            onMouseLeave={(e) => {
              e.target.style.transform = 'translateY(0)';
              e.target.style.boxShadow = '0 2px 8px rgba(0, 210, 148, 0.3)';
            }}
          >
            Order ahead
          </a>
        </nav>
      </div>
    </header>
  );
}
