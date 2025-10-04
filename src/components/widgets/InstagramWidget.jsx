import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

// Instagram Widget Component with performance optimizations
// Replace the placeholder content with your actual SnapWidget embed code
export default function InstagramWidget() {
  useEffect(() => {
    // Load SnapWidget script only when component mounts
    const script = document.createElement('script');
    script.src = 'https://snapwidget.com/js/snapwidget.js';
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts
      const existingScript = document.querySelector('script[src="https://snapwidget.com/js/snapwidget.js"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
    };
  }, []);

  return (
    <div style={{ marginTop: '24px' }}>
      {/* SnapWidget Instagram Feed */}
      <div style={{
        borderRadius: '16px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#ffffff',
        padding: '32px',
        textAlign: 'center',
        boxShadow: '0 4px 6px rgba(0, 0, 0, 0.05)'
      }}>
        <div style={{ marginBottom: '24px' }}>
          <Instagram style={{ 
            width: '32px', 
            height: '32px', 
            color: '#00d294', 
            margin: '0 auto 8px auto' 
          }} />
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#000000', 
            marginBottom: '8px' 
          }}>
            Instagram Feed
          </h3>
          <p style={{ 
            color: '#666666', 
            fontSize: '14px',
            margin: 0
          }}>
            Follow us for daily coffee updates and behind-the-scenes content
          </p>
        </div>
        
        {/* 
          REPLACE THIS SECTION WITH YOUR SNAPWIDGET EMBED CODE
          
          Steps to integrate SnapWidget:
          1. Go to https://snapwidget.com
          2. Sign up and connect your Instagram (@litchfieldperk)
          3. Choose a widget style that matches your theme
          4. Copy the embed code they provide
          5. Replace the div below with their iframe/script code
        */}
        <div style={{
          backgroundColor: '#f8f9fa',
          borderRadius: '12px',
          padding: '24px',
          border: '1px solid #e0e0e0'
        }}>
          {/* Placeholder - Replace with SnapWidget embed code */}
          <div style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(120px, 1fr))',
            gap: '12px',
            maxWidth: '500px',
            margin: '0 auto'
          }}>
            {[1, 2, 3, 4].map((i) => (
              <div 
                key={i} 
                style={{
                  aspectRatio: '1',
                  borderRadius: '8px',
                  backgroundColor: '#e5e7eb',
                  border: '1px solid #d1d5db',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  color: '#9ca3af',
                  fontSize: '12px',
                  fontWeight: '500',
                  transition: 'all 0.2s ease',
                  cursor: 'pointer'
                }}
                onMouseEnter={(e) => {
                  e.target.style.backgroundColor = '#d1d5db';
                  e.target.style.transform = 'scale(1.02)';
                }}
                onMouseLeave={(e) => {
                  e.target.style.backgroundColor = '#e5e7eb';
                  e.target.style.transform = 'scale(1)';
                }}
              >
                Photo {i}
              </div>
            ))}
          </div>
          
          {/* Example of what SnapWidget embed code might look like:
          <iframe 
            src="https://snapwidget.com/embed/your-widget-id" 
            className="snapwidget-widget" 
            allowtransparency="true" 
            frameBorder="0" 
            scrolling="no" 
            style={{
              border: 'none', 
              overflow: 'hidden', 
              width: '100%', 
              height: '400px'
            }}
            loading="lazy"
            title="Instagram Feed"
          />
          */}
        </div>
      </div>
    </div>
  );
}
