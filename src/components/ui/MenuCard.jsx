import React from "react";

function MenuCard({ name, desc, price, badge }) {
  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
      backgroundColor: '#ffffff',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease'
    }}>
      <div style={{ 
        display: 'flex', 
        alignItems: 'flex-start', 
        justifyContent: 'space-between', 
        gap: '16px' 
      }}>
        <div style={{ flex: 1, minWidth: 0, paddingRight: '8px' }}>
          <h3 style={{ 
            fontSize: '18px', 
            fontWeight: '600', 
            color: '#000000',
            marginBottom: '8px'
          }}>
            {name}
          </h3>
          <p style={{ 
            color: '#666666', 
            fontSize: '14px', 
            lineHeight: '1.5',
            margin: 0
          }}>
            {desc}
          </p>
        </div>
        <div style={{ 
          textAlign: 'right', 
          flexShrink: 0, 
          minWidth: '80px' 
        }}>
          {badge && (
            <span style={{ 
              fontSize: '10px', 
              textTransform: 'uppercase', 
              letterSpacing: '0.1em', 
              color: '#f59e0b',
              display: 'block',
              marginBottom: '4px',
              fontWeight: '600'
            }}>
              {badge}
            </span>
          )}
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#000000',
            whiteSpace: 'nowrap'
          }}>
            {price}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
