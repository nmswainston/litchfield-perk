// PROTECTED AREA: Dotty wordmark / dotty text styling (Friends-style dots) - DO NOT MODIFY
function DottyWord({ 
  text, 
  size = "text-4xl md:text-6xl", 
  color = "var(--color-brand-secondary, #ffffff)", 
  textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)", 
  className = "" 
}) {
  const ACCENT_COLORS = [
    "var(--color-accent-cobalt)",
    "var(--color-accent-mustard)",
    "var(--color-accent-tomato)",
  ];
  
  const letters = text.split("");
  
  return (
    <div 
      className={`${className} ${size} dotty-word`}
      style={{
        color: color,
        textShadow: textShadow
      }}
    >
      {letters.map((letter, index) => (
        <span key={index}>
          <span className="dotty-word-letter">
            {letter}
          </span>
          {index < letters.length - 1 && (
            <span
              className="dotty-word-dot"
              style={{
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
