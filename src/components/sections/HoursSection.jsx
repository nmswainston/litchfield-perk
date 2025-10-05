import React from "react";
import { Section, Container } from "../ui";

export default function HoursSection() {
  return (
    <Section 
      id="hours" 
      background="light"
      padding="lg"
      aria-labelledby="hours-heading"
    >
      <Container>
        <div className="mb-8 sm:mb-10">
          <h2 className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand-text mb-4 sm:mb-5 text-center leading-tight px-4">
            Hours
          </h2>
          <p className="text-brand-text-muted text-base sm:text-lg md:text-xl mb-0 max-w-3xl mx-auto leading-relaxed px-4">
            Come visit us during our operating hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Weekday Hours */}
          <div className="bg-brand-background rounded-2xl p-6 sm:p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-brand-text mb-6 text-center">
              Weekdays
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-brand-border-light">
                <span className="text-brand-text-light font-medium">Monday - Friday</span>
                <span className="text-brand-primary font-bold text-lg">5:30 AM - 2:00 PM</span>
              </div>
            </div>
            <p className="text-brand-text-muted text-sm mt-6 text-center">
              Perfect for your morning coffee or afternoon break
            </p>
          </div>

          {/* Weekend Hours */}
          <div className="bg-brand-background rounded-2xl p-6 sm:p-8 shadow-soft">
            <h3 className="text-2xl font-bold text-brand-text mb-6 text-center">
              Weekends
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-brand-border-light">
                <span className="text-brand-text-light font-medium">Saturday</span>
                <span className="text-brand-primary font-bold text-lg">7:00 AM - 12:00 PM</span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-brand-border-light">
                <span className="text-brand-text-light font-medium">Sunday</span>
                <span className="text-brand-primary font-bold text-lg">Closed</span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Hours Note */}
        <div className="mt-12 p-6 bg-brand-primary-light/10 rounded-2xl border border-brand-primary-light/20">
          <p className="text-brand-text-light text-center leading-relaxed">
            <strong>Holiday Hours:</strong> We may have special hours during holidays. 
            Follow us on Instagram for updates or call ahead to confirm.
          </p>
        </div>
      </Container>
    </Section>
  );
}