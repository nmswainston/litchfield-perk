# Deploy Readiness Review Report
**Date:** 2026-01-02  
**Reviewer:** Senior Engineer Preflight Check  
**Status:** ⚠️ **Deployable with known risks**

---

## Step 1: Stack + Deploy Target Summary

### Stack Summary
- **Framework:** React 19.1.1 with Vite 5.4.20
- **Styling:** Tailwind CSS v4.0.0
- **Routing:** React Router DOM v6.28.0
- **Hosting:** Netlify
- **Build Tool:** Vite

### Build Configuration
- **Build Command:** `npm ci && npm run build` (configured in `netlify.toml`)
- **Publish Directory:** `dist`
- **Node Version:** 20 (configured in `netlify.toml` → `[build.environment]`)
- **SPA Routing:** Configured via `public/_redirects` with `/*   /index.html   200`

### Netlify Configuration
✅ `netlify.toml` properly configured  
✅ Security headers configured  
✅ Caching headers configured  
✅ SPA redirects configured  

---

## Step 2: Build and Runtime Sanity Checks

### ✅ Build Configuration
- Build command exists in `package.json`: `"build": "vite build"`
- Netlify build command matches: `npm ci && npm run build`
- Node version specified: `>=20` in `package.json`, `20` in `netlify.toml`

### ⚠️ Issues Found

#### BLOCKER: Incorrect CSS Asset Path
**File:** `src/index.css:557`  
**Issue:** CSS references `/public/seamless-background.png` but in production, `public/` is the root, so this path will 404.  
**Fix:**
```css
/* Line 557 - CHANGE FROM: */
background-image: url('/public/seamless-background.png');

/* TO: */
background-image: url('/seamless-background.png');
```

#### HIGH: Missing OG Image
**File:** `src/constants/business.js:64`  
**Issue:** `ogImage: "/og.jpg"` is referenced but file doesn't exist in `public/`  
**Impact:** Social media shares will have no preview image  
**Fix Options:**
1. Create `/public/og.jpg` (recommended: 1200x630px)
2. Or update `business.js` to use existing logo: `ogImage: "/logo-512.png"`

#### MEDIUM: Duplicate Netlify Function
**Files:** 
- `netlify/functions/google-reviews.js` (✅ used)
- `netlify/functions/reviews.js` (❌ unused, different API shape)

**Issue:** `reviews.js` exists but is never called. Only `google-reviews.js` is used.  
**Risk:** Confusion, maintenance burden, potential accidental usage  
**Fix:** Delete `netlify/functions/reviews.js`

#### MEDIUM: Unused Image File
**File:** `public/images/optimized/logo-512-desktop 1.png`  
**Issue:** File with space in name, likely accidental duplicate  
**Fix:** Delete this file

#### LOW: Missing Apple Touch Icons
**File:** `index.html:47-54`  
**Issue:** References multiple apple-touch-icon sizes that don't exist:
- `apple-touch-icon-152x152.png`
- `apple-touch-icon-144x144.png`
- `apple-touch-icon-120x120.png`
- `apple-touch-icon-114x114.png`
- `apple-touch-icon-76x76.png`
- `apple-touch-icon-72x72.png`
- `apple-touch-icon-60x60.png`
- `apple-touch-icon-57x57.png`

**Impact:** 404s on older iOS devices (non-critical, modern iOS uses 180x180)  
**Fix:** Remove these lines or create the files

#### LOW: Missing Android Chrome 512x512 Icon
**File:** `index.html:58`  
**Issue:** References `/android-chrome-512x512.png` but file doesn't exist  
**Impact:** Missing high-res icon for Android  
**Fix:** Create file or remove the reference

---

## Step 3: Environment Variables + Secrets Audit

### Environment Variables Table

| Name | Where Used | Required? | Default? | Notes |
|------|------------|-----------|----------|-------|
| `GOOGLE_PLACES_API_KEY` | `netlify/functions/google-reviews.js:10` | ✅ Yes | None | Server-side only |
| `GOOGLE_PLACE_ID` | `netlify/functions/google-reviews.js:9` | ✅ Yes | None | Server-side only |
| `import.meta.env.DEV` | Multiple files | ✅ Built-in | Vite auto | Development flag (safe) |

### ✅ Security Status
- ✅ No hardcoded secrets found
- ✅ API keys only used server-side in Netlify functions
- ✅ Client-side code uses `import.meta.env.DEV` only (Vite built-in, safe)
- ✅ All `target="_blank"` links have `rel="noopener noreferrer"`

