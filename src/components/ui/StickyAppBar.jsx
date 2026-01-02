/**
 * StickyAppBar Component
 * 
 * Mobile-only sticky bar promoting the app at the bottom of the viewport.
 * Appears after scrolling 300px or after 3 seconds, whichever comes first.
 * Dismissible with localStorage persistence.
 * 
 * @component
 */
import { useState, useEffect, useRef } from "react";
import { X } from "lucide-react";
import { APP_IOS_URL, APP_ANDROID_URL } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

const STORAGE_KEY = "lp_app_promo_dismissed";
const SCROLL_THRESHOLD = 300;
const TIME_THRESHOLD = 3000; // 3 seconds

export default function StickyAppBar() {
  const [isVisible, setIsVisible] = useState(false);
  const [isDismissed, setIsDismissed] = useState(false);
  const timeTimerRef = useRef(null);
  const hasShownRef = useRef(false);

  // Check if already dismissed
  useEffect(() => {
    const dismissed = localStorage.getItem(STORAGE_KEY) === "1";
    setIsDismissed(dismissed);
  }, []);

  // Check if mobile viewport
  const isMobile = () => {
    if (typeof window === "undefined") return false;
    return window.innerWidth <= 640;
  };

  // Show bar when conditions are met
  useEffect(() => {
    if (isDismissed || !isMobile() || hasShownRef.current) return;

    let scrollHandler = null;
    let mounted = true;

    // Time-based trigger (3 seconds)
    timeTimerRef.current = setTimeout(() => {
      if (mounted && !isDismissed && isMobile() && !hasShownRef.current) {
        setIsVisible(true);
        hasShownRef.current = true;
      }
    }, TIME_THRESHOLD);

    // Scroll-based trigger (300px)
    scrollHandler = () => {
      if (mounted && !isDismissed && isMobile() && !hasShownRef.current) {
        const scrollY = window.scrollY || window.pageYOffset;
        if (scrollY >= SCROLL_THRESHOLD) {
          setIsVisible(true);
          hasShownRef.current = true;
          // Clear time timer since we've shown
          if (timeTimerRef.current) {
            clearTimeout(timeTimerRef.current);
            timeTimerRef.current = null;
          }
        }
      }
    };

    // Use passive listener for better performance
    window.addEventListener("scroll", scrollHandler, { passive: true });

    // Handle resize to hide on desktop
    const resizeHandler = () => {
      if (!isMobile()) {
        setIsVisible(false);
      } else if (!isDismissed && !hasShownRef.current) {
        // Re-check scroll position on resize back to mobile
        scrollHandler();
      }
    };

    window.addEventListener("resize", resizeHandler, { passive: true });

    return () => {
      mounted = false;
      if (scrollHandler) {
        window.removeEventListener("scroll", scrollHandler);
      }
      window.removeEventListener("resize", resizeHandler);
      if (timeTimerRef.current) {
        clearTimeout(timeTimerRef.current);
      }
    };
  }, [isDismissed]);

  const handleDismiss = () => {
    setIsVisible(false);
    setIsDismissed(true);
    localStorage.setItem(STORAGE_KEY, "1");
  };

  // Don't render if dismissed, not mobile, or not visible
  if (isDismissed || !isVisible || !isMobile()) {
    return null;
  }

  return (
    <div
      className="fixed bottom-0 left-0 right-0 z-50 bg-white border-t border-gray-200 shadow-lg sm:hidden"
      style={{
        paddingBottom: "env(safe-area-inset-bottom, 0px)",
      }}
      role="banner"
      aria-label="Download our app"
    >
      <div className="px-3 py-2.5 flex items-center justify-between gap-2 max-w-full">
        <div className="flex-1 min-w-0">
          <div className="text-xs sm:text-sm font-semibold text-brand-text mb-0.5 leading-tight">
            Get the App
          </div>
          <div className="text-[10px] sm:text-xs text-brand-text-muted leading-tight">
            Order ahead in seconds
          </div>
        </div>
        <div className="flex items-center gap-1.5 flex-shrink-0">
          <div className="flex items-center gap-1">
            <a
              href={APP_IOS_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppStoreClick("sticky_bar", APP_IOS_URL)}
              className="text-[10px] font-medium text-brand-text hover:text-brand-primary transition-colors px-1.5 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary"
              aria-label="Get the Litchfield Perk app on the App Store"
            >
              App Store
            </a>
            <a
              href={APP_ANDROID_URL}
              target="_blank"
              rel="noopener noreferrer"
              onClick={() => trackAppStoreClick("sticky_bar", APP_ANDROID_URL)}
              className="text-[10px] font-medium text-brand-text hover:text-brand-primary transition-colors px-1.5 py-0.5 rounded focus:outline-none focus:ring-1 focus:ring-brand-primary"
              aria-label="Get the Litchfield Perk app on Google Play"
            >
              Google Play
            </a>
          </div>
          <button
            onClick={handleDismiss}
            className="p-1 text-brand-text-muted hover:text-brand-text transition-colors duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded flex-shrink-0"
            aria-label="Dismiss app promotion"
          >
            <X className="w-3.5 h-3.5" aria-hidden="true" />
          </button>
        </div>
      </div>
    </div>
  );
}

