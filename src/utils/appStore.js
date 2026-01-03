/**
 * App Store Utility
 *
 * Centralized helpers for:
 * - Detecting device platform (iOS / Android / desktop)
 * - Returning the correct app store URL
 * - Tracking app store link clicks
 *
 * Fails silently if analytics providers are unavailable.
 *
 * @module utils/appStore
 */

// Canonical store URLs
export const IOS_APP_STORE_URL =
  "https://apps.apple.com/us/app/litchfield-perk/id6747682541";

export const ANDROID_PLAY_STORE_URL =
  "https://play.google.com/store/apps/details?id=co.frostbyte.litchfieldperk&pcampaignid=web_share";

/**
 * Detect the user's device platform
 * @returns {"ios" | "android" | "desktop"}
 */
export function detectDevicePlatform() {
  if (typeof navigator === "undefined") return "desktop";

  const ua = navigator.userAgent || navigator.vendor || window.opera;

  const isIOS =
    /iPad|iPhone|iPod/.test(ua) ||
    (navigator.platform === "MacIntel" && navigator.maxTouchPoints > 1);

  if (isIOS) return "ios";
  if (/Android/i.test(ua)) return "android";

  return "desktop";
}

/**
 * Get the appropriate app store URL for the current device
 * @returns {string | null} Store URL or null for desktop
 */
export function getAppStoreUrlForDevice() {
  const platform = detectDevicePlatform();

  if (platform === "ios") return IOS_APP_STORE_URL;
  if (platform === "android") return ANDROID_PLAY_STORE_URL;

  return null; // desktop or unknown
}

/**
 * Detect platform from URL (used for analytics payloads)
 * @param {string} url
 * @returns {"ios" | "android"}
 */
function detectPlatformFromUrl(url) {
  if (!url) return "android"; // Safe fallback

  if (
    url.includes("apps.apple.com") ||
    url.includes("itunes.apple.com")
  ) {
    return "ios";
  }

  if (url.includes("play.google.com")) {
    return "android";
  }

  return "android";
}

/**
 * Track app store click event
 * @param {string} placement - Where the link was clicked (e.g. "hero", "header", "footer")
 * @param {string} url - The app store URL that was clicked
 */
export function trackAppStoreClick(placement, url) {
  try {
    const platform = detectPlatformFromUrl(url);
    const eventName = "app_store_click";

    const eventPayload = {
      platform,
      placement,
      url,
    };

    // GA4
    if (typeof window !== "undefined" && window.gtag) {
      window.gtag("event", eventName, eventPayload);
    }

    // Plausible
    if (typeof window !== "undefined" && window.plausible) {
      window.plausible(eventName, {
        props: eventPayload,
      });
    }

    // Legacy / custom analytics fallback
    if (typeof window !== "undefined" && window.analytics) {
      window.analytics.track(eventName, eventPayload);
    }
  } catch (error) {
    // Analytics should never break UX
    if (import.meta.env.DEV) {
      console.warn("App store tracking error:", error);
    }
  }
}
