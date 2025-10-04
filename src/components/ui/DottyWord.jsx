import React from "react";

function DottyWord({ text, size = "text-4xl md:text-6xl", color = "#ffffff", textShadow = "2px 2px 4px rgba(0, 0, 0, 0.8)" }) {
  const letters = text.split("");
  const accentColors = [
    "#3080ff", // blue-500
    "#ffe02a", // yellow-300
    "#fb2c36", // red-500
  ];
  
  return (
    <div style={{
      fontWeight: '700',
      letterSpacing: '0.35em',
      fontSize: size === "text-xl md:text-2xl" ? '20px' : '36px',
      display: 'flex',
      flexWrap: 'wrap',
      alignItems: 'center',
      justifyContent: 'center',
      color: color,
      textShadow: textShadow
    }}>
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
