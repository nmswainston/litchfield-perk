/**
 * Footer Component
 * 
 * Site footer displaying current hours status, social media links,
 * and copyright information. Updates dynamically based on today's hours.
 * 
 * @component
 */
import { Container, Button } from "../ui";
import { BUSINESS_INFO } from "../../constants/business";
import { getTodayHours } from "../../utils/format";

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
        <div className="flex items-center gap-4">
          <Button 
            variant="ghost" 
            href={BUSINESS_INFO.social.instagram.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on Instagram ${BUSINESS_INFO.social.instagram.handle}`}
          >
            Instagram
          </Button>
          <Button 
            variant="ghost" 
            href={BUSINESS_INFO.social.facebook.url}
            target="_blank"
            rel="noopener noreferrer"
            aria-label={`Follow us on Facebook`}
          >
            Facebook
          </Button>
        </div>
        <div className="text-brand-text-muted text-xs text-center mt-2">
          © {CURRENT_YEAR} Litchfield Perk • Litchfield Park, AZ
        </div>
      </Container>
    </footer>
  );
}