/**
 * Footer Component
 * 
 * Site footer displaying current hours status, social media links,
 * and copyright information. Updates dynamically based on today's hours.
 * 
 * @component
 */
import { Instagram, Facebook, Smartphone } from "lucide-react";
import { Container, Button } from "../ui";
import { BUSINESS_INFO, APP_STORE_URL, APP_NAME } from "../../constants/business";
import { getTodayHours } from "../../utils/format";
import { trackAppStoreClick } from "../../utils/appStore";

// Constants
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const todayHours = getTodayHours(BUSINESS_INFO.hours);
  
  return (
    <footer className="border-t border-brand-border bg-brand-background-light w-full">
      <Container className="py-14 flex flex-col items-center justify-center gap-6">
        {/* Monospace timestamp */}
        <div className="text-brand-text-muted text-sm tracking-tight font-mono">
          {todayHours === 'Closed' ? 'Closed today' : `Open today ${todayHours.toLowerCase()}`}
        </div>
        {/* Social row */}
        <div className="flex items-center gap-4 flex-wrap justify-center">
          <Button 
            variant="ghost" 
            href={BUSINESS_INFO.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on Instagram ${BUSINESS_INFO.social.instagram.handle}`}
            className="inline-flex items-center gap-2"
          >
            <Instagram className="w-4 h-4" aria-hidden="true" />
            Instagram
          </Button>
          <Button 
            variant="ghost" 
            href={BUSINESS_INFO.social.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on Facebook`}
            className="inline-flex items-center gap-2"
          >
            <Facebook className="w-4 h-4" aria-hidden="true" />
            Facebook
          </Button>
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppStoreClick("footer", APP_STORE_URL)}
            className="inline-flex items-center gap-2 text-sm font-medium text-brand-text-muted hover:text-brand-primary transition-colors duration-200"
            aria-label={`Get the ${APP_NAME} app on Google Play`}
          >
            <Smartphone className="w-4 h-4" aria-hidden="true" />
            Get the App
          </a>
        </div>
        <div className="text-brand-text-muted text-xs text-center mt-2">
          © {2025} Litchfield Perk • Litchfield Park, AZ
        </div>
        {/* Studio Attribution */}
        <div className="border-t border-brand-border pt-4 mt-4 w-full">
          <p className="text-brand-text-muted text-[11px] text-center opacity-65">
            Crafted by{' '}
            <a
              href="https://consolelogic.net"
              target="_blank"
              rel="noopener noreferrer"
              className="hover:opacity-100 transition-opacity duration-200 focus:outline-none focus:ring-2 focus:ring-brand-primary focus:ring-offset-1 rounded-sm"
            >
              Console Logic
            </a>
          </p>
        </div>
      </Container>
    </footer>
  );
}