### ⚠️ Documentation Gap
**Issue:** No `.env.example` file  
**Impact:** New developers won't know what env vars are needed  
**Fix:** Create `.env.example`:
```bash
# Netlify Environment Variables
# Set these in Netlify Dashboard → Site settings → Environment variables

# Google Places API (required for reviews)
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

**Note:** README.md documents env vars, but `.env.example` is best practice.

---

## Step 4: Netlify Readiness Checks

### ✅ Configuration Verified
- ✅ Build command: `npm ci && npm run build`
- ✅ Publish directory: `dist`
- ✅ Node version: `20`
- ✅ SPA routing: `public/_redirects` with `/*   /index.html   200`
- ✅ 404 page: `public/404.html` exists
- ✅ Security headers configured
- ✅ Caching headers configured
- ✅ Netlify functions directory: `netlify/functions/`

### ⚠️ Function Verification Needed
**Action Required:** Verify `netlify/functions/google-reviews.js` is correctly deployed  
**Test:** After deploy, test `https://your-site.netlify.app/.netlify/functions/google-reviews`

---

## Step 5: UX and Content "Ship It" Checks

### ✅ Navigation & Links
- ✅ All navigation links have proper `href` attributes
- ✅ Hash navigation works (`#menu`, `#hours`, `#visit`, `#reviews`)
- ✅ External links have `target="_blank"` and `rel="noopener noreferrer"`
- ✅ Phone links use `tel:` protocol
- ✅ App store links are valid URLs

### ✅ Accessibility
- ✅ Skip links present (`#main-content`, `#menu`)
- ✅ Alt text on images
- ✅ ARIA labels on interactive elements
- ✅ Semantic HTML structure
- ✅ Focus states on interactive elements

### ✅ Meta Tags
- ✅ Title tag present
- ✅ Meta description present
- ✅ Open Graph tags present
- ⚠️ OG image missing (see Step 2)
- ✅ Twitter card tags present
- ✅ Canonical URL set
- ✅ Structured data (JSON-LD) present

### ✅ Error Handling
- ✅ Error boundaries wrap all major sections
- ✅ Reviews section handles empty state gracefully
- ✅ 404 page exists and is user-friendly

---

## Step 6: Performance and Bundle Red Flags

### ✅ Image Optimization
- ✅ Images optimized with WebP format
- ✅ Responsive image sizes (mobile/desktop)
- ✅ Lazy loading on images
- ⚠️ One unused image file (see Step 2)

### ✅ Bundle Analysis
- ✅ No obvious large library imports
- ✅ Lucide React icons (tree-shakeable)
- ✅ React Router (necessary for routing)
- ✅ No full icon packs imported

### ⚠️ Minor Issues
- Unused Netlify function adds to bundle size (minimal impact)
- Missing OG image will cause extra request/404

---

## Step 7: Final Verdict

### Status: ⚠️ **Deployable with known risks**

The site is **functionally ready** to deploy, but has several issues that should be addressed:

1. **One blocker** (CSS path) that will cause a visual issue
2. **One high-priority** issue (missing OG image) affecting social shares
3. **Several medium-priority** cleanup items (unused files)
4. **Low-priority** missing icon files (non-critical)

---

## Prioritized Punch List

### 🔴 BLOCKER (Fix Before Deploy)

#### 1. Fix CSS Asset Path
**File:** `src/index.css:557`  
**What's wrong:** Incorrect path `/public/seamless-background.png` will 404 in production  
**Fix:**
```diff
-  background-image: url('/public/seamless-background.png');
+  background-image: url('/seamless-background.png');
```

---

### 🟠 HIGH PRIORITY (Fix Before Deploy)

#### 2. Create or Update OG Image Reference
**File:** `src/constants/business.js:64`  
**What's wrong:** `ogImage: "/og.jpg"` references non-existent file  
**Fix Option A (Create OG Image):**
- Create `public/og.jpg` (1200x630px recommended)
- Use logo or cafe photo

**Fix Option B (Use Existing Logo):**
```diff
-  ogImage: "/og.jpg",
+  ogImage: "/logo-512.png",
```

---

### 🟡 MEDIUM PRIORITY (Recommended Before Deploy)

#### 3. Remove Unused Netlify Function
**File:** `netlify/functions/reviews.js`  
**What's wrong:** Unused function, different API shape than `google-reviews.js`  
**Fix:** Delete the file

#### 4. Remove Unused Image File
**File:** `public/images/optimized/logo-512-desktop 1.png`  
**What's wrong:** Accidental duplicate with space in filename  
**Fix:** Delete the file

#### 5. Create .env.example File
**File:** `.env.example` (new file)  
**What's wrong:** Missing documentation for environment variables  
**Fix:** Create file with:
```bash
# Netlify Environment Variables
# Set these in Netlify Dashboard → Site settings → Environment variables

# Google Places API (required for reviews)
GOOGLE_PLACES_API_KEY=your_api_key_here
GOOGLE_PLACE_ID=your_place_id_here
```

---

### 🟢 LOW PRIORITY (Nice to Have)

#### 6. Clean Up Missing Apple Touch Icons
**File:** `index.html:47-54`  
**What's wrong:** References non-existent icon files  
**Fix:** Remove lines 47-54 (modern iOS only needs 180x180):
```diff
  <link rel="apple-touch-icon" href="/apple-touch-icon.png">
  <link rel="apple-touch-icon" sizes="180x180" href="/apple-touch-icon.png">
-  <link rel="apple-touch-icon" sizes="152x152" href="/apple-touch-icon-152x152.png">
-  <link rel="apple-touch-icon" sizes="144x144" href="/apple-touch-icon-144x144.png">
-  <link rel="apple-touch-icon" sizes="120x120" href="/apple-touch-icon-120x120.png">
-  <link rel="apple-touch-icon" sizes="114x114" href="/apple-touch-icon-114x114.png">
-  <link rel="apple-touch-icon" sizes="76x76" href="/apple-touch-icon-76x76.png">
-  <link rel="apple-touch-icon" sizes="72x72" href="/apple-touch-icon-72x72.png">
-  <link rel="apple-touch-icon" sizes="60x60" href="/apple-touch-icon-60x60.png">
-  <link rel="apple-touch-icon" sizes="57x57" href="/apple-touch-icon-57x57.png">
```

#### 7. Fix or Remove Android Chrome 512x512 Reference
**File:** `index.html:58`  
**What's wrong:** References non-existent file  
**Fix Option A:** Create `public/android-chrome-512x512.png`  
**Fix Option B:** Remove the line (192x192 is sufficient for most cases)

#### 8. Update Sitemap Dates
**File:** `public/sitemap.xml`  
**What's wrong:** `lastmod` dates are `2025-01-04` (outdated)  
**Fix:** Update to current date or use dynamic generation

---

## Post-Deploy Verification Script

After deploying, manually verify:

### 1. Basic Functionality
- [ ] Site loads at production URL
- [ ] Homepage displays correctly
- [ ] Navigation menu works (desktop and mobile)
- [ ] All sections render (Hero, Menu, Hours, Visit, About, Reviews, Instagram, Footer)
- [ ] Wholesale page loads at `/wholesale`

### 2. Routing & Navigation
- [ ] Hash links work (`/#menu`, `/#hours`, `/#visit`, `/#reviews`)
- [ ] Direct navigation to `/wholesale` works
- [ ] 404 page displays for non-existent routes
- [ ] Browser back/forward buttons work

### 3. External Links
- [ ] App Store links open correctly (iOS and Android)
- [ ] Social media links work (Instagram, Facebook, TikTok)
- [ ] Store/Shopify link works
- [ ] Google Maps link works
- [ ] Phone link works (`tel:`)

### 4. Reviews Integration
- [ ] Reviews section loads (or shows empty state gracefully)
- [ ] Test Netlify function: `https://your-site.netlify.app/.netlify/functions/google-reviews`
- [ ] Function returns data or proper error response

### 5. Images & Assets
- [ ] Logo displays correctly
- [ ] Botanical pattern background displays
- [ ] App store badges display
- [ ] All optimized images load
- [ ] No 404s in browser console for images

### 6. Mobile Experience
- [ ] Mobile menu opens/closes correctly
- [ ] Sticky app bar appears after scroll
- [ ] Touch interactions work (swipe on reviews carousel)
- [ ] Responsive layout works on various screen sizes

### 7. Performance
- [ ] Page loads quickly (< 3s on 3G)
- [ ] Images lazy load correctly
- [ ] No console errors
- [ ] Security headers present (check Network tab → Response Headers)

### 8. SEO & Social
- [ ] Page title displays correctly
- [ ] Meta description present
- [ ] OG image displays when sharing (or verify it's missing if not fixed)
- [ ] Structured data validates (use Google Rich Results Test)

### 9. Analytics
- [ ] Plausible analytics loads (check Network tab)
- [ ] No analytics errors in console
- [ ] Events fire correctly (test by clicking app store links)

### 10. Error Handling
- [ ] Reviews section handles API failure gracefully
- [ ] Error boundaries catch component errors
- [ ] 404 page displays for invalid routes

---

## Important Context Assumptions

1. **Environment Variables:** Assumed to be set in Netlify Dashboard. If not set, reviews will show empty state (graceful degradation).

2. **Build Process:** Assumes `npm ci` and `npm run build` work correctly. If build fails, check Node version matches (20).

3. **Netlify Functions:** Assumes functions deploy correctly. Test after first deploy.

4. **Image Assets:** All required images exist in `public/` except OG image and some optional icons.

5. **Client-Facing Site:** Prioritized stability and polish. All fixes are minimal and surgical.

---

## Summary

**Total Issues Found:** 8
- 🔴 Blockers: 1
- 🟠 High Priority: 1
- 🟡 Medium Priority: 3
- 🟢 Low Priority: 3

**Estimated Fix Time:** 15-30 minutes

**Recommendation:** Fix the **blocker** and **high-priority** issues before deploying. Medium and low-priority items can be addressed post-deploy if needed, but cleaning up unused files is recommended.

---

**Report Generated:** 2026-01-02  
**Next Steps:** Address blocker and high-priority items, then proceed with deployment.

