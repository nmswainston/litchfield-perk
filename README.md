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
├── styles/            # Global styles
├── utils/             # Utility functions
├── constants/         # App constants
└── test/             # Test files
```

📋 **See [PROJECT_STRUCTURE.md](./PROJECT_STRUCTURE.md) for detailed documentation**

## 🚀 Getting Started

### Prerequisites

- Node.js (>= 18; Netlify builds use 20)
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

No runtime env vars required. The application uses only standard build-time environment variables (NODE_ENV) which are automatically handled by the build system.

## 🎨 Design Features

- **Botanical Pattern Background**: Custom pattern that absorbs into the header on scroll
- **Smooth Animations**: Framer Motion for elegant transitions
- **Color Scheme**: Friends-inspired green (#0B6534) with clean whites and grays
- **Typography**: Clean, readable fonts with proper hierarchy

## 🛠️ Technologies Used

- **React 19**: Modern React with hooks
- **Vite 5**: Fast build tool and dev server
- **Tailwind CSS v4**: Utility-first CSS framework
- **Framer Motion**: Animation library
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

## 🤝 Contributing

Contributions are welcome. Please open a PR or issue if you find something to improve.

## 📞 Contact

For questions or suggestions, please reach out to the project maintainer.

---

_"The one where coffee is always there for you"_ ☕

—

Note: A legacy Vite template exists under `litchfield-perk/`. The active project is at the repository root.
