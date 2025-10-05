import React from "react";

function SectionTitle({ children, id }) {
  return (
    <h2 
      id={id} 
      style={{
        fontSize: '32px',
        fontWeight: '700',
        color: 'var(--color-brand-text)',
        letterSpacing: '0.1em',
        fontFamily: 'var(--font-family-header)',
        display: 'flex',
        alignItems: 'center',
        gap: '12px',
        justifyContent: 'center',
        textShadow: '1px 1px 2px rgba(0, 0, 0, 0.1)',
        marginBottom: '20px'
      }}
    >
      <span 
        style={{
          display: 'inline-block',
          height: '8px',
          width: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-cobalt)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }} 
        aria-hidden="true"
        role="presentation"
      />
      {children}
      <span 
        style={{
          display: 'inline-block',
          height: '8px',
          width: '8px',
          borderRadius: '50%',
          backgroundColor: 'var(--color-accent-tomato)',
          boxShadow: '0 1px 2px rgba(0, 0, 0, 0.2)'
        }} 
        aria-hidden="true"
        role="presentation"
      />
    </h2>
  );
}

export default SectionTitle;
