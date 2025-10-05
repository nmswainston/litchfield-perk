import React from "react";

function DottyWord({ text, size = "text-4xl md:text-6xl", color = "#ffffff", textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)", className = "" }) {
  const letters = text.split("");
  const accentColors = [
    "#3080ff", // blue-500
    "#ffe02a", // yellow-300
    "#fb2c36", // red-500
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
      className={`${className} ${size}`}
      style={{
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
      {letters.map((ch, i) => (
        <React.Fragment key={i}>
          <span style={{ margin: '0 0.1em', userSelect: 'none' }}>{ch}</span>
          {i < letters.length - 1 && (
            <span
              style={{
                margin: '0 0.2em',
                display: 'inline-block',
                height: '8px',
                width: '8px',
                borderRadius: '50%',
                backgroundColor: accentColors[i % accentColors.length]
              }}
            />
          )}
        </React.Fragment>
      ))}
    </div>
  );
}

export default DottyWord;
