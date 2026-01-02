# Netlify Launch Checklist

## ✅ Completed Pre-Launch Fixes

### 1. Console Errors & Broken Routes
- ✅ **Fixed**: Resolved merge conflict in `public/404.html`
- ✅ **Fixed**: Added SPA catch-all route in `public/_redirects` for React Router
- ✅ **Verified**: Error boundaries in place for graceful error handling
- ✅ **Verified**: No console.log statements in production code (only in dev mode)

### 2. 404 Handling
- ✅ **Fixed**: Resolved merge conflict in `public/404.html`
- ✅ **Fixed**: Added proper SPA redirect rule: `/* /index.html 200`
- ✅ **Verified**: 404 page has proper styling and navigation back to homepage

### 3. SEO Basics
- ✅ **Fixed**: Updated OG image references from missing `og-image.jpg` to `logo-512.png`
- ✅ **Verified**: Title tags present and descriptive
- ✅ **Verified**: Meta descriptions present
- ✅ **Verified**: Open Graph tags configured
- ✅ **Verified**: Twitter Card tags configured
- ✅ **Verified**: Favicon set configured (multiple sizes)
- ✅ **Updated**: Added `/wholesale` route to `sitemap.xml`
- ✅ **Verified**: `robots.txt` properly configured

### 4. Mobile Navigation
- ✅ **Fixed**: Added body scroll prevention when mobile menu is open
- ✅ **Verified**: Mobile menu uses fixed positioning (no layout shifts)
- ✅ **Verified**: Header has fixed height (80px) to prevent shifts
- ✅ **Verified**: Mobile menu closes on scroll and link clicks

### 5. Forms
- ✅ **Fixed**: ContactModal now clearly indicates demo mode
- ✅ **Added**: Warning banner in form modal about demo status
- ✅ **Updated**: Alert message includes phone number for immediate contact
- ✅ **Note**: Form currently shows alert - backend integration needed for production

