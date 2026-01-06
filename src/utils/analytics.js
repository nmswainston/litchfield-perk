const ANALYTICS_CONFIG = {
  plausible: {
    domain: 'litchfieldperk.com',
    script: 'https://plausible.io/js/script.js',
    enabled: true
  },
  fathom: {
    siteId: 'YOUR_FATHOM_SITE_ID',
    script: 'https://cdn.usefathom.com/script.js',
    enabled: false
  },
  ga4: {
    measurementId: 'G-XXXXXXXXXX',
    enabled: false
  }
};

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

  init() {
    if (this.isLocalhost()) {
      return;
    }

    if (ANALYTICS_CONFIG.plausible.enabled) {
      this.loadPlausible();
    }
    
    if (ANALYTICS_CONFIG.fathom.enabled && !this.isLoaded) {
      this.loadFathom();
    }
    
    if (ANALYTICS_CONFIG.ga4.enabled && !this.isLoaded) {
      this.loadGA4();
    }
  }

  loadPlausible() {
    try {
      const script = document.createElement('script');
      script.defer = true;
      script.dataset.domain = ANALYTICS_CONFIG.plausible.domain;
      script.src = ANALYTICS_CONFIG.plausible.script;
      
      script.onload = () => {
        this.isLoaded = true;
        this.processQueuedEvents();
      };
      
      script.onerror = () => {
        this.loadFallback();
      };
      
      document.head.appendChild(script);
    } catch {
      this.loadFallback();
    }
  }

  loadFathom() {
    try {
      const script = document.createElement('script');
      script.src = ANALYTICS_CONFIG.fathom.script;
      script.setAttribute('data-site', ANALYTICS_CONFIG.fathom.siteId);
      script.setAttribute('data-spa', 'auto');
      
      script.onload = () => {
        this.isLoaded = true;
        this.processQueuedEvents();
      };
      
      script.onerror = () => {
        this.loadGA4();
      };
      
      document.head.appendChild(script);
    } catch {
      this.loadGA4();
    }
  }

  loadGA4() {
    try {
      const gtagScript = document.createElement('script');
      gtagScript.async = true;
      gtagScript.src = `https://www.googletagmanager.com/gtag/js?id=${ANALYTICS_CONFIG.ga4.measurementId}`;
      
      gtagScript.onload = () => {
        window.dataLayer = window.dataLayer || [];
        function gtag(){window.dataLayer.push(arguments);}
        window.gtag = gtag;
        gtag('js', new Date());
        gtag('config', ANALYTICS_CONFIG.ga4.measurementId, {
          anonymize_ip: true,
          allow_google_signals: false,
          allow_ad_personalization_signals: false
        });
        
        this.isLoaded = true;
        this.processQueuedEvents();
      };
      
      gtagScript.onerror = () => {
        if (import.meta.env.DEV) {
          console.warn('❌ All analytics failed to load');
        }
        this.isLoaded = false;
      };
      
      document.head.appendChild(gtagScript);
    } catch {
    }
  }

  loadFallback() {
    if (ANALYTICS_CONFIG.fathom.enabled) {
      this.loadFathom();
    } else if (ANALYTICS_CONFIG.ga4.enabled) {
      this.loadGA4();
    }
  }

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

  isLocalhost() {
    const hostname = window.location.hostname;
    return hostname === 'localhost' || 
           hostname === '127.0.0.1' ||
           hostname === '';
  }

  sendEvent(event) {
    if (this.isLocalhost()) {
      return;
    }

    try {
      if (window.plausible) {
        window.plausible(event.name, {
          props: event.properties
        });
      }
      
      if (window.fathom) {
        window.fathom.trackGoal(event.name, 0);
      }
      
      if (window.gtag) {
        window.gtag('event', event.name, event.properties);
      }
    } catch {
    }
  }

  processQueuedEvents() {
    while (this.queuedEvents.length > 0) {
      const event = this.queuedEvents.shift();
      this.sendEvent(event);
    }
  }

  trackCTAClick(ctaType, location) {
    this.track(EVENTS.CTA_CLICK, {
      cta_type: ctaType,
      location: location,
      action: 'click'
    });
  }

  trackMenuExpand(action, section) {
    this.track(EVENTS.MENU_EXPAND, {
      action: action,
      section: section,
      timestamp: Date.now()
    });
  }

  trackScrollDepth(section, scrollPercent) {
    this.track(section === 'reviews' ? EVENTS.SCROLL_REVIEWS : EVENTS.SCROLL_INSTAGRAM, {
      section: section,
      scroll_percent: scrollPercent,
      action: 'scroll_reach'
    });
  }

  trackContactConversion(method, source) {
    this.track(EVENTS.CONTACT_CONVERSION, {
      method: method,
      source: source,
      action: 'conversion'
    });
  }

  trackMenuFilter(category, action) {
    this.track(EVENTS.MENU_FILTER, {
      category: category,
      action: action,
      timestamp: Date.now()
    });
  }

  trackReviewNavigation(action, reviewIndex) {
    this.track(EVENTS.REVIEW_NAVIGATION, {
      action: action,
      review_index: reviewIndex,
      timestamp: Date.now()
    });
  }

  trackInstagramFollow(source) {
    this.track(EVENTS.INSTAGRAM_FOLLOW, {
      source: source,
      action: 'follow_click'
    });
  }
}

const analytics = new Analytics();

export default analytics;
export { EVENTS };
