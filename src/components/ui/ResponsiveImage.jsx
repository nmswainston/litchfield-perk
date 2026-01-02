/**
 * BackgroundImage component for CSS background images with WebP support
 * @param {Object} props
 * @param {string} props.src - Base image path (without extension)
 * @param {string} props.className - CSS classes
 * @param {Object} props.style - Inline styles
 * @param {Object} props.children - Child elements
 */
export function BackgroundImage({
  src,
  className = "",
  style = {},
  children,
  ...props
}) {
  // Extract base path without extension
  // Example: "/botanical-pattern.png" -> "/botanical-pattern"
  // Expected file structure: /images/optimized/botanical-pattern-mobile.webp, etc.
  const basePath = src.replace(/\.[^/.]+$/, "");

  // Generate CSS custom properties for responsive background images
  // Path construction: /images/optimized{basePath}-mobile.webp
  // This matches the actual file structure in public/images/optimized/
  const backgroundStyles = {
    "--bg-mobile": `url('/images/optimized${basePath}-mobile.webp')`,
    "--bg-desktop": `url('/images/optimized${basePath}-desktop.webp')`,
    "--bg-fallback": `url('/images/optimized${basePath}-desktop.png')`,
    ...style,
  };

  // Generate unique class name for this component instance
  const uniqueId = `bg-image-${basePath.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  return (
    <>
      {/* CSS for responsive background images */}
      <style>{`
        .${uniqueId} {
          background-image: var(--bg-fallback);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        @supports (background-image: url("/images/optimized${basePath}-mobile.webp")) {
          .${uniqueId} {
            background-image: var(--bg-mobile);
          }
        }

        @media (min-width: 768px) {
          .${uniqueId} {
            background-image: var(--bg-desktop);
          }
        }
      `}</style>
      <div className={`${uniqueId} ${className}`} style={backgroundStyles} {...props}>
        {children}
      </div>
    </>
  );
}
