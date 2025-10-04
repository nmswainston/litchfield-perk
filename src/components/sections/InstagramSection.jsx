import React, { useEffect, useRef, useState } from "react";
import { Instagram } from "lucide-react";
import InstagramWidget from "../widgets/InstagramWidget";

// Constants
const INSTAGRAM_HANDLE = "@litchfieldperk";
const INSTAGRAM_URL = "https://www.instagram.com/litchfieldperk/";

export default function InstagramSection() {
  const ref = useRef(null);
  const [ready, setReady] = useState(false);

  useEffect(() => {
    const io = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setReady(true);
          io.disconnect();
        }
      },
      { 
        rootMargin: "200px", // Start loading 200px before it's visible
        threshold: 0.1 // Trigger when 10% is visible
      }
    );
    
    if (ref.current) {
      io.observe(ref.current);
    }
    
    return () => io.disconnect();
  }, []);

  return (
    <section 
      id="instagram" 
      ref={ref}
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="instagram-heading"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Follow Us
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)',
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            See what's brewing on Instagram
          </p>
        </div>
        
        {/* Lazy-loaded Instagram Widget */}
        {!ready ? (
          <div style={{
            height: '400px',
            backgroundColor: '#f3f4f6',
            borderRadius: '12px',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            margin: '0 auto',
            maxWidth: '600px',
            position: 'relative',
            overflow: 'hidden'
          }}>
            {/* Animated loading skeleton */}
            <div style={{
              display: 'flex',
              flexDirection: 'column',
              alignItems: 'center',
              gap: '16px'
            }}>
              <div style={{
                width: '48px',
                height: '48px',
                backgroundColor: '#e5e7eb',
                borderRadius: '50%',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <div style={{
                width: '200px',
                height: '20px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
              <div style={{
                width: '150px',
                height: '16px',
                backgroundColor: '#e5e7eb',
                borderRadius: '4px',
                animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
              }} />
            </div>
            
            {/* Instagram grid skeleton */}
            <div style={{
              position: 'absolute',
              bottom: '20px',
              left: '20px',
              right: '20px',
              display: 'grid',
              gridTemplateColumns: 'repeat(4, 1fr)',
              gap: '8px'
            }}>
              {[1, 2, 3, 4].map((i) => (
                <div
                  key={i}
                  style={{
                    aspectRatio: '1',
                    backgroundColor: '#e5e7eb',
                    borderRadius: '8px',
                    animation: 'pulse 2s cubic-bezier(0.4, 0, 0.6, 1) infinite'
                  }}
                />
              ))}
            </div>
          </div>
        ) : (
          <InstagramWidget />
        )}
        
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00d294',
            color: '#000000',
            padding: '12px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            marginTop: '24px',
            transition: 'all 0.2s ease'
          }}
          onMouseEnter={(e) => {
            e.target.style.transform = 'translateY(-1px)';
            e.target.style.boxShadow = '0 4px 12px rgba(0, 210, 148, 0.3)';
          }}
          onMouseLeave={(e) => {
            e.target.style.transform = 'translateY(0)';
            e.target.style.boxShadow = 'none';
          }}
        >
          <Instagram style={{ width: '16px', height: '16px' }} /> Follow {INSTAGRAM_HANDLE}
        </a>
      </div>
      
      {/* Add CSS animation for pulse effect */}
      <style jsx>{`
        @keyframes pulse {
          0%, 100% {
            opacity: 1;
          }
          50% {
            opacity: 0.5;
          }
        }
      `}</style>
    </section>
  );
}
