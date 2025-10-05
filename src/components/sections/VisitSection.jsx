import React from "react";
import { MapPin, Clock, Phone } from "lucide-react";
import { Section, Container, Button } from "../ui";

// Constants
const BUSINESS_ADDRESS = "4870 N Litchfield Rd Suite 103, Litchfield Park, AZ 85340";
const PHONE_NUMBER = "(480) 823-4073";

export default function VisitSection() {
  return (
    <Section 
      id="visit" 
      background="white"
      padding="lg"
      aria-labelledby="visit-heading"
    >
      <Container>
        <div className="mb-8 sm:mb-10">
          <h2 className="section-title text-brand-text mb-4 sm:mb-5 text-center px-4">
            Visit Us
          </h2>
          <p className="body-text text-brand-text-muted mb-0 max-w-3xl mx-auto px-4">
            Come experience the Litchfield Perk difference
          </p>
        </div>

        <div className="grid grid-cols-1 gap-8 sm:gap-12 max-w-4xl mx-auto">
          {/* Location and Contact tiles */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8">
            <div className="bg-brand-background-light rounded-2xl p-6 sm:p-8 shadow-soft h-full flex flex-col">
              <div className="mb-6">
                <h3 className="subheading text-brand-text mb-1">
                  Location
                </h3>
                <p className="body-text text-brand-text-light m-0">
                  {BUSINESS_ADDRESS}
                </p>
              </div>
              
              <Button
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="default"
                className="w-full text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4 h-12 mt-auto"
                aria-label="Get directions to Litchfield Perk - Opens in new tab"
              >
                Get Directions
              </Button>
            </div>

            <div className="bg-brand-background-light rounded-2xl p-6 sm:p-8 shadow-soft h-full flex flex-col">
              <div className="mb-6">
                <h3 className="subheading text-brand-text mb-1">
                  Contact
                </h3>
                <p className="body-text text-brand-text-light m-0">
                  Call us for questions or to place an order
                </p>
              </div>
              
              <Button
                href={`tel:${PHONE_NUMBER}`}
                variant="secondary"
                size="default"
                className="w-full text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4 h-12 gap-0 mt-auto"
                aria-label={`Call Litchfield Perk at ${PHONE_NUMBER}`}
              >
                {PHONE_NUMBER}
              </Button>
            </div>
          </div>

          {/* Map removed per request */}
        </div>
      </Container>
    </Section>
  );
}