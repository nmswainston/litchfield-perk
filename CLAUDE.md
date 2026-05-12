# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Commands

```bash
npm run dev            # Vite dev server (no Netlify functions) → http://localhost:5173
npm run dev:netlify    # Netlify Dev (Vite + serverless functions) → use for Google Reviews
npm run build          # Production build → dist/
npm run lint           # ESLint
npm run format         # Prettier
npm run check          # lint + build (pre-deploy check)
npm run clean          # Remove dist/, .vite, .netlify caches
```

There are no automated tests (`npm test` is a no-op).

To run a Lighthouse audit locally: `npm run lh` (builds, starts preview server, runs Lighthouse, kills the server).

## Architecture

### Stack
- **React 19** + **Vite 5** + **Tailwind CSS v4** (CSS-first, no `tailwind.config.js`)
- **React Router v6** (two routes: `/` and `/wholesale`)
- Deployed on **Netlify** with one serverless function

### Routing & Page Composition
- `src/app/App.jsx` — BrowserRouter with two `<Route>` entries
- `src/app/LitchfieldPerkApp.jsx` — home page; composes all sections in order, each wrapped in `<ErrorBoundary componentName="...">` for graceful isolation
- `src/pages/WholesalePage.jsx` — wholesale partner page with a Netlify Form contact form (form name: `wholesale-contact`)

### Content Data (CMS-editable)
Two JSON files are treated as the headless CMS source of truth, editable via the Decap CMS admin at `/admin` (Netlify Identity + Git Gateway):

| File | Purpose |
|---|---|
| `src/data/menu.json` | Menu categories and items |
| `src/data/hours.json` | Weekly hours in 24h format, timezone, display note |

`src/data/menu.js` re-exports helpers (`menuCategories`, `menuItems`, `getMenuItemsByCategory`, etc.) from `menu.json`. Never hardcode menu or hours data in components — always read from these files.

All other business constants (address, social links, app store URLs, Shopify store URL) live in `src/constants/business.js`.

### Tailwind v4 Styling
Design tokens are declared inside a `@theme { }` block at the top of `src/index.css` — this replaces `tailwind.config.js`. Brand colors use CSS custom properties (`--color-brand-primary: #0B6534`). Use `var(--color-brand-*)` tokens or the generated Tailwind utilities (`bg-brand-primary`, `text-brand-text`, etc.).

Fonts: `Urbanist` (body/UI), `Fraunces` (display/headings), `Caveat` (header brand name).

### Scroll Header
`src/components/layout/ScrollHeader.jsx` uses `useOptimizedScroll` (rAF + debounce) to track `scrollProgress` (0–1) and `isOverHero` (boolean). When over the hero the header is transparent with a botanical pattern overlay that fades in; once past, it becomes an opaque warm-paper gradient. Adjust `SCROLL_THRESHOLD` in `useOptimizedScroll.js` or the opacity multipliers in `ScrollHeader.jsx` to tune the transition.

### Google Reviews Serverless Function
`netlify/functions/googleReviews.js` proxies to the **Places API (New) v1** (`places.googleapis.com/v1/places/:id`). The API key goes in the `X-Goog-Api-Key` header, not the URL. Edge cache TTL is 6 hours (`s-maxage=21600`). Requires two Netlify env vars: `GOOGLE_PLACES_API_KEY` and `GOOGLE_PLACE_ID`. A `?debug=1` query param returns a diagnostic JSON payload to verify deployment and env var presence.

### Analytics
`src/utils/analytics.js` exports a singleton `analytics` instance. Plausible is enabled by default; Fathom and GA4 are disabled. Analytics are suppressed on localhost. Events are queued if the script hasn't loaded yet. To track a new event, call `analytics.track(EVENTS.YOUR_EVENT, { ...props })` or add a named method to the class.

### Image Pipeline
Source images in `public/images/source/` are processed by `scripts/optimize-images.js` (using `sharp`) into WebP + PNG at multiple sizes in `public/images/optimized/`. The `<ResponsiveImage>` component in `src/components/ui/` handles `srcset` and format selection. Run `node scripts/optimize-images.js` when adding new source images.

### Safari Compatibility
The codebase has explicit Safari 14+ / iOS 14+ support: smooth scroll is polyfilled via `smoothScrollTo()` in `ScrollHeader.jsx`, `svh` unit is feature-detected for mobile menu height, and `vite.config.js` sets `build.target: ['safari14', 'ios14']`.
