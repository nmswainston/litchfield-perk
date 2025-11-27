# 📊 Analytics Setup Guide - Privacy-First Tracking

## 🎯 **Overview**

This guide covers the implementation of privacy-focused analytics for Litchfield Perk, tracking key user interactions without compromising user privacy. The system supports Plausible (primary), Fathom (alternative), and GA4 (fallback).

## 🔒 **Privacy-First Approach**

### **Why Privacy-Focused Analytics?**

- **GDPR Compliant**: No personal data collection
- **No Cookies**: Cookie-free tracking
- **User Respect**: Transparent data collection
- **Performance**: Lightweight and fast
- **Legal Compliance**: Meets privacy regulations

### **What We Track**:

- **CTA Clicks**: Shop Now, Visit Us, Follow Instagram
- **Menu Interactions**: Filter usage, category selections
- **Scroll Depth**: When users reach Reviews/Instagram sections
- **Contact Conversions**: Google Reviews, phone calls, visits
- **Review Navigation**: Carousel interactions, dot clicks

## 🛠️ **Analytics Services**

### **1. Plausible Analytics (Recommended)**

**Best for**: Privacy-focused, lightweight, GDPR compliant

#### **Setup Steps**:

1. **Sign up**: [plausible.io](https://plausible.io)
2. **Add domain**: `litchfieldperk.com`
3. **Get script**: Copy the provided script URL
4. **Update config**: In `src/utils/analytics.js`

```javascript
plausible: {
  domain: 'litchfieldperk.com',
  script: 'https://plausible.io/js/script.js',
  enabled: true
}
```

#### **Features**:

- **No Cookies**: Cookie-free tracking
- **GDPR Compliant**: No personal data
- **Lightweight**: <1KB script
- **Real-time**: Live dashboard
- **Goals**: Custom event tracking

### **2. Fathom Analytics (Alternative)**

**Best for**: Privacy-focused with more features

#### **Setup Steps**:

1. **Sign up**: [usefathom.com](https://usefathom.com)
2. **Create site**: Add your domain
3. **Get site ID**: Copy the site ID
4. **Update config**: In `src/utils/analytics.js`

```javascript
fathom: {
  siteId: 'YOUR_FATHOM_SITE_ID',
  script: 'https://cdn.usefathom.com/script.js',
  enabled: true
}
```

#### **Features**:

- **Privacy-First**: No personal data collection
- **GDPR Compliant**: EU privacy compliant
- **Goals**: Custom conversion tracking
- **Real-time**: Live visitor tracking

### **3. Google Analytics 4 (Fallback)**

**Best for**: Comprehensive analytics with privacy settings

#### **Setup Steps**:

1. **Create GA4 property**: [analytics.google.com](https://analytics.google.com)
2. **Get Measurement ID**: Copy the G-XXXXXXXXXX ID
3. **Update config**: In `src/utils/analytics.js`

```javascript
ga4: {
  measurementId: 'G-XXXXXXXXXX',
  enabled: true
}
```

#### **Privacy Settings**:

- **IP Anonymization**: Enabled
- **Ad Personalization**: Disabled
- **Google Signals**: Disabled
- **Data Retention**: Minimal

## 📈 **Event Tracking Implementation**

### **Current Events Tracked**:

#### **1. CTA Clicks**

```javascript
// Hero Section CTAs
analytics.trackCTAClick("shop_now", "hero");
analytics.trackCTAClick("visit_us", "hero");

// Header CTAs
analytics.trackCTAClick("shop_now", "header");
analytics.trackCTAClick("visit_us", "header");
```

#### **2. Menu Interactions**

```javascript
// Category filtering
analytics.trackMenuFilter("coffee", "filter");
analytics.trackMenuFilter("food", "filter");
analytics.trackMenuFilter("all", "filter");
```

#### **3. Scroll Depth**

```javascript
// Automatic tracking when sections become visible
analytics.trackScrollDepth("reviews", 75); // 75% scroll
analytics.trackScrollDepth("instagram", 90); // 90% scroll
```

#### **4. Contact Conversions**

```javascript
// Google Reviews link
analytics.trackContactConversion("google_reviews", "reviews_section");

// Phone number clicks
analytics.trackContactConversion("phone", "visit_section");

// Address clicks
analytics.trackContactConversion("address", "visit_section");
```

#### **5. Review Navigation**

```javascript
// Carousel navigation
analytics.trackReviewNavigation("next", 2);
analytics.trackReviewNavigation("prev", 1);
analytics.trackReviewNavigation("dot_click", 3);
```

#### **6. Instagram Follow**

```javascript
// Instagram follow button
analytics.trackInstagramFollow("instagram_section");
```

## 🔧 **Configuration**

### **Environment Variables** (Recommended):

```bash
# .env.local
REACT_APP_PLAUSIBLE_DOMAIN=litchfieldperk.com
REACT_APP_FATHOM_SITE_ID=YOUR_SITE_ID
REACT_APP_GA4_MEASUREMENT_ID=G-XXXXXXXXXX
```

### **Update Analytics Config**:

```javascript
// src/utils/analytics.js
const ANALYTICS_CONFIG = {
  plausible: {
    domain: process.env.REACT_APP_PLAUSIBLE_DOMAIN || "litchfieldperk.com",
    script: "https://plausible.io/js/script.js",
    enabled: true,
  },
  fathom: {
    siteId: process.env.REACT_APP_FATHOM_SITE_ID,
    script: "https://cdn.usefathom.com/script.js",
    enabled: false,
  },
  ga4: {
    measurementId: process.env.REACT_APP_GA4_MEASUREMENT_ID,
    enabled: false,
  },
};
```

## 📊 **Dashboard Setup**

### **Plausible Dashboard**:

1. **Login**: [plausible.io](https://plausible.io)
2. **Select Site**: Choose litchfieldperk.com
3. **View Metrics**: Real-time visitor data
4. **Set Goals**: Configure conversion tracking
5. **Export Data**: Download reports

### **Key Metrics to Monitor**:

- **Page Views**: Total site visits
- **Unique Visitors**: Individual users
- **Bounce Rate**: Single-page sessions
- **Goal Conversions**: CTA clicks, contact actions
- **Top Pages**: Most visited sections
- **Referrers**: Traffic sources

## 🎯 **Conversion Goals**

### **Primary Goals**:

1. **CTA Clicks**: Shop Now, Visit Us buttons
2. **Contact Actions**: Phone calls, address clicks
3. **Social Engagement**: Instagram follows
4. **Menu Engagement**: Filter usage, item views

### **Secondary Goals**:

1. **Scroll Depth**: Reviews and Instagram sections
2. **Review Interaction**: Carousel navigation
3. **Menu Exploration**: Category filtering

## 🚀 **Deployment Checklist**

### **Before Going Live**:

- [ ] Choose analytics service (Plausible recommended)
- [ ] Set up account and get credentials
- [ ] Update configuration in `analytics.js`
- [ ] Test event tracking in development
- [ ] Verify privacy compliance
- [ ] Set up conversion goals

### **Post-Deployment**:

- [ ] Verify analytics loading on live site
- [ ] Test all tracked events
- [ ] Monitor dashboard for data
- [ ] Set up alerts for key metrics
- [ ] Document tracking implementation

## 🔍 **Testing Analytics**

### **Development Testing**:

```javascript
// Open browser console and test events
analytics.trackCTAClick("shop_now", "hero");
analytics.trackMenuFilter("coffee", "filter");
analytics.trackScrollDepth("reviews", 75);
```

### **Production Verification**:

1. **Check Network Tab**: Verify analytics scripts load
2. **Test Events**: Click CTAs, use menu filters
3. **Monitor Dashboard**: See real-time data
4. **Verify Privacy**: No personal data collection

## 📈 **Analytics Insights**

### **What to Look For**:

- **High CTA Click Rate**: Good conversion optimization
- **Low Bounce Rate**: Engaging content
- **Menu Filter Usage**: User engagement with menu
- **Scroll Depth**: Content consumption patterns
- **Contact Conversions**: Business impact

### **Optimization Opportunities**:

- **A/B Test CTAs**: Different button text/colors
- **Improve Menu UX**: Based on filter usage
- **Content Strategy**: Based on scroll patterns
- **Contact Placement**: Based on conversion data

## 🛡️ **Privacy Compliance**

### **GDPR Compliance**:

- **No Personal Data**: No IP addresses, names, emails
- **No Cookies**: Cookie-free tracking
- **Transparent**: Clear about data collection
- **User Control**: Easy to opt-out

### **Privacy Policy Updates**:

```markdown
## Analytics

We use privacy-focused analytics to understand how visitors use our website.
This helps us improve our services without collecting personal information.

- No cookies are used
- No personal data is collected
- All data is anonymized
```

## 🎉 **Benefits**

### **Business Value**:

- **Conversion Tracking**: Measure business impact
- **User Behavior**: Understand customer journey
- **Content Optimization**: Improve user experience
- **ROI Measurement**: Track marketing effectiveness

### **Technical Benefits**:

- **Lightweight**: Minimal performance impact
- **Privacy-First**: User-friendly approach
- **Reliable**: Robust tracking system
- **Scalable**: Easy to add new events

Your analytics system is now **privacy-focused, comprehensive, and ready for production**! 🎉📊

## 📞 **Support Resources**

- **Plausible**: [docs.plausible.io](https://docs.plausible.io)
- **Fathom**: [usefathom.com/docs](https://usefathom.com/docs)
- **GA4**: [developers.google.com/analytics](https://developers.google.com/analytics)
