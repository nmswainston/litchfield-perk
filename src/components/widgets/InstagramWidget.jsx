import React from 'react';
import { Instagram } from 'lucide-react';

// Instagram Widget Component
// Replace the placeholder content with your actual SnapWidget embed code
export default function InstagramWidget() {
  return (
    <div className="mt-6">
      {/* SnapWidget Instagram Feed */}
      <div className="rounded-2xl border border-white/10 bg-white/5 p-8 text-center">
        <div className="mb-4">
          <Instagram className="h-8 w-8 text-emerald-400 mx-auto mb-2" />
          <h3 className="text-lg font-semibold text-white mb-2">Instagram Feed</h3>
          <p className="text-white/70 text-sm">
            Follow us for daily coffee updates and behind-the-scenes content
          </p>
        </div>
        
        {/* 
          REPLACE THIS SECTION WITH YOUR SNAPWIDGET EMBED CODE
          
          Steps to integrate SnapWidget:
          1. Go to https://snapwidget.com
          2. Sign up and connect your Instagram (@litchfieldperk)
          3. Choose a widget style that matches your dark theme
          4. Copy the embed code they provide
          5. Replace the div below with their iframe/script code
        */}
        <div className="bg-white/5 rounded-xl p-6 border border-white/10">
          {/* Placeholder - Replace with SnapWidget embed code */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-3">
            {[1, 2, 3, 4].map((i) => (
              <div key={i} className="aspect-square rounded-lg bg-white/5 border border-white/10 grid place-items-center text-white/30 hover:bg-white/10 transition-colors">
                <span className="text-xs">Photo {i}</span>
              </div>
            ))}
          </div>
          
          {/* Example of what SnapWidget embed code might look like:
          <script src="https://snapwidget.com/js/snapwidget.js"></script>
          <iframe src="https://snapwidget.com/embed/your-widget-id" 
                  className="snapwidget-widget" 
                  allowtransparency="true" 
                  frameborder="0" 
                  scrolling="no" 
                  style="border:none; overflow:hidden; width:100%; height:400px">
          </iframe>
          */}
        </div>
      </div>
    </div>
  );
}
