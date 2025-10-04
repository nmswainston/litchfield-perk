import React from "react";

function MenuCard({ 
  name, 
  description, 
  price, 
  popular = false, 
  allergens = [], 
  calories = null,
  category = null 
}) {
  return (
    <div style={{
      borderRadius: '12px',
      border: '1px solid #e0e0e0',
      backgroundColor: '#ffffff',
      padding: '20px',
      boxShadow: '0 4px 6px rgba(0, 0, 0, 0.1)',
      transition: 'all 0.3s ease',
      position: 'relative'
    }}>
      {/* Popular badge */}
      {popular && (
        <div style={{
          position: 'absolute',
          top: '-8px',
          right: '12px',
          backgroundColor: '#00d294',
          color: '#000000',
          padding: '4px 8px',
          borderRadius: '12px',
          fontSize: '10px',
          fontWeight: '600',
          textTransform: 'uppercase',
          letterSpacing: '0.1em'
        }}>
          Popular
        </div>
      )}
      
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
            margin: '0 0 12px 0'
          }}>
            {description}
          </p>
          
          {/* Additional info */}
          <div style={{ 
            display: 'flex', 
            flexWrap: 'wrap', 
            gap: '8px',
            fontSize: '12px',
            color: '#888888'
          }}>
            {calories && (
              <span style={{
                backgroundColor: '#f3f4f6',
                padding: '2px 6px',
                borderRadius: '4px'
              }}>
                {calories} cal
              </span>
            )}
            {allergens.length > 0 && (
              <span style={{
                backgroundColor: '#fef3c7',
                padding: '2px 6px',
                borderRadius: '4px',
                color: '#92400e'
              }}>
                Contains: {allergens.join(', ')}
              </span>
            )}
          </div>
        </div>
        
        <div style={{ 
          textAlign: 'right', 
          flexShrink: 0, 
          minWidth: '80px' 
        }}>
          <div style={{ 
            fontSize: '20px', 
            fontWeight: 'bold', 
            color: '#000000',
            whiteSpace: 'nowrap'
          }}>
            ${price.toFixed(2)}
          </div>
        </div>
      </div>
    </div>
  );
}

export default MenuCard;
