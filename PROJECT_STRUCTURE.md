# 🏗️ Litchfield Perk - Project Structure

## 📁 Directory Organization

```
src/
├── app/                    # App-level components and configuration
│   ├── App.jsx            # Main app component
│   ├── App.css            # App-specific styles
│   ├── main.jsx           # Application entry point
│   └── LitchfieldPerkApp.jsx  # Main site component
├── components/             # Reusable UI components
│   ├── layout/            # Layout components
│   │   ├── ScrollHeader.jsx
│   │   └── index.js
│   ├── sections/          # Page sections
│   │   ├── HeroSection.jsx
│   │   ├── MenuSection.jsx
│   │   ├── HoursSection.jsx
│   │   ├── VisitSection.jsx
│   │   ├── ReviewsSection.jsx
│   │   ├── InstagramSection.jsx
│   │   ├── Footer.jsx
│   │   └── index.js
│   ├── ui/               # Basic UI components
│   │   ├── DottyWord.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── Pill.jsx
│   │   ├── MenuCard.jsx
│   │   ├── ResponsiveImage.jsx
│   │   └── index.js
│   └── widgets/          # Third-party integrations
│       ├── InstagramWidget.jsx
│       └── index.js
├── assets/               # Static assets
│   ├── images/           # Image assets
│   ├── icons/            # Icon assets
│   └── fonts/            # Font assets
├── data/                 # Data and configuration
│   └── menu.js           # Menu data
├── hooks/               # Custom React hooks
│   ├── useOptimizedScroll.js
│   └── index.js
├── styles/              # Global styles
│   └── responsive-images.css
├── utils/               # Utility functions
│   ├── scroll.js        # Scroll utilities
│   ├── format.js        # Formatting utilities
│   └── index.js
├── constants/           # App constants
│   ├── business.js      # Business information
│   └── index.js
└── test/               # Test files
    └── SimpleTest.jsx
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

### **Section Components** (`src/components/sections/`)

- **HeroSection**: Main banner and CTA
- **MenuSection**: Menu display with filtering
- **HoursSection**: Business hours
- **VisitSection**: Location and contact info
- **ReviewsSection**: Customer testimonials
- **InstagramSection**: Social media integration
- **Footer**: Site footer with links
- **Purpose**: Page sections and content areas

### **UI Components** (`src/components/ui/`)

- **DottyWord**: Animated text component
- **SectionTitle**: Consistent section headings
- **Pill**: Badge/pill component
- **MenuCard**: Menu item display card
- **ResponsiveImage**: Optimized image component
- **Purpose**: Reusable UI building blocks

### **Widget Components** (`src/components/widgets/`)

- **InstagramWidget**: Instagram feed integration
- **Purpose**: Third-party integrations and widgets

## 🔧 **Custom Hooks** (`src/hooks/`)

### **useOptimizedScroll**

- **Purpose**: Optimized scroll detection with debouncing
- **Features**: RequestAnimationFrame, smooth easing, performance optimization
- **Usage**: Header scroll effects, scroll-based animations

## 🛠️ **Utilities** (`src/utils/`)

### **Scroll Utilities** (`scroll.js`)

- `scrollToElement()`: Smooth scroll to element
- `isInViewport()`: Check element visibility
- `getScrollProgress()`: Calculate scroll progress

### **Format Utilities** (`format.js`)

- `formatCurrency()`: Currency formatting
- `formatPhone()`: Phone number formatting
- `formatTime()`: Time formatting
- `truncateText()`: Text truncation

## 📊 **Constants** (`src/constants/`)

### **Business Information** (`business.js`)

- **BUSINESS_INFO**: Company details, contact info, hours
- **SEO_CONFIG**: SEO metadata and configuration
- **THEME**: Design system colors, typography, spacing

## 🎨 **Styling Strategy**

### **Global Styles** (`src/styles/`)

- **responsive-images.css**: Image optimization styles
- **index.css**: Global styles and Tailwind imports

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

- **New sections**: Add to `src/components/sections/`
- **New UI components**: Add to `src/components/ui/`
- **New hooks**: Add to `src/hooks/`
- **New utilities**: Add to `src/utils/`
- **New constants**: Add to `src/constants/`

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
