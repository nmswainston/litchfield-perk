# 🏗️ Litchfield Perk - Project Structure

## 📁 Directory Organization

```
src/
├── app/                    # App-level components and configuration
│   ├── App.jsx            # Router setup and route definitions
│   ├── main.jsx           # Application entry point
│   └── LitchfieldPerkApp.jsx  # Main homepage component
├── pages/                  # Full page route components
│   ├── WholesalePage.jsx  # Wholesale partner program page
│   └── index.js           # Barrel export
├── components/             # Reusable UI components
│   ├── layout/            # Layout components
│   │   ├── ScrollHeader.jsx
│   │   ├── HeaderBackground.jsx
│   │   ├── NavigationLinks.jsx
│   │   └── index.js
│   ├── sections/          # Page sections (for homepage)
│   │   ├── HeroSection.jsx
│   │   ├── MenuSection.jsx
│   │   ├── HoursSection.jsx
│   │   ├── VisitSection.jsx
│   │   ├── ReviewsSection.jsx
│   │   ├── InstagramSection.jsx
│   │   ├── AboutUs.jsx
│   │   ├── Footer.jsx
│   │   └── index.js
│   ├── ui/               # UI primitives and shared components
│   │   ├── Button.jsx
│   │   ├── Container.jsx
│   │   ├── Section.jsx
│   │   ├── SectionShell.jsx
│   │   ├── HeroShell.jsx
│   │   ├── MenuCard.jsx
│   │   ├── Pill.jsx
│   │   ├── DottyWord.jsx
│   │   ├── ContactModal.jsx
│   │   ├── ErrorBoundary.jsx
│   │   ├── ResponsiveImage.jsx
│   │   └── index.js
│   └── widgets/          # Third-party integrations
│       ├── InstagramWidget.jsx
│       └── index.js
├── assets/               # Static assets (images, logos)
│   └── logo-512.png
├── data/                 # Content data (user-facing content)
│   └── menu.js           # Menu items and categories
├── hooks/               # Custom React hooks
│   ├── useOptimizedScroll.js
│   ├── useScrollTracking.js
│   └── index.js
├── styles/              # Modular stylesheets
│   ├── accessibility.css
│   └── responsive-images.css
├── utils/               # Utility functions
│   ├── analytics.js     # Analytics tracking
│   ├── format.js        # Formatting utilities
│   ├── reviews.js       # Reviews API/data fetching
│   └── index.js
├── constants/           # App configuration (rarely changes)
│   ├── business.js      # Business information, contact, hours
│   └── index.js
└── index.css            # Main stylesheet (design tokens, global styles)
```

## 🎯 **Design Principles**

### **1. Separation of Concerns**

- **App-level**: Main application logic and configuration
- **Components**: Reusable UI components organized by type
- **Hooks**: Custom React hooks for shared logic
- **Utils**: Pure utility functions
- **Constants**: Configuration and business data
- **Styles**: Global and component-specific styles

### **2. Scalability**

- **Modular structure**: Easy to add new features
- **Clear boundaries**: Each directory has a specific purpose
- **Index files**: Clean imports and exports
- **Consistent naming**: Predictable file organization

### **3. Maintainability**

- **Single responsibility**: Each file has one clear purpose
- **Logical grouping**: Related files are grouped together
- **Clean imports**: Centralized exports through index files
- **Documentation**: Clear structure documentation

## 📦 **Component Organization**

### **Layout Components** (`src/components/layout/`)

- **ScrollHeader**: Fixed header with scroll effects
- **Purpose**: Layout and navigation components

### **Page Components** (`src/pages/`)

- **WholesalePage**: Full page route for wholesale partner program
- **Purpose**: Complete page components used in routing (not sections of a page)

### **Section Components** (`src/components/sections/`)

- **HeroSection**: Main banner and CTA
- **MenuSection**: Menu display with filtering
- **HoursSection**: Business hours
- **VisitSection**: Location and contact info
- **AboutUs**: About section
- **ReviewsSection**: Customer testimonials
- **InstagramSection**: Social media integration
- **Footer**: Site footer with links
- **Purpose**: Page sections and content areas (used on homepage)

### **UI Components** (`src/components/ui/`)

- **Button**: Primary button component
- **Container**: Layout container with max-width
- **Section**: Section wrapper component
- **SectionShell**: Standardized section header component
- **HeroShell**: Reusable hero section wrapper
- **MenuCard**: Menu item display card
- **Pill**: Badge/pill component
- **DottyWord**: Animated text component
- **ContactModal**: Modal dialog for contact forms
- **ErrorBoundary**: Error boundary component
- **ResponsiveImage**: Optimized image component with WebP support
- **Purpose**: Reusable UI building blocks, primitives, and shared components

### **Widget Components** (`src/components/widgets/`)

- **InstagramWidget**: Instagram feed integration
- **Purpose**: Third-party integrations and widgets

## 🔧 **Custom Hooks** (`src/hooks/`)

### **useOptimizedScroll**

- **Purpose**: Optimized scroll detection with debouncing
- **Features**: RequestAnimationFrame, smooth easing, performance optimization
- **Usage**: Header scroll effects, scroll-based animations

