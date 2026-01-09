import { Section, Container, Button, SectionShell } from "../ui";
import { BUSINESS_INFO } from "../../constants/business";

export default function VisitSection() {
  const street = BUSINESS_INFO.address.street;
  const cityStateZip = `${BUSINESS_INFO.address.city}, ${BUSINESS_INFO.address.state} ${BUSINESS_INFO.address.zip}`;
  const mapsQuery = `${street}, ${cityStateZip}`;

  return (
    <Section 
      id="visit" 
      background="white"
      padding="lg"
      aria-labelledby="visit-heading"
    >
      <Container>
        <SectionShell
          title="Visit Us"
          titleId="visit-heading"
          subhead="Come experience the Litchfield Perk difference"
          align="center"
          divider={false}
          className="mb-8 sm:mb-10"
        >
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
            <div className="bg-brand-background-light rounded-xl p-6 sm:p-8 shadow-md h-full flex flex-col">
              <div className="mb-6">
                <h3 className="subheading text-brand-text mb-1">
                  Location
                </h3>
                <address className="not-italic body-text text-brand-text-light m-0 leading-snug">
                  <span className="block">{street}</span>
                  <span className="block">{cityStateZip}</span>
                </address>
              </div>
              
              <Button
                href={`https://maps.google.com/?q=${encodeURIComponent(mapsQuery)}`}
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

            <div className="bg-brand-background-light rounded-xl p-6 sm:p-8 shadow-md h-full flex flex-col">
              <div className="mb-6">
                <h3 className="subheading text-brand-text mb-1">
                  Contact
                </h3>
                <p className="body-text text-brand-text-light m-0">
                  Call us for questions or to place an order
                </p>
              </div>
              
              <Button
                href={`tel:${BUSINESS_INFO.contact.phone}`}
                variant="secondary"
                size="default"
                className="w-full text-center whitespace-normal break-words leading-snug px-6 sm:px-8 py-3 sm:py-4 h-12 gap-0 mt-auto"
                aria-label={`Call Litchfield Perk at ${BUSINESS_INFO.contact.phone}`}
              >
                {BUSINESS_INFO.contact.phone}
              </Button>
            </div>
          </div>
        </SectionShell>
      </Container>
    </Section>
  );
}