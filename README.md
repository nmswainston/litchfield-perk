# Litchfield Perk Cafe Website ☕

A modern, responsive website for Litchfield Perk Cafe, inspired by the iconic coffee shop from Friends. Built with React 19, Vite 5, and Tailwind CSS v4.

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Scroll Header**: Dynamic header with botanical pattern absorption effect
- **Modular Architecture**: Clean component organization for maintainability
- **Instagram Section**: Optional SnapWidget embed (see `SNAPWIDGET_INTEGRATION.md`)
- **Performance Optimized**: Fast loading with Vite build system

## 🏗️ Project Structure

```
src/
├── app/                 # App-level components and configuration
├── components/          # Reusable UI components
│   ├── layout/         # Layout components
│   ├── sections/       # Page sections
│   ├── ui/            # Basic UI components
│   └── widgets/       # Third-party integrations
├── assets/            # Static assets (images, icons, fonts)
├── data/              # Data and configuration
├── hooks/             # Custom React hooks
├── pages/             # Page components (routing)
├── styles/            # Global styles
├── utils/             # Utility functions
└── constants/         # App constants
```

📋 **See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation**

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 20)
- npm (recommended) or yarn

### Installation

1. Clone the repository:

```bash
git clone https://github.com/nmswainston/litchfield-perk.git
cd litchfield-perk
```

2. Install dependencies:

```bash
npm install
```

3. Start the development server:

```bash
npm run dev
```