### 6. Links Verification
- ✅ **Internal Links**: All hash navigation links verified (#menu, #hours, #visit, #reviews)
- ✅ **Internal Routes**: `/` and `/wholesale` routes configured
- ✅ **External Links**: 
  - Phone: `tel:+14808234073` ✅
  - Email: `mailto:hello@litchfieldperk.com` ✅
  - Instagram: `https://www.instagram.com/litchfieldperk/` ⚠️ (needs verification)
  - Facebook: `https://www.facebook.com/litchfieldperk` ⚠️ (needs verification)
  - Google Maps: Dynamic based on address ✅
  - Google Reviews: `https://www.google.com/search?q=Litchfield+Perk+Litchfield+Park+reviews` ✅
  - Order Button: Currently points to `https://litchfieldperk.com` ⚠️ (may need actual ordering URL)

---

## ⚠️ Items Requiring Business Input

### 1. **Ordering URL** (High Priority)
- **Current**: Order button links to `https://litchfieldperk.com`
- **Action Needed**: Update `BUSINESS_INFO.contact.website` in `src/constants/business.js` with actual ordering platform URL (e.g., Toast, Square, etc.)
- **Location**: `src/constants/business.js` line 19

### 2. **Social Media Links** (Medium Priority)
- **Instagram**: Verify `https://www.instagram.com/litchfieldperk/` is correct
- **Facebook**: Verify `https://www.facebook.com/litchfieldperk` is correct
- **Location**: `src/constants/business.js` lines 23-30

### 3. **Contact Form Backend** (Medium Priority)
- **Current**: Form shows demo alert
- **Action Needed**: 
  - Set up Netlify Forms OR
  - Integrate with email service (SendGrid, Mailgun, etc.) OR
  - Set up serverless function for form submission
- **Location**: `src/components/ui/ContactModal.jsx`

### 4. **OG Image** (Low Priority)
- **Current**: Using `logo-512.png` as OG image
- **Recommendation**: Create a dedicated 1200x630px OG image for better social sharing
- **Action**: Create `public/og-image.jpg` and update references in `index.html`

### 5. **Analytics Configuration** (Low Priority)
- **Current**: Analytics setup exists but may need configuration
- **Action**: Verify Plausible/Fathom/GA4 is properly configured with correct site ID
- **Location**: `src/utils/analytics.js`

---

## 📋 Pre-Launch Testing Checklist

### Manual Testing Required

#### Desktop Testing
- [ ] Test all navigation links (Menu, Hours, Visit, Reviews, Wholesale)
- [ ] Test hash navigation from different pages
- [ ] Test Order button (verify it goes to correct URL)
- [ ] Test phone number links
- [ ] Test email links
- [ ] Test social media links (Instagram, Facebook)
- [ ] Test Google Maps link
- [ ] Test "See all reviews" link
- [ ] Test wholesale page navigation
- [ ] Test PDF download link (`/docs/litchfield-perk-wholesale-partner-program.pdf`)
- [ ] Test contact form modal (verify demo message appears)
- [ ] Test 404 page by visiting non-existent route

#### Mobile Testing
- [ ] Test mobile menu open/close
- [ ] Verify mobile menu doesn't cause layout shifts
- [ ] Test mobile menu links
- [ ] Verify body scroll is prevented when menu is open
- [ ] Test all buttons and links on mobile
- [ ] Test form on mobile devices
- [ ] Verify responsive images load correctly

#### Cross-Browser Testing
- [ ] Chrome/Edge (latest)
- [ ] Firefox (latest)
- [ ] Safari (latest)
- [ ] Mobile Safari (iOS)
- [ ] Chrome Mobile (Android)

#### Performance Testing
- [ ] Run Lighthouse audit (Performance, Accessibility, SEO, Best Practices)
- [ ] Verify images are optimized and loading correctly
- [ ] Check Core Web Vitals (LCP, FID, CLS)
- [ ] Verify no console errors in production build

#### SEO Testing
- [ ] Verify meta tags in page source
- [ ] Test Open Graph tags with [Facebook Sharing Debugger](https://developers.facebook.com/tools/debug/)
- [ ] Test Twitter Card with [Twitter Card Validator](https://cards-dev.twitter.com/validator)
- [ ] Verify structured data with [Google Rich Results Test](https://search.google.com/test/rich-results)
- [ ] Submit sitemap to Google Search Console (after launch)

---

## 🚀 Netlify Deployment Steps

1. **Build Verification**
   ```bash
   npm run build
   ```
   - Verify build completes without errors
   - Check `dist/` folder contains all necessary files

2. **Netlify Configuration**
   - ✅ `netlify.toml` configured with build settings
   - ✅ Build command: `npm ci && npm run build`
   - ✅ Publish directory: `dist`
   - ✅ Node version: 20

3. **Environment Variables** (if needed)
   - Set in Netlify dashboard under Site settings > Environment variables
   - Check if any API keys need to be configured

4. **Deploy**
   - Push to connected Git repository OR
   - Deploy via Netlify CLI: `netlify deploy --prod`

5. **Post-Deployment Verification**
   - [ ] Visit live site and test all functionality
   - [ ] Verify HTTPS is enabled
   - [ ] Test 404 handling
   - [ ] Verify all assets load correctly
   - [ ] Check mobile responsiveness
   - [ ] Test form submission (if backend is set up)

---

## 📝 Post-Launch Tasks

1. **Submit Sitemap**
   - Submit `https://litchfieldperk.com/sitemap.xml` to Google Search Console
   - Submit to Bing Webmaster Tools

2. **Monitor Analytics**
   - Verify analytics tracking is working
   - Set up alerts for errors (if available)

3. **Set Up Monitoring**
   - Configure uptime monitoring (Netlify provides basic monitoring)
   - Set up error tracking (if using service like Sentry)

4. **Social Media**
   - Update social media profiles with new website URL
   - Share launch announcement

---

## 🔧 Technical Notes

### Files Modified for Launch
- `public/404.html` - Fixed merge conflict
- `public/_redirects` - Added SPA catch-all route
- `index.html` - Updated OG image references
- `public/sitemap.xml` - Added `/wholesale` route
- `src/components/ui/ContactModal.jsx` - Added demo mode warning
- `src/components/layout/ScrollHeader.jsx` - Added body scroll prevention

### Known Limitations
- Contact form is in demo mode (requires backend integration)
- Order button may need URL update if ordering platform differs
- OG image is using logo instead of dedicated social image

---

## ✅ Launch Readiness Status

**Status**: 🟡 **Ready with Minor Items**

**Blockers**: None

**Recommendations Before Launch**:
1. Update ordering URL if different from website
2. Verify social media links are correct
3. Test on actual devices (not just browser dev tools)

**Can Launch**: Yes, with understanding that form is demo mode and ordering URL may need update.

