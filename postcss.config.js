// PostCSS configuration for Safari compatibility
// Tailwind CSS v4 includes autoprefixer, but we ensure it's explicitly configured
export default {
  plugins: {
    '@tailwindcss/postcss': {},
    // Autoprefixer is included in Tailwind v4, but we ensure it runs
    // It will use .browserslistrc for browser targeting
    autoprefixer: {},
  },
};
