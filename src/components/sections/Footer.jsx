import { Instagram, Facebook } from "lucide-react";
import { Container, Button, AppStoreLinks, TikTokIcon } from "../ui";
import { BUSINESS_INFO } from "../../constants/business";
import { getTodayHours } from "../../utils/format";

const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  const todayHours = getTodayHours(BUSINESS_INFO.hours);
  
  return (
    <footer className="border-t border-brand-border bg-brand-background-light w-full">
      <Container className="py-14 flex flex-col items-center justify-center gap-6">
        <div className="text-brand-text-muted text-sm tracking-tight font-mono">
          {todayHours === 'Closed' ? 'Closed today' : `Open today ${todayHours.toLowerCase()}`}
        </div>
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
          <Button 
            variant="ghost" 
            href={BUSINESS_INFO.social.tiktok.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on TikTok ${BUSINESS_INFO.social.tiktok.handle}`}
            className="inline-flex items-center gap-2"
          >
            <TikTokIcon className="w-4 h-4" aria-hidden="true" />
            TikTok
          </Button>
        </div>
        <div className="flex flex-col items-center gap-2">
          <p className="text-sm text-brand-text-muted">Download our app</p>
          <AppStoreLinks placement="footer" variant="buttons" />
        </div>
        <div className="text-brand-text-muted text-xs text-center">
          <address className="not-italic">
            {BUSINESS_INFO.address.street}, {BUSINESS_INFO.address.city}, {BUSINESS_INFO.address.state} {BUSINESS_INFO.address.zip}
          </address>
          <div className="mt-1">
            <a href={`tel:${BUSINESS_INFO.contact.phone}`} className="hover:text-brand-primary transition-colors">
              {BUSINESS_INFO.contact.phone}
            </a>
          </div>
        </div>
        <div className="text-brand-text-muted text-xs text-center mt-2">
          © {2025} Litchfield Perk • Litchfield Park, AZ
        </div>
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