import React from "react";

function Pill({ children, icon: Icon }) {
  return (
    <div 
      style={{
        display: 'flex',
        alignItems: 'center',
        gap: '8px',
        borderRadius: '20px',
        padding: '8px 12px',
        fontSize: '14px',
        border: '1px solid #e0e0e0',
        backgroundColor: '#f8f9fa',
        color: '#333333'
      }}
    >
      {Icon && <Icon style={{ width: '16px', height: '16px', opacity: 0.8 }} />}
      <span>{children}</span>
    </div>
  );
}

export default Pill;
