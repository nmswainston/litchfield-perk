import React from 'react';

export default function SimpleTest() {
  return (
    <div 
      style={{
        backgroundColor: '#0e0e10',
        color: 'white',
        minHeight: '100vh',
        padding: '20px',
        fontFamily: 'Arial, sans-serif'
      }}
    >
      <h1 style={{ color: 'white', fontSize: '32px', marginBottom: '20px' }}>
        LITCHFIELD PERK - SIMPLE TEST
      </h1>
      
      <div style={{ 
        backgroundColor: '#121214', 
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
          backgroundColor: '#0B6534',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          margin: '10px 0',
          fontWeight: 'bold'
        }}>
          This box should be GREEN with BLACK text
        </div>
        
        <div style={{
          backgroundColor: '#ff6b6b',
          color: 'white',
          padding: '15px',
          borderRadius: '8px',
          margin: '10px 0',
          fontFamily: 'monospace'
        }}>
          DEBUG: If you can see this RED box with WHITE text, React styling is working.
        </div>
      </div>
      
      <div style={{ 
        backgroundColor: '#121214', 
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
