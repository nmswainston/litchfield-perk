import React from "react";
import { MapPin, Clock } from "lucide-react";

// Constants
const BUSINESS_ADDRESS = "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340";

export default function VisitSection() {
  return (
    <section 
      id="visit" 
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="visit-heading"
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
            Visit Us
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            Come join us for an unforgettable coffee experience!
          </p>
        </div>
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '40px',
          alignItems: 'center'
        }}>
          <div style={{
            borderRadius: '16px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#ffffff',
            padding: '24px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            height: '100%',
            display: 'flex',
            flexDirection: 'column'
          }}>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '16px',
              marginBottom: '24px'
            }}>
              <MapPin style={{ width: '28px', height: '28px', color: '#00d294', flexShrink: 0 }} />
              <div>
                <p style={{ 
                  fontWeight: '700', 
                  color: '#000000', 
                  margin: '0 0 8px 0',
                  fontSize: '18px'
                }}>Address</p>
                <p style={{ 
                  color: '#666666', 
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}>{BUSINESS_ADDRESS}</p>
              </div>
            </div>
            <div style={{ 
              display: 'flex', 
              alignItems: 'flex-start', 
              gap: '16px',
              marginBottom: '32px'
            }}>
              <Clock style={{ width: '28px', height: '28px', color: '#f59e0b', flexShrink: 0 }} />
              <div>
                <p style={{ 
                  fontWeight: '700', 
                  color: '#000000', 
                  margin: '0 0 8px 0',
                  fontSize: '18px'
                }}>Today</p>
                <p style={{ 
                  color: '#666666', 
                  margin: 0,
                  fontSize: '16px',
                  lineHeight: '1.5'
                }}>See Hours above</p>
              </div>
            </div>
            <a
              href={`https://www.google.com/maps/search/?api=1&query=${encodeURIComponent(BUSINESS_ADDRESS)}`}
              target="_blank"
              rel="noreferrer"
              style={{
                display: 'inline-block',
                backgroundColor: '#00d294',
                color: '#000000',
                padding: '16px 24px',
                borderRadius: '12px',
                textDecoration: 'none',
                fontWeight: '700',
                fontSize: '16px',
                marginTop: 'auto',
                boxShadow: '0 4px 12px rgba(0, 210, 148, 0.3)',
                transition: 'all 0.3s ease',
                textAlign: 'center'
              }}
            >
              Open in Maps
            </a>
          </div>
          <div style={{
            borderRadius: '16px',
            border: '1px solid #e0e0e0',
            backgroundColor: '#f8f9fa',
            aspectRatio: '16/9',
            width: '100%',
            overflow: 'hidden',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            textAlign: 'center',
            padding: '40px',
            boxShadow: '0 8px 24px rgba(0, 0, 0, 0.08)',
            minHeight: '300px'
          }}>
            <div>
              <MapPin style={{ 
                width: '48px', 
                height: '48px', 
                color: '#00d294', 
                margin: '0 auto 16px auto',
                display: 'block'
              }} />
              <p style={{ 
                color: '#666666', 
                margin: 0,
                fontSize: '16px',
                fontWeight: '500'
              }}>
                Map embed placeholder. Drop your Google Maps iframe here.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
