/**
 * AppStoreLinks Component
 * 
 * Reusable component for displaying iOS and Android app store links.
 * Supports both button and badge variants with integrated analytics tracking.
 * 
 * @component
 * @param {string} placement - Required. Where the links are displayed ("header", "home_cta", "footer", "sticky_bar")
 * @param {"buttons" | "badges"} variant - Display style ("buttons" or "badges", default "buttons")
 * @param {string} className - Additional CSS classes
 */
import { Smartphone } from "lucide-react";
import { APP_NAME, APP_IOS_URL, APP_ANDROID_URL } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

export default function AppStoreLinks({ placement, variant = "buttons", className = "" }) {
  if (!placement) {
    if (import.meta.env.DEV) {
      console.warn("AppStoreLinks: placement prop is required");
    }
    return null;
  }

  const handleClick = (platform, url) => {
    trackAppStoreClick(placement, url);
  };

  if (variant === "badges") {
    return (
      <div className={`flex items-center justify-center gap-3 sm:gap-4 ${className}`}>
        <a
          href={APP_IOS_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick("ios", APP_IOS_URL)}
          className="inline-block transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded"
          aria-label={`Get the ${APP_NAME} app on the App Store`}
        >
          <img
            src="/badges/app-store-badge.svg"
            alt="Download on the App Store"
            className="h-10 sm:h-12 md:h-14 w-auto"
            loading="lazy"
          />
        </a>
        <a
          href={APP_ANDROID_URL}
          target="_blank"
          rel="noopener noreferrer"
          onClick={() => handleClick("android", APP_ANDROID_URL)}
          className="inline-block transition-opacity hover:opacity-80 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded"
          aria-label={`Get the ${APP_NAME} app on Google Play`}
        >
          <img
            src="/badges/google-play-badge.png"
            alt="Get it on Google Play"
            className="h-10 sm:h-12 md:h-14 w-auto"
            loading="lazy"
          />
        </a>
      </div>
    );
  }

  // Buttons variant (default)
  return (
    <div className={`flex items-center gap-2 sm:gap-3 ${className}`}>
      <a
        href={APP_IOS_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("ios", APP_IOS_URL)}
        className="inline-flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary whitespace-nowrap leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-2 py-1"
        aria-label={`Get the ${APP_NAME} app on the App Store`}
      >
        <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
        <span>App Store</span>
      </a>
      <a
        href={APP_ANDROID_URL}
        target="_blank"
        rel="noopener noreferrer"
        onClick={() => handleClick("android", APP_ANDROID_URL)}
        className="inline-flex items-center gap-1.5 sm:gap-2 text-sm font-medium text-brand-text transition-colors duration-200 hover:text-brand-primary whitespace-nowrap leading-tight focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-2 rounded px-2 py-1"
        aria-label={`Get the ${APP_NAME} app on Google Play`}
      >
        <Smartphone className="w-3.5 h-3.5 sm:w-4 sm:h-4" aria-hidden="true" />
        <span>Google Play</span>
      </a>
    </div>
  );
}

