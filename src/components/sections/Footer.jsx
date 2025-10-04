import React from "react";

// Constants
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer style={{
      borderTop: '1px solid #e0e0e0',
      backgroundColor: '#f8f9fa',
      width: '100%'
    }}>
      <div style={{
        maxWidth: '1200px',
        margin: '0 auto',
        padding: '60px 20px',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'space-between',
        gap: '20px'
      }}>
        <div style={{ 
          color: '#666666', 
          fontSize: '16px',
          fontWeight: '500'
        }}>
          © {CURRENT_YEAR} Litchfield Perk. All rights reserved.
        </div>
        <div style={{ 
          color: '#999999', 
          fontSize: '14px', 
          textAlign: 'center',
          maxWidth: '600px',
          lineHeight: '1.5'
        }}>
          Design inspired by a certain 90s sitcom's vibes and color accents. No official affiliation.
        </div>
      </div>
    </footer>
  );
}
