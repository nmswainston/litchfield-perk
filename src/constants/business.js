// Business Information Constants
export const BUSINESS_INFO = {
  name: "Litchfield Perk",
  tagline: "Litchfield Park's Friendly Neighborhood Cafe",
  description: "Fresh coffee, baked goods, and good vibes. Order ahead, check our menu, and see today's specials.",
  
  address: {
    street: "4870 N. Litchfield Rd. Ste. 103",
    city: "Litchfield Park",
    state: "AZ",
    zip: "85340",
    full: "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340"
  },
  
  contact: {
    phone: "(480) 823-4073",
    email: "hello@litchfieldperk.com",
    website: "https://litchfieldperk.com"
  },
  
  social: {
    instagram: {
      handle: "@litchfieldperk",
      url: "https://www.instagram.com/litchfieldperk/"
    },
    facebook: {
      handle: "litchfieldperk",
      url: "https://www.facebook.com/litchfieldperk"
    }
  },
  
  hours: {
    weekdays: {
      days: ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday"],
      open: "06:00",
      close: "18:00"
    },
    weekends: {
      days: ["Saturday", "Sunday"],
      open: "07:00",
      close: "15:00"
    }
  },
  
  cuisine: "Coffee, Pastry",
  priceRange: "$$"
};

export const SEO_CONFIG = {
  title: "Litchfield Perk — Litchfield Park's Friendly Neighborhood Cafe",
  description: "Fresh coffee, baked goods, and good vibes. Order ahead, check our menu, and see today's specials.",
  keywords: "coffee, cafe, Litchfield Park, Arizona, specialty coffee, cold brew, latte, cappuccino, neighborhood cafe, gelato friendly service",
  canonical: "https://litchfieldperk.com/",
  ogImage: "https://litchfieldperk.com/og-image.jpg"
};

export const THEME = {
  colors: {
    primary: "#00d294",
    secondary: "#000000",
    background: "#ffffff",
    text: "#000000",
    textSecondary: "#666666",
    border: "#e0e0e0"
  },
  
  spacing: {
    xs: "4px",
    sm: "8px",
    md: "16px",
    lg: "24px",
    xl: "32px",
    xxl: "48px"
  },
  
  breakpoints: {
    mobile: "768px",
    tablet: "1024px",
    desktop: "1200px"
  },
  
  typography: {
    fontFamily: "Arial, sans-serif",
    headingSizes: {
      h1: "clamp(36px, 5vw, 56px)",
      h2: "clamp(32px, 4vw, 48px)",
      h3: "clamp(24px, 3vw, 36px)"
    }
  }
};
