import React from 'react';

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
  sizes = { mobile: '400px', desktop: '800px' },
  dimensions,
  className = '',
  style = {},
  loading = 'lazy',
  ...props
}) {
  // Generate srcset for both WebP and fallback formats
  const generateSrcSet = (format) => {
    const mobileSrc = `${src}-mobile.${format}`;
    const desktopSrc = `${src}-desktop.${format}`;
    return `${mobileSrc} ${sizes.mobile}, ${desktopSrc} ${sizes.desktop}`;
  };

  const webpSrcSet = generateSrcSet('webp');
  const fallbackSrcSet = generateSrcSet('png');
  
  // Fallback image (highest quality)
  const fallbackSrc = `${src}-desktop.png`;

  return (
    <picture>
      {/* WebP source for modern browsers - only if WebP files exist */}
      <source
        type="image/webp"
        srcSet={webpSrcSet}
        sizes={`(max-width: 768px) ${sizes.mobile}, ${sizes.desktop}`}
        onError={(e) => {
          // Hide WebP source if it fails to load
          e.target.style.display = 'none';
        }}
      />
      
      {/* Fallback for older browsers */}
      <img
        src={fallbackSrc}
        srcSet={fallbackSrcSet}
        sizes={`(max-width: 768px) ${sizes.mobile}, ${sizes.desktop}`}
        alt={alt}
        width={dimensions?.width}
        height={dimensions?.height}
        className={`responsive-image ${className}`}
        style={style}
        loading={loading}
        onLoad={(e) => {
          e.target.setAttribute('data-loaded', 'true');
        }}
        onError={(e) => {
          // Fallback to original image if optimized version fails
          e.target.src = src.includes('optimized') ? src.replace('/images/optimized/', '/') + '.png' : e.target.src;
        }}
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
export function BackgroundImage({ src, className = '', style = {}, children, ...props }) {
  // Generate CSS custom properties for responsive background images
  const backgroundStyles = {
    '--bg-mobile': `url('${src}-mobile.webp')`,
    '--bg-desktop': `url('${src}-desktop.webp')`,
    '--bg-fallback': `url('${src}-desktop.png')`,
    ...style
  };

  return (
    <div
      className={className}
      style={backgroundStyles}
      {...props}
    >
      {children}
      
      {/* CSS for responsive background images */}
      <style jsx>{`
        div {
          background-image: var(--bg-fallback);
        }
        
        @supports (background-image: url('${src}-mobile.webp')) {
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