### **useScrollTracking**

- **Purpose**: Track scroll depth and section visibility for analytics
- **Features**: Intersection Observer for section tracking
- **Usage**: Analytics tracking for user engagement

## 🛠️ **Utilities** (`src/utils/`)

### **Analytics** (`analytics.js`)

- Analytics tracking utilities
- Event tracking for user interactions
- Section visibility tracking

### **Format Utilities** (`format.js`)

- `formatTime()`: Time formatting
- `getTodayHours()`: Get today's business hours

### **Reviews** (`reviews.js`)

- `getReviews()`: Fetch reviews from API/Netlify function
- Reviews data fetching and processing

**Organization Note:** Utilities are organized by concern (analytics, formatting, API calls). If the project grows, consider splitting into subdirectories: `utils/api/`, `utils/format/`, `utils/analytics/`.

## 📊 **Constants vs Data** (`src/constants/` vs `src/data/`)

### **Constants** (`src/constants/`)

**Purpose:** App configuration and business information that rarely changes.

- **business.js**: Business information (address, phone, hours, contact info)
- **Purpose**: Single source of truth for business configuration

**When to use:** Configuration values, business info, theme constants, app settings.

### **Data** (`src/data/`)

**Purpose:** User-facing content data that may change more frequently.

- **menu.js**: Menu items, categories, pricing
- **Purpose**: Content data that may be updated regularly

**When to use:** Content that users interact with (menu items, blog posts, product listings, etc.).

**Distinction:**
- **Constants** = Configuration (business hours, contact info, theme values)
- **Data** = Content (menu items, product listings, user-facing content)

## 🎨 **Styling Strategy**

### **Global Styles**

- **index.css** (at `src/` root): Main stylesheet with design tokens, Tailwind imports, typography scale
- **styles/accessibility.css**: Accessibility-specific styles (skip links, focus states)
- **styles/responsive-images.css**: Image optimization styles

**Note:** `index.css` is kept at `src/` root following Vite conventions. Modular stylesheets are in `styles/` and imported by the main stylesheet.

### **Component Styles**

- **Inline styles**: For dynamic styling
- **CSS classes**: For static styling
- **Tailwind**: Utility-first CSS framework

## 🚀 **Performance Features**

### **Image Optimization**

- **ResponsiveImage**: WebP support, srcset, CLS prevention
- **Lazy loading**: IntersectionObserver for widgets
- **Optimized assets**: Mobile/desktop variants

### **Scroll Optimization**

- **Debounced scroll**: 60fps performance
- **RequestAnimationFrame**: Smooth animations
- **Memory management**: Proper cleanup

### **Build Optimization**

- **Tree shaking**: Unused code elimination
- **Code splitting**: Lazy loading of components
- **Asset optimization**: Minification and compression

## 📱 **Responsive Design**

### **Breakpoints**

- **Mobile**: < 768px
- **Tablet**: 768px - 1024px
- **Desktop**: > 1024px

### **Image Strategy**

- **Mobile**: Smaller images, higher compression
- **Desktop**: Larger images, lower compression
- **WebP**: Modern format with PNG fallbacks

## 🔄 **Import Strategy**

### **Clean Imports**

```javascript
// From components
import { ScrollHeader } from "../components/layout";
import { HeroSection } from "../components/sections";

// From hooks
import { useOptimizedScroll } from "../hooks";

// From utils
import { formatCurrency } from "../utils";

// From constants
import { THEME, BUSINESS_INFO } from "../constants";
```

### **Index Files**

- **Centralized exports**: All components exported through index.js
- **Clean imports**: No deep path imports
- **Maintainable**: Easy to refactor and reorganize

## 🧪 **Testing Structure**

### **Test Files** (`src/test/`)

- **SimpleTest.jsx**: Development testing component
- **Purpose**: Component testing and debugging

## 📈 **Future Scalability**

### **Easy to Add**:

- **New pages**: Add to `src/pages/` (full page routes)
- **New sections**: Add to `src/components/sections/` (homepage sections)
- **New UI components**: Add to `src/components/ui/` (primitives and shared components)
- **New hooks**: Add to `src/hooks/`
- **New utilities**: Add to `src/utils/` (organized by concern)
- **New constants**: Add to `src/constants/` (configuration)
- **New content data**: Add to `src/data/` (user-facing content)

### **Easy to Maintain**:

- **Clear structure**: Predictable file locations
- **Modular design**: Independent components
- **Clean imports**: Centralized exports
- **Documentation**: Well-documented structure

## 🎯 **Best Practices**

1. **Single Responsibility**: Each file has one clear purpose
2. **Consistent Naming**: Predictable file and component names
3. **Clean Imports**: Use index files for clean imports
4. **Performance First**: Optimize for Core Web Vitals
5. **Accessibility**: Include ARIA labels and semantic HTML
6. **Responsive Design**: Mobile-first approach
7. **Documentation**: Keep structure documentation updated

This structure provides a **solid foundation** for a **scalable, maintainable** React application! 🚀
