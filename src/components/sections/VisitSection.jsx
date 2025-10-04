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
        <div className="mb-10">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-text mb-5 text-center leading-tight">
            Visit Us
          </h2>
          <p className="text-brand-text-muted text-lg md:text-xl mb-0 max-w-3xl mx-auto leading-relaxed">
            Come experience the Litchfield Perk difference
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 max-w-6xl mx-auto">
          {/* Location Info */}
          <div className="space-y-8">
            <div className="bg-brand-background-light rounded-2xl p-8 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <MapPin className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-text mb-2">
                    Location
                  </h3>
                  <p className="text-brand-text-light leading-relaxed">
                    {BUSINESS_ADDRESS}
                  </p>
                </div>
              </div>
              
              <Button
                href={`https://maps.google.com/?q=${encodeURIComponent(BUSINESS_ADDRESS)}`}
                target="_blank"
                rel="noopener noreferrer"
                variant="primary"
                size="default"
                className="w-full"
                aria-label="Get directions to Litchfield Perk - Opens in new tab"
              >
                <MapPin className="w-4 h-4 mr-2" />
                Get Directions
              </Button>
            </div>

            <div className="bg-brand-background-light rounded-2xl p-8 shadow-soft">
              <div className="flex items-start gap-4 mb-6">
                <div className="w-12 h-12 bg-brand-primary rounded-xl flex items-center justify-center flex-shrink-0">
                  <Phone className="w-6 h-6 text-brand-secondary" />
                </div>
                <div>
                  <h3 className="text-2xl font-bold text-brand-text mb-2">
                    Contact
                  </h3>
                  <p className="text-brand-text-light leading-relaxed">
                    Call us for questions or to place an order
                  </p>
                </div>
              </div>
              
              <Button
                href={`tel:${PHONE_NUMBER}`}
                variant="secondary"
                size="default"
                className="w-full"
                aria-label={`Call Litchfield Perk at ${PHONE_NUMBER}`}
              >
                <Phone className="w-4 h-4 mr-2" />
                {PHONE_NUMBER}
              </Button>
            </div>
          </div>

          {/* Map Placeholder */}
          <div className="bg-brand-background-dark rounded-2xl p-8 shadow-soft flex items-center justify-center min-h-96">
            <div className="text-center">
              <MapPin className="w-16 h-16 text-brand-text-muted mx-auto mb-4" />
              <h3 className="text-xl font-bold text-brand-text mb-2">
                Interactive Map
              </h3>
              <p className="text-brand-text-muted">
                Map integration coming soon
              </p>
            </div>
          </div>
        </div>

        {/* Additional Info */}
        <div className="mt-12 grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="text-center p-6 bg-brand-background-light rounded-xl">
            <Clock className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h4 className="font-bold text-brand-text mb-2">Quick Service</h4>
            <p className="text-brand-text-muted text-sm">
              Fast, friendly service for busy mornings
            </p>
          </div>
          
          <div className="text-center p-6 bg-brand-background-light rounded-xl">
            <MapPin className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h4 className="font-bold text-brand-text mb-2">Easy Parking</h4>
            <p className="text-brand-text-muted text-sm">
              Convenient parking available right outside
            </p>
          </div>
          
          <div className="text-center p-6 bg-brand-background-light rounded-xl">
            <Phone className="w-8 h-8 text-brand-primary mx-auto mb-3" />
            <h4 className="font-bold text-brand-text mb-2">Order Ahead</h4>
            <p className="text-brand-text-muted text-sm">
              Call to place your order for pickup
            </p>
          </div>
        </div>
      </Container>
    </Section>
  );
}