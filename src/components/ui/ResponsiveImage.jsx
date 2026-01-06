export function BackgroundImage({
  src,
  className = "",
  style = {},
  children,
  ...props
}) {
  const basePath = src.replace(/\.[^/.]+$/, "");

  const backgroundStyles = {
    "--bg-mobile-webp": `url('/images/optimized${basePath}-mobile.webp')`,
    "--bg-desktop-webp": `url('/images/optimized${basePath}-desktop.webp')`,
    "--bg-mobile-png": `url('/images/optimized${basePath}-mobile.png')`,
    "--bg-desktop-png": `url('/images/optimized${basePath}-desktop.png')`,
    ...style,
  };

  const uniqueId = `bg-image-${basePath.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  return (
    <>
      <style>{`
        .${uniqueId} {
          background-size: cover;
          background-position: center;
          background-repeat: no-repeat;
        }

        /* Default: PNG fallback for browsers without WebP support */
        .${uniqueId} {
          background-image: var(--bg-mobile-png);
        }

        /* Use WebP if supported (class set by webp.js utility) */
        .webp .${uniqueId} {
          background-image: var(--bg-mobile-webp);
        }

        /* Desktop: PNG fallback */
        @media (min-width: 768px) {
          .${uniqueId} {
            background-image: var(--bg-desktop-png);
          }
        }

        /* Desktop: WebP if supported */
        @media (min-width: 768px) {
          .webp .${uniqueId} {
            background-image: var(--bg-desktop-webp);
          }
        }
      `}</style>
      <div className={`${uniqueId} ${className}`} style={backgroundStyles} {...props}>
        {children}
      </div>
    </>
  );
}
