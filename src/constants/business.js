export const BUSINESS_INFO = {
  name: "Litchfield Perk",
  tagline: "Litchfield Park's Friendly Neighborhood Cafe",
  description:
    "Fresh coffee, baked goods, and good vibes. Explore our menu and see today's specials.",

  address: {
    street: "4870 N. Litchfield Rd. Ste. 103",
    city: "Litchfield Park",
    state: "AZ",
    zip: "85340",
    full: "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340",
  },

  contact: {
    phone: "(602) 999-3250",
    email: "hello@litchfieldperk.com",
    website: "https://www.litchfieldperk.com",
  },

  social: {
    instagram: {
      handle: "@litchfieldperk",
      url: "https://www.instagram.com/litchfieldperk/",
    },
    facebook: {
      handle: "litchfieldperk",
      url: "https://www.facebook.com/p/Litchfield-Perk-61576307554018/",
    },
    tiktok: {
      handle: "@litchfieldperk",
      url: "https://www.tiktok.com/@litchfieldperk",
    },
  },

  hours: {
    mondayThursday: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday"],
      open: "07:00",
      close: "14:00",
    },
    fridaySaturday: {
      days: ["Friday", "Saturday"],
      open: "07:00",
      close: "15:00",
    },
    sunday: {
      closed: true,
    },
  },

  cuisine: "Coffee, Tea, Gelato",
  priceRange: "$$",
};

export const SEO_CONFIG = {
  title: "Litchfield Perk — Litchfield Park's Friendly Neighborhood Cafe",
  description:
    "Fresh coffee, baked goods, and good vibes. Explore our menu and see today's specials.",
  keywords:
    "coffee, cafe, Litchfield Park, Arizona, specialty coffee, cold brew, latte, cappuccino, neighborhood cafe, gelato friendly service",
  canonical: "https://litchfieldperk.com/",
  ogImage: "/logo-512.png",
};

export const THEME = {
  colors: {
    primary: "var(--color-brand-500)",
    secondary: "var(--ink)",
    background: "var(--paper)",
    text: "var(--color-brand-text)",
    textSecondary: "var(--color-brand-text-muted)",
    border: "var(--color-brand-border)",
  },

  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px",
  },

  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1200px",
  },

  typography: {
    fontFamily: "var(--font-family-sans)",
    headingSizes: {
      h1: "clamp(36px, 5vw, 56px)",
      h2: "clamp(32px, 4vw, 48px)",
      h3: "clamp(24px, 3vw, 36px)",
    },
  },
};

export const APP_NAME = "Litchfield Perk";
export const APP_ANDROID_URL = "https://play.google.com/store/apps/details?id=co.frostbyte.litchfieldperk&pcampaignid=web_share";
export const APP_IOS_URL = "https://apps.apple.com/us/app/litchfield-perk/id6747682541";

export const APP_STORE_URL = APP_ANDROID_URL;

export const ORDERING_URL = BUSINESS_INFO.contact.website;
export const PHONE_NUMBER = BUSINESS_INFO.contact.phone;
export const INSTAGRAM_HANDLE = BUSINESS_INFO.social.instagram.handle;
export const INSTAGRAM_URL = BUSINESS_INFO.social.instagram.url;

export const STORE_URL = "https://litchfield-perk-coffee-co.myshopify.com/";
