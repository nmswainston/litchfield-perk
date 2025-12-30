/**
 * InstagramWidget Component
 * 
 * Lazy-loads Instagram feed using SnapWidget service.
 * Includes performance optimizations and placeholder content.
 * Replace placeholder with actual SnapWidget embed code when ready.
 * 
 * @component
 * @param {string} cardClassName - Additional CSS classes for card container
 * @param {number} maxPerRow - Maximum number of images per row (default: 3)
 */
import { useEffect } from 'react';
import { Instagram } from 'lucide-react';

// Constants
const SNAPWIDGET_SCRIPT_URL = 'https://snapwidget.com/js/snapwidget.js';

export default function InstagramWidget({ cardClassName = "", maxPerRow = 3 }) {
  useEffect(() => {
    // Check if script already exists to avoid duplicates
    const existingScript = document.querySelector(`script[src="${SNAPWIDGET_SCRIPT_URL}"]`);
    if (existingScript) {
      return; // Script already loaded
    }

    // Load SnapWidget script only when component mounts
    const script = document.createElement('script');
    script.src = SNAPWIDGET_SCRIPT_URL;
    script.async = true;
    script.defer = true;
    document.head.appendChild(script);

    return () => {
      // Cleanup script when component unmounts (only if no other instances)
      const scriptToRemove = document.querySelector(`script[src="${SNAPWIDGET_SCRIPT_URL}"]`);
      if (scriptToRemove && scriptToRemove === script) {
        document.head.removeChild(scriptToRemove);
      }
    };
  }, []);

  return (
    <div className="mt-6">
      {/* SnapWidget Instagram Feed */}
      <div className={[
        "rounded-xl ring-1 ring-brand-border bg-white",
        "p-4 sm:p-6 text-center shadow-md",
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
            {Array.from({ length: maxPerRow * 2 }, (_, index) => (
              <div
                key={index}
                className="relative w-full overflow-hidden rounded-lg ring-1 ring-brand-border bg-brand-border/30"
                style={{ 
                  // Aspect ratio hack for responsive square containers - paddingTop: 100% creates 1:1 aspect ratio
                  paddingTop: '100%' 
                }}
                role="presentation"
                aria-label="Instagram photo placeholder"
              >
                <div className="absolute inset-0 flex items-center justify-center text-brand-text-muted text-xs font-medium">
                  Photo {index + 1}
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
              // Iframe styles must remain inline - external embed code requires inline styles for proper rendering
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
