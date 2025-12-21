/**
 * DottyWord Component
 * 
 * Displays text with decorative dots between letters using brand accent colors.
 * Used for stylized headings and wordmarks with the Friends-inspired aesthetic.
 * 
 * @component
 * @param {string} text - Text to display with dots
 * @param {string} size - Tailwind size classes (default: "text-4xl md:text-6xl")
 * @param {string} color - Text color (default: brand secondary)
 * @param {string} textShadow - CSS text-shadow value
 * @param {string} className - Additional CSS classes
 */
function DottyWord({ 
  text, 
  size = "text-4xl md:text-6xl", 
  color = "var(--color-brand-secondary, #ffffff)", 
  textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)", 
  className = "" 
}) {
  // Brand accent colors for dots
  const ACCENT_COLORS = [
    "var(--color-accent-cobalt)",
    "var(--color-accent-mustard)",
    "var(--color-accent-tomato)",
  ];
  
  const letters = text.split("");
  
  return (
    <div 
      className={`${className} ${size}`}
      style={{
        fontFamily: 'var(--font-family-header, "Caveat", cursive)',
        fontWeight: '700',
        letterSpacing: '0.1em', // Reduced from 0.25em for better mobile fit
        display: 'flex',
        flexWrap: 'wrap',
        alignItems: 'center',
        justifyContent: 'flex-start',
        color: color,
        textShadow: textShadow,
        lineHeight: '1.1'
      }}
    >
      {letters.map((letter, index) => (
        <span key={index}>
          <span style={{ margin: '0 0.1em', userSelect: 'none' }}>
            {letter}
          </span>
          {index < letters.length - 1 && (
            <span
              style={{
                margin: '0 0.2em',
                display: 'inline-block',
                height: '8px',
                width: '8px',
                borderRadius: '50%',
                backgroundColor: ACCENT_COLORS[index % ACCENT_COLORS.length]
              }}
              aria-hidden="true"
            />
          )}
        </span>
      ))}
    </div>
  );
}

export default DottyWord;
