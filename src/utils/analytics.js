/**
 * Privacy-focused analytics implementation
 * Supports Plausible, Fathom, and GA4 with fallback system
 */

// Analytics configuration - Privacy-first approach
const ANALYTICS_CONFIG = {
  // Netlify Analytics (Privacy-friendly, built-in)
  netlify: {
    enabled: true, // Automatically enabled on Netlify
    script: null, // No external script needed
  },

  // Plausible (Privacy-first, GDPR compliant, minimal data)
  plausible: {
    domain: "litchfieldperk.com",
    script: "https://plausible.io/js/script.js",
    enabled: true,
  },

  // Fathom (Privacy-focused alternative)
  fathom: {
    siteId: "YOUR_FATHOM_SITE_ID", // Replace with actual site ID
    script: "https://cdn.usefathom.com/script.js",
    enabled: false, // Enable if you prefer Fathom over Plausible
  },
};

// Event tracking configuration
const EVENTS = {
  CTA_CLICK: "cta_click",
  MENU_EXPAND: "menu_expand",
  SCROLL_REVIEWS: "scroll_reviews",
  SCROLL_INSTAGRAM: "scroll_instagram",
  CONTACT_CONVERSION: "contact_conversion",
  MENU_FILTER: "menu_filter",
  REVIEW_NAVIGATION: "review_navigation",
  INSTAGRAM_FOLLOW: "instagram_follow",
};

class Analytics {
  constructor() {
    this.isLoaded = false;
    this.queuedEvents = [];
    this.init();
  }

  /**
   * Initialize analytics based on configuration
   * Prioritizes privacy-friendly options with defer loading
   */
  init() {
    // Netlify Analytics is automatically enabled on Netlify
    if (ANALYTICS_CONFIG.netlify.enabled) {
      this.isLoaded = true; // Netlify Analytics works without script loading
      console.log("✅ Netlify Analytics enabled (automatic)");
    }

    // Load Plausible with defer loading (privacy-first)
    if (ANALYTICS_CONFIG.plausible.enabled) {
      this.loadPlausible();
    }

    // Load Fathom as alternative
    if (ANALYTICS_CONFIG.fathom.enabled && !this.isLoaded) {
      this.loadFathom();
    }
  }

  /**
   * Load Plausible Analytics with defer loading and no layout shift
   */
  loadPlausible() {
    try {
      // Use requestIdleCallback for non-blocking loading
      const loadScript = () => {
        const script = document.createElement("script");
        script.defer = true;
        script.async = true;
        script.dataset.domain = ANALYTICS_CONFIG.plausible.domain;
        script.src = ANALYTICS_CONFIG.plausible.script;

        // Add data attributes for privacy
        script.dataset.api = "https://plausible.io/api/event";
        script.dataset.src = ANALYTICS_CONFIG.plausible.script;

        script.onload = () => {
          this.isLoaded = true;
          this.processQueuedEvents();
          console.log("✅ Plausible Analytics loaded (deferred)");
        };

        script.onerror = () => {
          console.warn(
            "❌ Plausible failed to load, using Netlify Analytics only",
          );
          // Don't load fallback, just use Netlify Analytics
        };

        document.head.appendChild(script);
      };

      // Load after page is idle or after 2 seconds
      if (window.requestIdleCallback) {
        window.requestIdleCallback(loadScript, { timeout: 2000 });
      } else {
        setTimeout(loadScript, 100);
      }
    } catch (error) {
      console.error("Error loading Plausible:", error);
    }
  }

  /**
   * Load Fathom Analytics
   */
  loadFathom() {
    try {
      const script = document.createElement("script");
      script.src = ANALYTICS_CONFIG.fathom.script;
      script.setAttribute("data-site", ANALYTICS_CONFIG.fathom.siteId);
      script.setAttribute("data-spa", "auto");

      script.onload = () => {
        this.isLoaded = true;
        this.processQueuedEvents();
        console.log("✅ Fathom Analytics loaded");
      };

      script.onerror = () => {
        console.warn("❌ Fathom failed to load, using Netlify Analytics only");
        // Netlify Analytics is always available as fallback
      };

      document.head.appendChild(script);
    } catch (error) {
      console.error("Error loading Fathom:", error);
      // Netlify Analytics is always available as fallback
    }
  }

