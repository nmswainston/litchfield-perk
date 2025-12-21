/**
 * Pill Component
 * 
 * Small badge/pill component for displaying short text with optional icon.
 * Can render as a link or static element based on href prop.
 * 
 * @component
 * @param {React.ReactNode} children - Content to display (alternative to text)
 * @param {string} text - Text content to display
 * @param {React.Component|React.ReactNode} icon - Icon component or element
 * @param {string} href - Optional URL for link rendering
 * @param {string} className - Additional CSS classes
 */
function Pill({ children, text, icon: Icon, href, className = "" }) {
  const content = text || children;

  const pillContent = (
    <>
      {Icon &&
        (typeof Icon === "function" ? (
          <Icon className="w-4 h-4 opacity-80 text-current" />
        ) : (
          Icon
        ))}
      <span>{content}</span>
    </>
  );

  if (href) {
    return (
      <a
        href={href}
        target="_blank"
        rel="noopener noreferrer"
        className={`pill pill-mobile ${className}`}
      >
        {pillContent}
      </a>
    );
  }

  return <div className={`pill pill-mobile ${className}`}>{pillContent}</div>;
}

export default Pill;
