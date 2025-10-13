import React from "react";

/**
 * ResponsiveImage component with WebP support, srcset, and CLS prevention
 * @param {Object} props
 * @param {string} props.src - Base image path (without extension)
 * @param {string} props.alt - Alt text for accessibility
 * @param {Object} props.sizes - Object with breakpoint sizes { mobile: '400px', desktop: '800px' }
 * @param {Object} props.dimensions - Object with { width, height } for CLS prevention
 * @param {string} props.className - CSS classes
 * @param {Object} props.style - Inline styles
 * @param {string} props.loading - Loading strategy ('lazy', 'eager')
 */
export default function ResponsiveImage({
  src,
  alt,
  sizes = { mobile: "400px", desktop: "800px" },
  dimensions,
  className = "",
  style = {},
  loading = "lazy",
  ...props
}) {
  // Extract base path without extension
  const basePath = src.replace(/\.[^/.]+$/, "");
  const fallbackSrc = src.includes(".") ? src : `${src}.png`;

  // Generate srcset for both WebP and fallback formats
  const generateSrcSet = (format) => {
    const mobileSrc = `/images/optimized${basePath}-mobile.${format}`;
    const desktopSrc = `/images/optimized${basePath}-desktop.${format}`;
    return `${mobileSrc} ${sizes.mobile}, ${desktopSrc} ${sizes.desktop}`;
  };

  const webpSrcSet = generateSrcSet("webp");
  const fallbackSrcSet = generateSrcSet("png");

  return (
    <picture>
      {/* WebP source for modern browsers */}
      <source
        srcSet={webpSrcSet}
        sizes={`(max-width: 768px) ${sizes.mobile}, ${sizes.desktop}`}
        type="image/webp"
      />

      {/* PNG fallback */}
      <source
        srcSet={fallbackSrcSet}
        sizes={`(max-width: 768px) ${sizes.mobile}, ${sizes.desktop}`}
        type="image/png"
      />

      {/* Fallback img element */}
      <img
        src={fallbackSrc}
        alt={alt}
        width={dimensions?.width}
        height={dimensions?.height}
        className={`responsive-image ${className}`}
        style={{
          ...style,
          objectFit: "contain",
          maxWidth: "100%",
          height: "auto",
        }}
        loading={loading}
        decoding="async"
        onLoad={(e) => {
          e.target.setAttribute("data-loaded", "true");
        }}
        onError={(e) => {
          // Fallback to a placeholder if image fails to load
          e.target.src =
            "data:image/svg+xml;base64,PHN2ZyB3aWR0aD0iNDAwIiBoZWlnaHQ9IjMwMCIgeG1sbnM9Imh0dHA6Ly93d3cudzMub3JnLzIwMDAvc3ZnIj48cmVjdCB3aWR0aD0iMTAwJSIgaGVpZ2h0PSIxMDAlIiBmaWxsPSIjZjNmNGY2Ii8+PHRleHQgeD0iNTAlIiB5PSI1MCUiIGZvbnQtZmFtaWx5PSJBcmlhbCwgc2Fucy1zZXJpZiIgZm9udC1zaXplPSIxNCIgZmlsbD0iIzk5OTk5OSIgdGV4dC1hbmNob3I9Im1pZGRsZSIgZHk9Ii4zZW0iPkltYWdlIG5vdCBmb3VuZDwvdGV4dD48L3N2Zz4=";
        }}
        role="img"
        {...props}
      />
    </picture>
  );
}

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
  const basePath = src.replace(/\.[^/.]+$/, "");

  // Generate CSS custom properties for responsive background images
  const backgroundStyles = {
    "--bg-mobile": `url('/images/optimized${basePath}-mobile.webp')`,
    "--bg-desktop": `url('/images/optimized${basePath}-desktop.webp')`,
    "--bg-fallback": `url('/images/optimized${basePath}-desktop.png')`,
    ...style,
  };

  return (
    <div className={className} style={backgroundStyles} {...props}>
      {children}

      {/* CSS for responsive background images */}
      <style jsx>{`
        div {
          background-image: var(--bg-fallback);
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        @supports (
          background-image: url("/images/optimized${basePath}-mobile.webp")
        ) {
          div {
            background-image: var(--bg-mobile);
          }
        }

        @media (min-width: 768px) {
          div {
            background-image: var(--bg-desktop);
          }
        }
      `}</style>
    </div>
  );
}
