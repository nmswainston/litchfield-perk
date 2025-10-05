import React, { useState, useEffect } from "react";
import { Container, Button } from "../ui";
import { getBusinessStatus, getCurrentTime } from "../../utils";

// Constants
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const [businessStatus, setBusinessStatus] = useState(getBusinessStatus());
  const [currentTime, setCurrentTime] = useState(getCurrentTime());

  // Update time and business status every minute
  useEffect(() => {
    const updateTime = () => {
      setCurrentTime(getCurrentTime());
      setBusinessStatus(getBusinessStatus());
    };

    // Update immediately
    updateTime();

    // Set up interval to update every minute
    const interval = setInterval(updateTime, 60000);

    return () => clearInterval(interval);
  }, []);

  return (
    <footer className="border-t border-brand-border bg-brand-background-light w-full">
      <Container className="py-14 flex flex-col items-center justify-center gap-6">
        {/* Dynamic business status */}
        <div className="text-center space-y-2">
          <div className="text-brand-text-muted text-sm tracking-tight font-mono">
            {businessStatus.todayHours}
          </div>
          <div className={`text-xs font-medium ${
            businessStatus.isOpen 
              ? 'text-green-600' 
              : 'text-red-600'
          }`}>
            {businessStatus.isOpen ? 'Open Now' : 'Closed'}
            {businessStatus.nextOpen && (
              <span className="text-brand-text-muted ml-2">
                • {businessStatus.nextOpen}
              </span>
            )}
          </div>
          <div className="text-brand-text-muted text-xs font-mono">
            Current time: {businessStatus.currentTime}
          </div>
        </div>
        {/* Social row */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="#instagram">Instagram</Button>
          <Button variant="ghost" href="#">Facebook</Button>
        </div>
        <div className="text-brand-text-muted text-xs text-center mt-2 space-y-1">
          <div>Made with ☕ coffee, 💚 love, and Central Perk vibes</div>
          <div>© {CURRENT_YEAR} Litchfield Perk • Litchfield Park, AZ</div>
          <div>Site by <span className="font-mono text-brand-text">console.log(ic)</span></div>
        </div>
      </Container>
    </footer>
  );
}