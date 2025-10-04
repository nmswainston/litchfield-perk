import React from "react";

const sampleMenu = [
  {
    name: "The One With the Cold Brew",
    desc: "Smooth 18‑hour brew over ice. Add vanilla cold foam for a 90s glow‑up.",
    price: "$4.75",
    badge: "fan favorite",
  },
  {
    name: "Purple Door Latte",
    desc: "Velvety latte with house lavender syrup and a hint of honey.",
    price: "$5.25",
    badge: "seasonal",
  },
  {
    name: "Couch Cappuccino",
    desc: "Classic cappuccino, extra microfoam. Settle in like it's your spot.",
    price: "$4.50",
  },
  {
    name: "Litchfield Drip",
    desc: "Signature medium roast. Balanced, cozy, endlessly refillable vibes.",
    price: "$3.25",
  },
];

export default function MenuSection() {
  return (
    <section 
      id="menu" 
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="menu-heading"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Best Selling Products
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Swap flavors, alt milks, and sweetness to taste. Real menu goes here.
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))', 
          gap: '24px',
          marginTop: '0'
        }}>
          {sampleMenu.map((m, idx) => (
            <div key={idx} style={{
              backgroundColor: '#ffffff',
              borderRadius: '16px',
              border: '1px solid #e0e0e0',
              padding: '24px',
              boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
              transition: 'all 0.3s ease',
              textAlign: 'left',
              height: '100%',
              display: 'flex',
              flexDirection: 'column'
            }}>
              <div style={{ 
                display: 'flex', 
                alignItems: 'flex-start', 
                justifyContent: 'space-between', 
                gap: '20px',
                marginBottom: '20px',
                flex: 1
              }}>
                <div style={{ flex: 1, minWidth: 0 }}>
                  <h3 style={{ 
                    fontSize: '22px', 
                    fontWeight: '700', 
                    color: '#000000',
                    marginBottom: '12px',
                    lineHeight: '1.3'
                  }}>
                    {m.name}
                  </h3>
                  <p style={{ 
                    color: '#666666', 
                    fontSize: '15px', 
                    lineHeight: '1.6',
                    margin: 0
                  }}>
                    {m.desc}
                  </p>
                </div>
                <div style={{ 
                  textAlign: 'right',
                  flexShrink: 0,
                  minWidth: '80px'
                }}>
                  {m.badge && (
                    <span style={{ 
                      fontSize: '11px', 
                      textTransform: 'uppercase', 
                      letterSpacing: '0.15em', 
                      color: '#f59e0b',
                      display: 'block',
                      marginBottom: '8px',
                      fontWeight: '700'
                    }}>
                      {m.badge}
                    </span>
                  )}
                  <div style={{ 
                    fontSize: '26px', 
                    fontWeight: '800', 
                    color: '#000000',
                    lineHeight: '1'
                  }}>
                    {m.price}
                  </div>
                </div>
              </div>
              <button style={{
                width: '100%',
                backgroundColor: '#00d294',
                color: '#000000',
                border: 'none',
                padding: '16px 24px',
                borderRadius: '12px',
                fontWeight: '700',
                fontSize: '16px',
                cursor: 'pointer',
                marginTop: 'auto',
                boxShadow: '0 4px 12px rgba(0, 210, 148, 0.3)',
                transition: 'all 0.3s ease'
              }}>
                Quick View
              </button>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
