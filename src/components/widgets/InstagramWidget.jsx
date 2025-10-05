import React, { useEffect } from 'react';
import { Instagram } from 'lucide-react';

// Instagram Widget Component with performance optimizations
// Replace the placeholder content with your actual SnapWidget embed code
export default function InstagramWidget({ cardClassName = "", maxPerRow = 3 }) {
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
    <div className="mt-6">
      {/* SnapWidget Instagram Feed */}
      <div className={[
        "rounded-2xl ring-1 ring-brand-border bg-white",
        "p-4 sm:p-6 text-center shadow-[0_4px_12px_rgba(0,0,0,0.05)]",
        cardClassName,
      ].filter(Boolean).join(" ")}>        
        <div className="mb-4 sm:mb-6">
          <Instagram className="w-7 h-7 mx-auto mb-2 text-brand-600" />
          <h3 className="text-base font-semibold text-brand-text mb-1">Instagram Feed</h3>
          <p className="text-sm text-brand-text-muted m-0">Follow us for daily coffee updates</p>
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
        <div className="bg-brand-background rounded-xl p-4 sm:p-6 ring-1 ring-brand-border">
          {/* Placeholder - Replace with SnapWidget embed code */}
          <div className={`grid grid-cols-2 ${maxPerRow >= 3 ? 'sm:grid-cols-3' : ''} gap-2 sm:gap-3 max-w-full mx-auto`}>
            {[1, 2, 3, 4, 5, 6].slice(0, maxPerRow * 2).map((i) => (
              <div
                key={i}
                className="relative w-full overflow-hidden rounded-lg ring-1 ring-brand-border bg-brand-border/30"
                style={{ paddingTop: '100%' }}
              >
                <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted text-xs font-medium">
                  Photo {i}
                </div>
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
