import React from "react";

export default function HoursSection() {
  return (
    <section 
      id="hours" 
      style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="hours-heading"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '40px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Hours
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Come visit us during our operating hours
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(250px, 1fr))', 
          gap: '20px',
          marginBottom: '30px'
        }}>
          {[
            ["Mon–Fri", "5:30a – 2:00p"],
            ["Sat", "7:00a – 12:00p"],
            ["Sun", "Closed"],
          ].map(([d, h], i) => (
            <div 
              key={i} 
              style={{
                borderRadius: '12px',
                border: '1px solid #e0e0e0',
                backgroundColor: '#ffffff',
                padding: '20px',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
                transition: 'all 0.3s ease',
                boxShadow: '0 4px 12px rgba(0, 0, 0, 0.05)',
                minHeight: '80px'
              }}
            >
              <span style={{ 
                color: '#333333', 
                fontWeight: '600',
                fontSize: '16px'
              }}>{d}</span>
              <span style={{ 
                fontWeight: '700', 
                color: '#000000',
                fontSize: '16px'
              }}>{h}</span>
            </div>
          ))}
        </div>
        <p style={{ 
          fontSize: '12px', 
          color: '#999999',
          margin: 0
        }}>
          Hours updated Sep 26, 2025. Call ahead for holiday hours.
        </p>
      </div>
    </section>
  );
}