4. Open [http://localhost:5173](http://localhost:5173) in your browser

Tip (Windows): you can also double‑click `run-site.bat` to start the dev server.

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🚀 Deployment

### Netlify Deployment

For Netlify deployment, ensure the following settings:

- Node version is set to `20` via `netlify.toml` `[build.environment]`
- SPA redirects and caching headers are configured in `netlify.toml`

## 🔧 Deployment Env Vars

### Netlify Environment Variables

For Google Reviews integration, set these environment variables in your Netlify dashboard:

1. Go to **Site settings** → **Environment variables**
2. Add the following variables:

   - `GOOGLE_PLACES_API_KEY` - Your Google Places API key
   - `GOOGLE_PLACE_ID` - Your Google Place ID

#### Getting Your API Key

1. Go to [Google Cloud Console](https://console.cloud.google.com/)
2. Create a new project or select an existing one
3. Enable the **Places API**
4. Create credentials (API Key)
5. **Important**: Restrict the API key to "Places API" only for security

#### Finding Your Place ID

- Use the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
- Or search for your business on Google Maps and extract the Place ID from the URL

#### Notes

- The Places API returns a maximum of ~5 reviews (Google limitation)
- The API key should be restricted in Google Cloud Console to prevent unauthorized use
- Reviews are cached for 6 hours at the edge to reduce API calls

## 🎨 Design Features

- **Botanical Pattern Background**: Custom pattern that absorbs into the header on scroll
- **Smooth Animations**: CSS-based transitions and animations
- **Color Scheme**: Friends-inspired green (#0B6534) with clean whites and grays
- **Typography**: Clean, readable fonts with proper hierarchy

## 🛠️ Technologies Used

- **React 19**: Modern React with hooks
- **Vite 5**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **React Router DOM**: Client-side routing
- **Lucide React**: Icon library
- **Instagram Widget**: Social media integration

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1200px+)

## 🔧 Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Export it from `src/components/sections/index.js`
3. Import and use it in `src/app/LitchfieldPerkApp.jsx`

### Editing Menu Items

- Update categories and items in `src/data/menu.js` (`menuCategories`, `menuItems`).
- No JSX changes required; the `MenuSection` reads from this data source.

### Instagram Integration

- The Instagram section uses a SnapWidget embed. Replace the placeholder in `src/components/widgets/InstagramWidget.jsx` with your SnapWidget embed code.
- See `SNAPWIDGET_INTEGRATION.md` for step‑by‑step instructions.

### Modifying the Header

The scroll header behavior can be customized in `src/components/layout/ScrollHeader.jsx`:

- Adjust `heroHeight` for different transition timing
- Modify `scrollProgress` thresholds for color changes
- Update botanical pattern opacity and blending

### Styling

The project uses Tailwind CSS v4 with the official Vite and PostCSS integrations. Key customizations:

- Utility layers and base styles are defined in `src/index.css`
- Component-specific styles live alongside components
- Additional responsive image styles are in `src/styles/responsive-images.css`

See `TAILWIND_OPTIMIZATION_GUIDE.md` for performance tips.

### Analytics

Privacy‑first analytics are supported via Plausible (enabled by default), with optional Fathom and GA4 (disabled by default). Configuration is in `src/utils/analytics.js`.

See `ANALYTICS_SETUP_GUIDE.md` for setup instructions.

### Docs & Guides

- `HEADER_PATTERN_SETUP.md`: Botanical header absorption effect
- `SNAPWIDGET_INTEGRATION.md`: Instagram feed integration
- `IMAGE_OPTIMIZATION_GUIDE.md`: End‑to‑end image workflow
- `SEO_OPTIMIZATION_GUIDE.md`: Metadata and sitemap guidance
- `ACCESSIBILITY_GUIDE.md`: A11y best practices used in the site
- `GOOGLE_REVIEWS_INTEGRATION.md`: Embedding and styling Google reviews
- `TAILWIND_OPTIMIZATION_GUIDE.md`: Tailwind v4 tips

## 📋 Client Handoff Notes

### Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   ```bash
   npm run dev
   ```
   Or on Windows, double-click `run-site.bat`

3. **Open in browser:**
   - Development server runs at `http://localhost:5173`
   - Hot reload is enabled for instant updates

### Deployment

**Netlify Deployment:**
- Build command: `npm ci && npm run build`
- Publish directory: `dist`
- Node version: `20` (configured in `netlify.toml`)

The site is configured as a Single Page Application (SPA) with proper routing via `_redirects` file.

### Key Content Locations

**Business Information:**
- Location: `src/constants/business.js`
- Contains: hours, address, phone, email, social links, app store URLs

**Menu Data:**
- Location: `src/data/menu.js`
- Edit `menuCategories` and `menuItems` arrays to update menu

**Hours:**
- Location: `src/constants/business.js` → `BUSINESS_INFO.hours`
- Format: Uses 24-hour time format (e.g., "07:00", "14:00")

**Social Media Links:**
- Location: `src/constants/business.js` → `BUSINESS_INFO.social`
- Includes: Instagram, Facebook, TikTok handles and URLs

**App Store Links:**
- Location: `src/constants/business.js`
- Constants: `APP_IOS_URL`, `APP_ANDROID_URL`
- Used throughout site in header, hero, footer, and CTA sections

**Store/Shopify Link:**
- Location: `src/constants/business.js` → `STORE_URL`
- Used in header "Store" button and mobile menu

### Google Reviews Integration

**How Reviews Work:**
- Reviews are fetched via Netlify serverless function: `netlify/functions/google-reviews.js`
- Function proxies requests to Google Places API (keeps API key secure)
- Reviews are cached for 6 hours at the edge to reduce API calls
- If API fails or env vars are missing, the site shows an empty state gracefully (no crashes)

**Required Environment Variables (Netlify Dashboard):**
1. `GOOGLE_PLACES_API_KEY` - Your Google Places API key
2. `GOOGLE_PLACE_ID` - Your Google Place ID

**Setting Up:**
1. Go to Netlify Dashboard → Site settings → Environment variables
2. Add both variables
3. Deploy to activate

**Note:** The site handles missing env vars gracefully - reviews section will show "No reviews available" instead of crashing.

### Important Files

- **Main App:** `src/app/LitchfieldPerkApp.jsx`
- **Header Navigation:** `src/components/layout/ScrollHeader.jsx`
- **Menu Section:** `src/components/sections/MenuSection.jsx`
- **Reviews Section:** `src/components/sections/ReviewsSection.jsx`
- **Footer:** `src/components/sections/Footer.jsx`

### Placeholder Items to Replace

- **App Store Badge:** `public/badges/app-store-badge.svg` (currently placeholder)
  - Download official badge from [Apple App Store Marketing Guidelines](https://developer.apple.com/app-store/marketing/guidelines/)
  
- **Google Play Badge:** `public/badges/google-play-badge.svg` (currently placeholder)
  - Download official badge from [Google Play Badge Guidelines](https://play.google.com/intl/en_us/badges/)

### Notes

- All phone numbers should be updated in `src/constants/business.js` only
- The site uses React Router for client-side routing
- Images are optimized and stored in `public/images/optimized/`
- Analytics are configured in `src/utils/analytics.js` (Plausible enabled by default)

## 🤝 Contributing

Contributions are welcome. Please open a PR or issue if you find something to improve.

## 📞 Contact

For questions or suggestions, please reach out to the project maintainer.

---

_"The one where coffee is always there for you"_ ☕

—

Note: A legacy Vite template exists under `litchfield-perk/`. The active project is at the repository root.
