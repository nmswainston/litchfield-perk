import React from "react";

export default function ReviewsSection() {
  return (
    <section 
      id="reviews" 
      style={{
        backgroundColor: '#f8f9fa',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="reviews-heading"
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
            Customer Reviews
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            See what our customers are saying about us
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px',
          marginBottom: '30px'
        }}>
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            textAlign: 'left',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '24px' 
            }}>
              <div style={{ color: '#fbbf24', fontSize: '24px', marginRight: '12px' }}>★★★★★</div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#000000' }}>5/5</span>
            </div>
            <p style={{ 
              color: '#333333', 
              fontSize: '17px', 
              lineHeight: '1.7',
              marginBottom: '24px',
              fontStyle: 'italic',
              flex: 1
            }}>
              "First time trying. Will definitely be back. Tried one of their cold brew and their specialty latte. Both were super good. I'm always hesitant to try new coffee because I like my coffee to actually taste like coffee, not sugary milk. I was very pleased and highly recommend it."
            </p>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              color: '#000000',
              marginTop: 'auto'
            }}>
              — Alexandria A.
            </div>
          </div>
          
          <div style={{
            backgroundColor: '#ffffff',
            borderRadius: '16px',
            padding: '30px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            textAlign: 'left',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'center', 
              marginBottom: '24px' 
            }}>
              <div style={{ color: '#fbbf24', fontSize: '24px', marginRight: '12px' }}>★★★★★</div>
              <span style={{ fontSize: '18px', fontWeight: '700', color: '#000000' }}>5/5</span>
            </div>
            <p style={{ 
              color: '#333333', 
              fontSize: '17px', 
              lineHeight: '1.7',
              marginBottom: '24px',
              fontStyle: 'italic',
              flex: 1
            }}>
              "My boyfriend and I visited Litchfield Perk, and the cold brew here quickly moved into his top 3 in the state. Personally, I loved the added touch of the chocolate espresso bean with the drink, and the pastries here are the best I've ever had."
            </p>
            <div style={{ 
              fontSize: '16px', 
              fontWeight: '700', 
              color: '#000000',
              marginTop: 'auto'
            }}>
              — Skylar W.
            </div>
          </div>
        </div>
        
        <a
          href="#reviews"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00d294',
            color: '#000000',
            padding: '12px 24px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px'
          }}
        >
          Want to Read More Reviews?
        </a>
      </div>
    </section>
  );
}
