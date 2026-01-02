/**
 * App Store Tracking Utility
 * 
 * Tracks app store link clicks with support for multiple analytics providers.
 * Fails silently if analytics is not available.
 * 
 * @module utils/appStore
 */

/**
 * Track app store click event
 * @param {string} placement - Where the link was clicked (e.g. "header", "home_cta", "footer", "sticky_bar")
 * @param {string} url - The app store URL that was clicked
 */
export function trackAppStoreClick(placement, url) {
  try {
    const eventName = "app_store_click";
    const eventPayload = {
      placement,
      url,
    };

    // Support GA4 (window.gtag)
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('event', eventName, eventPayload);
    }

    // Support Plausible (window.plausible)
    if (typeof window !== 'undefined' && window.plausible) {
      window.plausible(eventName, {
        props: eventPayload
      });
    }

    // If analytics utility exists, use it as well
    // This provides fallback support for the existing analytics system
    if (typeof window !== 'undefined' && window.analytics) {
      window.analytics.track(eventName, eventPayload);
    }
  } catch (error) {
    // Fail silently - analytics tracking should never break the app
    if (import.meta.env.DEV) {
      console.warn('App store tracking error:', error);
    }
  }
}

