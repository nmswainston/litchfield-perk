# Netlify Production Deploy Checklist

## ✅ Build Configuration

**Build Command:**
```
npm ci && npm run build
```

**Publish Directory:**
```
dist
```

**Node Version:**
```
20
```
(Configured in `netlify.toml` → `[build.environment]`)

## ✅ Environment Variables Required

The following environment variables must be set in the Netlify Dashboard under **Site settings** → **Environment variables**:

### Required for Google Reviews:
- `GOOGLE_PLACES_API_KEY` - Your Google Places API key
- `GOOGLE_PLACE_ID` - Your Google Place ID

### Notes:
- These are server-side only (used in `netlify/functions/google-reviews.js`)
- No client-side environment variables are needed
- The site handles missing env vars gracefully - reviews section shows empty state instead of crashing
- Reviews are cached for 6 hours at the edge to reduce API calls

## ✅ Routing Configuration

**SPA Routing:**
- Handled via `public/_redirects` file
- Rule: `/*   /index.html   200`
- All routes redirect to `index.html` for client-side routing

**404 Handling:**
- Custom 404 page at `public/404.html`
- Provides user-friendly error message with link back to homepage

## ✅ Security Headers

Configured in `netlify.toml` → `[[headers]]` for `/*`:

- `X-Content-Type-Options: nosniff`
- `Referrer-Policy: strict-origin-when-cross-origin`
- `X-Frame-Options: SAMEORIGIN`
- `Permissions-Policy: geolocation=(), camera=(), microphone=(), payment=()`
- `Content-Security-Policy: default-src 'self'; img-src 'self' https: data:; script-src 'self' https://plausible.io; style-src 'self' 'unsafe-inline' https://fonts.googleapis.com; connect-src 'self' https:; font-src 'self' https: data:; frame-ancestors 'self'`

## ✅ Caching Headers

**Long-term caching (1 year, immutable):**
- `/assets/*` - Hashed build assets
- `/images/optimized/*` - Optimized images

**No caching:**
- `/index.html` - Always fresh for SPA updates

## ✅ External Links Security

All external links with `target="_blank"` include:
- `rel="noopener noreferrer"` - Prevents security vulnerabilities

## ✅ Performance Optimizations

- Images optimized with WebP format and responsive sizes
- Build assets minified and bundled
- CSS and JS processing enabled in `netlify.toml`
- Lazy loading for images and Instagram widget
- Edge caching for reviews API (6 hours)

## ✅ Pre-Deploy Verification

Before deploying, verify:
- [ ] Environment variables are set in Netlify dashboard
- [ ] Build command works locally: `npm run build`
- [ ] `dist` directory contains all expected files
- [ ] No hardcoded secrets in code
- [ ] All external links have `rel="noopener noreferrer"`
- [ ] 404 page works correctly
- [ ] SPA routing works (test hash navigation)

## ✅ Post-Deploy Verification

After deploying, verify:
- [ ] Site loads correctly
- [ ] All navigation links work
- [ ] Reviews section loads (or shows empty state if API key missing)
- [ ] Images load correctly
- [ ] Mobile menu works
- [ ] App store links work
- [ ] Store/Shopify link works
- [ ] 404 page displays for non-existent routes
- [ ] Security headers present (check with browser dev tools → Network → Response Headers)

---

**Last Updated:** Pre-handoff client sanity pass
