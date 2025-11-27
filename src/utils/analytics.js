/**
 * Analytics Utility
 * 
 * Privacy-focused analytics implementation supporting multiple providers.
 * Supports Plausible (primary), Fathom, and GA4 with automatic fallback system.
 * Includes event queuing for events fired before analytics loads.
 * 
 * @module utils/analytics
 */

// Analytics configuration
const ANALYTICS_CONFIG = {
  // Plausible (Privacy-first, GDPR compliant)
  plausible: {
    domain: 'litchfieldperk.com',
    script: 'https://plausible.io/js/script.js',
    enabled: true
  },
  
  // Fathom (Privacy-focused alternative)
  fathom: {
    siteId: 'YOUR_FATHOM_SITE_ID', // Replace with actual site ID
    script: 'https://cdn.usefathom.com/script.js',
    enabled: false // Enable if you prefer Fathom over Plausible
  },
  
  // Google Analytics 4 (Fallback)
  ga4: {
    measurementId: 'G-XXXXXXXXXX', // Replace with actual GA4 ID
    enabled: false // Enable if you want GA4 as primary or fallback
  }
};

// Event tracking configuration
const EVENTS = {
  CTA_CLICK: 'cta_click',
  MENU_EXPAND: 'menu_expand',
  SCROLL_REVIEWS: 'scroll_reviews',
  SCROLL_INSTAGRAM: 'scroll_instagram',
  CONTACT_CONVERSION: 'contact_conversion',
  MENU_FILTER: 'menu_filter',
  REVIEW_NAVIGATION: 'review_navigation',
  INSTAGRAM_FOLLOW: 'instagram_follow'
};

class Analytics {
  constructor() {
    this.isLoaded = false;
    this.queuedEvents = [];
    this.init();
  }

  /**
   * Initialize analytics based on configuration
   */
  init() {
    // Skip loading analytics on localhost to avoid console warnings
    if (this.isLocalhost()) {
      return;
    }

    // Load Plausible first (privacy-first)
    if (ANALYTICS_CONFIG.plausible.enabled) {
      this.loadPlausible();
    }
    
    // Load Fathom as alternative
    if (ANALYTICS_CONFIG.fathom.enabled && !this.isLoaded) {
      this.loadFathom();
    }
    
    // Load GA4 as fallback
    if (ANALYTICS_CONFIG.ga4.enabled && !this.isLoaded) {
      this.loadGA4();
    }
  }

  /**
   * Load Plausible Analytics
   */
  loadPlausible() {
    try {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = ANALYTICS_CONFIG.plausible.domain;
      script.src = ANALYTICS_CONFIG.plausible.script;
      
      script.onload = () => {
        this.isLoaded = true;
        this.processQueuedEvents();
        // Plausible Analytics loaded
      };
      
      script.onerror = () => {
        this.loadFallback();
      };
      
      document.head.appendChild(script);
    } catch (error) {
      this.loadFallback();
    }
  }

  /**
   * Load Fathom Analytics
   */
  loadFathom() {
    try {
      const script = document.createElement('script');
      script.src = ANALYTICS_CONFIG.fathom.script;
      script.setAttribute('data-site', ANALYTICS_CONFIG.fathom.siteId);
      script.setAttribute('data-spa', 'auto');
      
      script.onload = () => {
        this.isLoaded = true;
        this.processQueuedEvents();
        // Fathom Analytics loaded
      };
      
      script.onerror = () => {
        console.warn('❌ Fathom failed to load, trying GA4');
        this.loadGA4();
      };
      
      document.head.appendChild(script);
    } catch (error) {
      console.error('Error loading Fathom:', error);
      this.loadGA4();
    }
  }

  /**
   * Load Google Analytics 4
   */
  loadGA4() {
    try {
      // Load gtag script
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga4.measurementId}`;
      
      gtagScript.onload = () => {
        // Initialize gtag
        window.dataLayer = window.dataLayer || [];
        function gtag(){dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.ga4.measurementId, {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
        
        this.isLoaded = true;
        this.processQueuedEvents();
        // Google Analytics 4 loaded
      };
      
      gtagScript.onerror = () => {
        console.warn('❌ All analytics failed to load');
        this.isLoaded = false;
      };
      
      document.head.appendChild(gtagScript);
    } catch (error) {
      console.error('Error loading GA4:', error);
    }
  }

  /**
   * Load fallback analytics
   */
  loadFallback() {
    if (ANALYTICS_CONFIG.fathom.enabled) {
      this.loadFathom();
    } else if (ANALYTICS_CONFIG.ga4.enabled) {
      this.loadGA4();
    }
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
        ...properties
      }
    };

    if (this.isLoaded) {
      this.sendEvent(event);
    } else {
      this.queuedEvents.push(event);
    }
  }

  /**
   * Check if running in development/localhost environment
   * @returns {boolean} True if on localhost or 127.0.0.1
   */
  isLocalhost() {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' ||
           hostname === '';
  }

  /**
   * Send event to active analytics service
   * @param {Object} event - Event object
   */
  sendEvent(event) {
    // Skip tracking on localhost to avoid console warnings
    if (this.isLocalhost()) {
      return;
    }

    try {
      // Plausible
      if (window.plausible) {
        window.plausible(event.name, {
          props: event.properties
        });
      }
      
      // Fathom
      if (window.fathom) {
        window.fathom.trackGoal(event.name, 0);
      }
      
      // GA4
      if (window.gtag) {
        window.gtag('event', event.name, event.properties);
      }
      
      // Event tracked: event.name, event.properties
    } catch (error) {
      console.error('Error tracking event:', error);
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
      action: 'click'
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
      timestamp: Date.now()
    });
  }

  /**
   * Track scroll depth to specific sections
   * @param {string} section - Section reached (reviews, instagram)
   * @param {number} scrollPercent - Percentage of page scrolled
   */
  trackScrollDepth(section, scrollPercent) {
    this.track(section === 'reviews' ? EVENTS.SCROLL_REVIEWS : EVENTS.SCROLL_INSTAGRAM, {
      section: section,
      scroll_percent: scrollPercent,
      action: 'scroll_reach'
    });
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
      action: 'conversion'
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
      timestamp: Date.now()
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
      timestamp: Date.now()
    });
  }

  /**
   * Track Instagram follow clicks
   * @param {string} source - Where the follow button was clicked
   */
  trackInstagramFollow(source) {
    this.track(EVENTS.INSTAGRAM_FOLLOW, {
      source: source,
      action: 'follow_click'
    });
  }
}

// Create global analytics instance
const analytics = new Analytics();

// Export for use in components
export default analytics;
export { EVENTS };
