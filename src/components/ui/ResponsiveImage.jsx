export function BackgroundImage({
  src,
  className = "",
  style = {},
  children,
  ...props
}) {
  const basePath = src.replace(/\.[^/.]+$/, "");
  const backgroundStyles = {
    "--bg-mobile": `url('/images/optimized${basePath}-mobile.webp')`,
    "--bg-desktop": `url('/images/optimized${basePath}-desktop.webp')`,
    "--bg-fallback": `url('/images/optimized${basePath}-desktop.png')`,
    ...style,
  };

  const uniqueId = `bg-image-${basePath.replace(/[^a-zA-Z0-9]/g, '-')}`;
  
  return (
    <>
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
