# Litchfield Perk Cafe Website ☕

A modern, responsive website for Litchfield Perk Cafe, inspired by the iconic coffee shop from Friends. Built with React, Vite, and Tailwind CSS.

## ✨ Features

- **Responsive Design**: Mobile-first approach with Tailwind CSS
- **Scroll Header**: Dynamic header with botanical pattern absorption effect
- **Modular Architecture**: Clean component organization for maintainability
- **Instagram Integration**: Live Instagram feed widget
- **Performance Optimized**: Fast loading with Vite build system

## 🏗️ Project Structure

```
src/
├── components/
│   ├── layout/              # Global layout components
│   │   └── ScrollHeader.jsx # Navigation with scroll effects
│   ├── sections/            # Page content sections
│   │   ├── HeroSection.jsx
│   │   ├── MenuSection.jsx
│   │   ├── HoursSection.jsx
│   │   ├── VisitSection.jsx
│   │   ├── ReviewsSection.jsx
│   │   ├── InstagramSection.jsx
│   │   └── Footer.jsx
│   ├── ui/                  # Reusable UI components
│   │   ├── DottyWord.jsx
│   │   ├── SectionTitle.jsx
│   │   ├── Pill.jsx
│   │   └── MenuCard.jsx
│   └── widgets/             # Complex components
│       └── InstagramWidget.jsx
├── test/                    # Testing components
│   └── SimpleTest.jsx
└── LitchfieldPerkSite.jsx   # Main orchestrator
```

## 🚀 Getting Started

### Prerequisites

- Node.js (v16 or higher)
- npm or yarn

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

### Building for Production

```bash
npm run build
```

The built files will be in the `dist` directory.

## 🎨 Design Features

- **Botanical Pattern Background**: Custom pattern that absorbs into the header on scroll
- **Smooth Animations**: Framer Motion for elegant transitions
- **Color Scheme**: Friends-inspired green (#00d294) with clean whites and grays
- **Typography**: Clean, readable fonts with proper hierarchy

## 🛠️ Technologies Used

- **React 18**: Modern React with hooks
- **Vite**: Fast build tool and dev server
- **Tailwind CSS**: Utility-first CSS framework
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
3. Import and use it in `LitchfieldPerkSite.jsx`

### Modifying the Header

The scroll header behavior can be customized in `src/components/layout/ScrollHeader.jsx`:
- Adjust `heroHeight` for different transition timing
- Modify `scrollProgress` thresholds for color changes
- Update botanical pattern opacity and blending

### Styling

The project uses Tailwind CSS for styling. Key customizations:
- Colors defined in `tailwind.config.js`
- Component-specific styles in individual files
- Global styles in `src/index.css`

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📞 Contact

For questions or suggestions, please open an issue on GitHub.

---

*"The one where coffee is always there for you"* ☕