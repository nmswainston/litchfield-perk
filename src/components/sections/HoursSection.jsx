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
          <h2 className="text-section-title text-brand-text mb-4 sm:mb-5 text-center px-4">
            Hours
          </h2>
          <p className="text-body text-brand-text-muted mb-0 max-w-3xl mx-auto px-4">
            Come visit us during our operating hours
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 container-narrow">
          {/* Weekday Hours */}
          <div className="card-light p-6 sm:p-8">
            <h3 className="text-subheading text-brand-text mb-6 text-center">
              Weekdays
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-brand-border-light">
                <span className="text-brand-text-light font-medium">
                  Monday - Friday
                </span>
                <span className="text-accent-price text-brand-primary">
                  5:30 AM - 2:00 PM
                </span>
              </div>
            </div>
            <p className="text-body text-brand-text-muted mt-6 text-center">
              Perfect for your morning coffee or afternoon break
            </p>
          </div>

          {/* Weekend Hours */}
          <div className="card-light p-6 sm:p-8">
            <h3 className="text-subheading text-brand-text mb-6 text-center">
              Weekends
            </h3>
            <div className="space-y-4">
              <div className="flex justify-between items-center py-3 border-b border-brand-border-light">
                <span className="text-brand-text-light font-medium">
                  Saturday
                </span>
                <span className="text-accent-price text-brand-primary">
                  7:00 AM - 12:00 PM
                </span>
              </div>
              <div className="flex justify-between items-center py-3 border-b border-brand-border-light">
                <span className="text-brand-text-light font-medium">
                  Sunday
                </span>
                <span className="text-brand-primary font-bold text-lg">
                  Closed
                </span>
              </div>
            </div>
          </div>
        </div>

        {/* Special Hours Note */}
        <div className="mt-12 p-6 bg-brand-primary-light/10 rounded-2xl border border-brand-primary-light/20">
          <p className="text-body text-brand-text-light text-center leading-relaxed">
            <strong>Holiday Hours:</strong> We may have special hours during
            holidays. Follow us on Instagram for updates or call ahead to
            confirm.
          </p>
        </div>
      </Container>
    </Section>
  );
}
