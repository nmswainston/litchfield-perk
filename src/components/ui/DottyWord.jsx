import React from "react";

function DottyWord({ text, size = "text-4xl md:text-6xl", color = "var(--color-brand-secondary, #ffffff)", textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)", className = "" }) {
  const letters = text.split("");
  const accentColors = [
    "var(--color-accent-cobalt)",
    "var(--color-accent-mustard)",
    "var(--color-accent-tomato)",
  ];
  
  // Responsive font sizing
  const getFontSize = () => {
    if (size === "text-lg sm:text-xl lg:text-2xl") return { base: '16px', sm: '18px', lg: '20px' };
    if (size === "text-xl sm:text-2xl") return { base: '18px', sm: '20px' };
    if (size === "text-2xl sm:text-3xl") return { base: '20px', sm: '24px' };
    if (size === "text-4xl md:text-6xl") return { base: '28px', md: '36px' };
    return { base: '36px' };
  };
  
  const fontSize = getFontSize();
  
  return (
    <div 
      className={`${className} ${size} dotty-word`}
      style={{ color: color, textShadow: textShadow }}
    >
      {letters.map((ch, i) => (
        <React.Fragment key={i}>
          <span className="dotty-letter">{ch}</span>
          {i < letters.length - 1 && (
            <span
              className="dotty-sep"
              style={{ backgroundColor: accentColors[i % accentColors.length] }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default DottyWord;
