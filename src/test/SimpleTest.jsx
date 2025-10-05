import React from 'react';

export default function SimpleTest() {
  return (
    <div 
      style={{
        backgroundColor: 'var(--ink, #1b1f28)',
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'var(--font-family-sans)'
      }}
    >
      <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '20px' }}>
        LITCHFIELD PERK - SIMPLE TEST
      </h1>
      
      <div style={{ 
        backgroundColor: 'var(--ink, #1b1f28)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '10px',
        marginBottom: '20px'
      }}>
        <h2 style={{ color: 'white', marginBottom: '10px' }}>Menu Highlights</h2>
        <p style={{ color: 'white', marginBottom: '10px' }}>
          This should be WHITE text on a DARK background.
        </p>
        
        <div style={{
          backgroundColor: 'var(--color-brand-500, var(--brand-500))',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          margin: '10px 0',
          fontWeight: 'bold'
        }}>
          This box should be GREEN with BLACK text
        </div>
        
        <div style={{
          backgroundColor: 'var(--color-accent-tomato)',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          margin: '10px 0',
          fontFamily: 'ui-monospace, SFMono-Regular, Menlo, Monaco, Consolas, "Liberation Mono", "Courier New", monospace'
        }}>
          DEBUG: If you can see this RED box with WHITE text, React styling is working.
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: 'var(--ink, #1b1f28)', 
        color: 'white', 
        padding: '20px', 
        borderRadius: '10px'
      }}>
        <h2 style={{ color: 'white', marginBottom: '10px' }}>Hours</h2>
        <p style={{ color: 'white' }}>Mon–Fri: 5:30a – 2:00p</p>
        <p style={{ color: 'white' }}>Sat: 7:00a – 12:00p</p>
        <p style={{ color: 'white' }}>Sun: Closed</p>
      </div>
    </div>
  );
}
