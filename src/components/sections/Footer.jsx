import React from "react";
import { Container, Button } from "../ui";

// Constants
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-background-light w-full">
      <Container className="py-14 flex flex-col items-center justify-center gap-6">
        {/* Monospace timestamp */}
        <div className="text-brand-text-muted text-sm tracking-tight font-mono">
          Open today 6:00a–6:00p
        </div>
        {/* Social row */}
        <div className="flex items-center gap-4">
          <Button variant="ghost" href="#instagram">Instagram</Button>
          <Button variant="ghost" href="#">Facebook</Button>
          <Button variant="ghost" href="#">TikTok</Button>
        </div>
        <div className="text-brand-text-muted text-xs text-center mt-2">
          © {CURRENT_YEAR} Litchfield Perk • Litchfield Park, AZ
        </div>
      </Container>
    </footer>
  );
}