  /**
   * Load fallback analytics (privacy-friendly only)
   */
  loadFallback() {
    if (ANALYTICS_CONFIG.fathom.enabled) {
      this.loadFathom();
    }
    // Netlify Analytics is always available as fallback
  }

  /**
   * Track custom event
   * @param {string} eventName - Event name
   * @param {Object} properties - Event properties
   */
  track(eventName, properties = {}) {
    const event = {
      name: eventName,
      properties: {
        timestamp: new Date().toISOString(),
        url: window.location.href,
        ...properties,
      },
    };

    if (this.isLoaded) {
      this.sendEvent(event);
    } else {
      this.queuedEvents.push(event);
    }
  }

  /**
   * Send event to active analytics service
   * @param {Object} event - Event object
   */
  sendEvent(event) {
    try {
      // Plausible
      if (window.plausible) {
        window.plausible(event.name, {
          props: event.properties,
        });
      }

      // Fathom
      if (window.fathom) {
        window.fathom.trackGoal(event.name, 0);
      }

      // Netlify Analytics (automatic, no script needed)
      // Events are automatically tracked by Netlify

      console.log("📊 Event tracked:", event.name, event.properties);
    } catch (error) {
      console.error("Error tracking event:", error);
    }
  }

  /**
   * Process queued events
   */
  processQueuedEvents() {
    while (this.queuedEvents.length > 0) {
      const event = this.queuedEvents.shift();
      this.sendEvent(event);
    }
  }

  // Specific event tracking methods

  /**
   * Track CTA button clicks
   * @param {string} ctaType - Type of CTA (shop_now, visit_us, follow_instagram)
   * @param {string} location - Where the CTA was clicked (hero, header, footer)
   */
  trackCTAClick(ctaType, location) {
    this.track(EVENTS.CTA_CLICK, {
      cta_type: ctaType,
      location: location,
      action: "click",
    });
  }

  /**
   * Track menu expansion/collapse
   * @param {string} action - 'expand' or 'collapse'
   * @param {string} section - Which menu section
   */
  trackMenuExpand(action, section) {
    this.track(EVENTS.MENU_EXPAND, {
      action: action,
      section: section,
      timestamp: Date.now(),
    });
  }

  /**
   * Track scroll depth to specific sections
   * @param {string} section - Section reached (reviews, instagram)
   * @param {number} scrollPercent - Percentage of page scrolled
   */
  trackScrollDepth(section, scrollPercent) {
    this.track(
      section === "reviews" ? EVENTS.SCROLL_REVIEWS : EVENTS.SCROLL_INSTAGRAM,
      {
        section: section,
        scroll_percent: scrollPercent,
        action: "scroll_reach",
      },
    );
  }

  /**
   * Track contact conversions
   * @param {string} method - Contact method (phone, email, visit)
   * @param {string} source - Where the contact was initiated
   */
  trackContactConversion(method, source) {
    this.track(EVENTS.CONTACT_CONVERSION, {
      method: method,
      source: source,
      action: "conversion",
    });
  }

  /**
   * Track menu filter usage
   * @param {string} category - Filter category selected
   * @param {string} action - 'filter' or 'clear'
   */
  trackMenuFilter(category, action) {
    this.track(EVENTS.MENU_FILTER, {
      category: category,
      action: action,
      timestamp: Date.now(),
    });
  }

  /**
   * Track review carousel navigation
   * @param {string} action - 'next', 'prev', 'dot_click'
   * @param {number} reviewIndex - Which review was selected
   */
  trackReviewNavigation(action, reviewIndex) {
    this.track(EVENTS.REVIEW_NAVIGATION, {
      action: action,
      review_index: reviewIndex,
      timestamp: Date.now(),
    });
  }

  /**
   * Track Instagram follow clicks
   * @param {string} source - Where the follow button was clicked
   */
  trackInstagramFollow(source) {
    this.track(EVENTS.INSTAGRAM_FOLLOW, {
      source: source,
      action: "follow_click",
    });
  }
}

// Create global analytics instance
const analytics = new Analytics();

// Export for use in components
export default analytics;
export { EVENTS };
