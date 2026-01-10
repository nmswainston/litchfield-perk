# Litchfield Perk Cafe Website ☕

A modern, responsive website for Litchfield Perk Cafe, inspired by the iconic coffee shop from Friends. Built with React 19, Vite 5, and Tailwind CSS v4.

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Scroll Header**: Dynamic header with botanical pattern absorption effect
- **Multi-Page Routing**: Home page and dedicated Wholesale Partner Program page
- **Mobile Sticky App Bar**: Promotes app downloads on mobile devices
- **Google Reviews Integration**: Fetches and displays reviews via Netlify serverless functions
- **Instagram Section**: Optional SnapWidget embed
- **Error Boundaries**: Graceful error handling throughout the application
- **Scroll Tracking**: Analytics tracking for scroll depth and section visibility
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
- Serverless functions are located in `netlify/functions/` for Google Reviews API integration
- Build command: `npm ci && npm run build`
- Publish directory: `dist`

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
- **React Router DOM v6**: Client-side routing with multiple pages
- **Lucide React**: Icon library
- **Netlify Functions**: Serverless functions for Google Reviews API
- **Instagram Widget**: Social media integration (SnapWidget)

## 📱 Responsive Design

The website is fully responsive and optimized for:

- Mobile devices (320px+)
- Tablets (768px+)
- Desktop (1024px+)
- Large screens (1200px+)

## 🗺️ Pages & Routes

The site includes two main pages:

- **Home Page** (`/`): Main landing page with all sections (Hero, Menu, Hours, Visit, About Us, App CTA, Reviews, Instagram, Footer)
- **Wholesale Page** (`/wholesale`): Dedicated page for the Wholesale Partner Program featuring program details, benefits, signature offerings, profit scenarios, and contact information

## 🔧 Customization

### Adding New Sections

1. Create a new component in `src/components/sections/`
2. Export it from `src/components/sections/index.js`
3. Import and use it in `src/app/LitchfieldPerkApp.jsx` (for home page) or `src/pages/WholesalePage.jsx` (for wholesale page)

### Adding New Pages

1. Create a new page component in `src/pages/`
2. Add a route in `src/app/App.jsx` using React Router
3. Update navigation links if needed in `src/components/layout/ScrollHeader.jsx`

### Editing Menu Items

- Update categories and items in `src/data/menu.js` (`menuCategories`, `menuItems`).
- No JSX changes required; the `MenuSection` reads from this data source.

### Instagram Integration

- The Instagram section uses a SnapWidget embed. Replace the placeholder in `src/components/widgets/InstagramWidget.jsx` with your SnapWidget embed code.

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

### Analytics

Privacy‑first analytics are supported via Plausible (enabled by default), with optional Fathom and GA4 (disabled by default). Configuration is in `src/utils/analytics.js`.

## 🐛 Troubleshooting

### Google Reviews Function Returns 502 Error

If you're seeing `Failed to load resource: the server responded with a status of 502` for `/.netlify/functions/google-reviews`, here are the most common causes:

#### **Issue: Running Vite Dev Server Instead of Netlify Dev**

**Problem**: The Vite dev server (`npm run dev`) doesn't support Netlify serverless functions. The functions only work with Netlify Dev.

**Solution**: Use Netlify Dev for local development:
```bash
npm run dev:netlify
```
This runs `netlify dev` which provides both the Vite dev server AND Netlify functions.

**Note**: Make sure you have `netlify-cli` available. If not, install it:
```bash
npm install -g netlify-cli
```

#### **Issue: Missing Environment Variables**

**Problem**: The function requires `GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY` to be set.

**Solution for Local Development**:
1. Create a `.env` file in the project root:
   ```env
   GOOGLE_PLACE_ID=your_place_id_here
   GOOGLE_PLACES_API_KEY=your_api_key_here
   ```
2. Make sure `.env` is in your `.gitignore` (should not be committed)
3. Restart Netlify Dev after adding environment variables

**Solution for Production (Netlify)**:
1. Go to your Netlify site dashboard
2. Navigate to **Site settings** → **Environment variables**
3. Add both `GOOGLE_PLACE_ID` and `GOOGLE_PLACES_API_KEY`
4. Redeploy your site

#### **Issue: Invalid API Key or Place ID**

**Problem**: The Google Places API is rejecting your credentials.

**Solution**:
- Verify your API key is valid and has the Places API enabled in Google Cloud Console
- Check that your Place ID is correct using the [Place ID Finder](https://developers.google.com/maps/documentation/places/web-service/place-id)
- Ensure your API key restrictions allow the Places API

#### **Checking Function Logs**

For more detailed error information:
- **Local Development**: Check your terminal where `netlify dev` is running
- **Production**: Check Netlify Functions logs in your Netlify dashboard under **Functions** → **google-reviews** → **Logs**

## 📋 Client Handoff Notes

### Running Locally

1. **Install dependencies:**
   ```bash
   npm install
   ```

2. **Start development server:**
   
   **For basic development (no Netlify functions):**
   ```bash
   npm run dev
   ```
   Or on Windows, double-click `run-site.bat`
   
   **For full functionality including Google Reviews (Netlify functions):**
   ```bash
   npm run dev:netlify
   ```
   This runs Netlify Dev which provides both the Vite dev server and serverless functions.

3. **Open in browser:**
   - Development server runs at `http://localhost:5173`
   - Hot reload is enabled for instant updates
   - With `dev:netlify`, functions are available at `/.netlify/functions/`

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

- **Root App (Routing):** `src/app/App.jsx` - Sets up React Router with routes
- **Main Home Page:** `src/app/LitchfieldPerkApp.jsx` - Home page with all sections
- **Wholesale Page:** `src/pages/WholesalePage.jsx` - Wholesale Partner Program page
- **Header Navigation:** `src/components/layout/ScrollHeader.jsx` - Dynamic scroll header
- **Menu Section:** `src/components/sections/MenuSection.jsx` - Menu display
- **Reviews Section:** `src/components/sections/ReviewsSection.jsx` - Google Reviews integration
- **Sticky App Bar:** `src/components/ui/StickyAppBar.jsx` - Mobile app promotion bar
- **Footer:** `src/components/sections/Footer.jsx` - Site footer



### Notes

- All phone numbers should be updated in `src/constants/business.js` only
- The site uses React Router v6 for client-side routing with two pages: `/` (home) and `/wholesale`
- Images are optimized and stored in `public/images/optimized/`
- Analytics are configured in `src/utils/analytics.js` (Plausible enabled by default)
- Error boundaries wrap all major sections for graceful error handling
- Scroll tracking monitors user engagement with Reviews and Instagram sections
- Mobile sticky app bar appears after 300px scroll or 3 seconds on mobile devices
- Contact modal is available on the Wholesale page for wholesale inquiries

## 🤝 Contributing

Contributions are welcome. Please open a PR or issue if you find something to improve.

## 📞 Contact

For questions or suggestions, please reach out to the project maintainer.

---

_"The one where coffee is always there for you"_ ☕
