import React from "react";
import { Container } from "../ui";

// Constants
const CURRENT_YEAR = new Date().getFullYear();

export default function Footer() {
  return (
    <footer className="border-t border-brand-border bg-brand-background-light w-full">
      <Container className="py-15 flex flex-col items-center justify-between gap-5">
        <div className="text-brand-text-muted text-base font-medium">
          © {CURRENT_YEAR} Litchfield Perk. All rights reserved.
        </div>
        <div className="text-brand-text-muted text-sm text-center">
          <p className="mb-2">
            <strong>Litchfield Perk</strong> — Litchfield Park's Friendly Neighborhood Cafe
          </p>
          <p>
            4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340
          </p>
          <p className="mt-2">
            Phone: (480) 823-4073
          </p>
        </div>
        <div className="text-brand-text-muted text-xs text-center">
          <p>
            Made with ☕ and ❤️ for our community
          </p>
        </div>
      </Container>
    </footer>
  );
}