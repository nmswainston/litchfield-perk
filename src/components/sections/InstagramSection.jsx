import React from "react";
import { Instagram } from "lucide-react";
import InstagramWidget from "../widgets/InstagramWidget";

// Constants
const INSTAGRAM_HANDLE = "@litchfieldperk";
const INSTAGRAM_URL = "https://www.instagram.com/litchfieldperk/";

export default function InstagramSection() {
  return (
    <section 
      id="instagram" 
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="instagram-heading"
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
            Follow Us
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)',
            marginBottom: '0',
            maxWidth: '700px',
            margin: '0 auto',
            lineHeight: '1.6'
          }}>
            See what's brewing on Instagram
          </p>
        </div>
        <InstagramWidget />
        <a
          href={INSTAGRAM_URL}
          target="_blank"
          rel="noreferrer"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '8px',
            backgroundColor: '#00d294',
            color: '#000000',
            padding: '12px 20px',
            borderRadius: '8px',
            textDecoration: 'none',
            fontWeight: '600',
            fontSize: '16px',
            marginTop: '24px'
          }}
        >
          <Instagram style={{ width: '16px', height: '16px' }} /> Follow {INSTAGRAM_HANDLE}
        </a>
      </div>
    </section>
  );
}
