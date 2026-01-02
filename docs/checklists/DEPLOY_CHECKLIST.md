# Netlify Deployment Checklist

## Build Settings

- **Build command**: `npm run build`
- **Publish directory**: `dist`
- **Base directory**: `repo root`
- **Node version**: `20`

## Troubleshooting

### Styling Issues After Deploy

If CSS/styling is missing after deployment:

1. **Verify Tailwind v4 import**:
   - Check that `@import "tailwindcss";` is present in `src/index.css`
   - Ensure Tailwind v4 is properly configured in `vite.config.js`

2. **Check redirects configuration**:
   - Verify `_redirects` file exists in `public/` directory
   - Check `netlify.toml` configuration if using custom redirects
   - Ensure SPA routing is properly configured

### Image 404 Errors

If images are returning 404 errors:

1. **Verify asset placement**:
   - Check that images are in the `public/` directory
   - Ensure image paths in components use `/` prefix (e.g., `/logo-512.png`)

2. **Check component imports**:
   - Verify images imported in components are properly bundled
   - Check that `ResponsiveImage` component is handling paths correctly

## Pre-Deploy Verification

- [ ] Run `npm run build` locally to ensure build succeeds
- [ ] Check that `dist/` directory contains all expected files
- [ ] Verify CSS files are generated in `dist/assets/`
- [ ] Test that all image paths resolve correctly
- [ ] Confirm `_redirects` file is copied to `dist/`

## Environment Variables

If using environment variables:

- [ ] Configure in Netlify dashboard under Site settings > Environment variables
- [ ] Use `VITE_` prefix for client-side variables
- [ ] Test environment variables in production build

## Performance Optimization

- [ ] Verify images are optimized (WebP format when possible)
- [ ] Check that unused CSS is purged in production build
- [ ] Confirm JavaScript bundles are minified
- [ ] Test Core Web Vitals scores

## Post-Deploy Testing

- [ ] Test all navigation links
- [ ] Verify responsive design on mobile devices
- [ ] Check that animations and transitions work
- [ ] Test form submissions (if applicable)
- [ ] Verify analytics tracking (if implemented)
