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

          <div className="max-w-4xl mx-auto">
            <div className="bg-brand-background-light rounded-xl shadow-md overflow-hidden">
              <div className="grid grid-cols-1 lg:grid-cols-2">
                {/* Left: Location */}
                <div className="p-6 sm:p-8 flex flex-col">
                  <div className="mb-6">
                    <h3 className="subheading text-brand-text mb-1">Location</h3>

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

                {/* Right: Map */}
                <div className="border-t lg:border-t-0 lg:border-l border-black/5">
                  <div className="aspect-[16/9] lg:aspect-auto lg:h-full min-h-[240px]">
                    <iframe
                      src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3326.778583557702!2d-112.36179652430665!3d33.50713737336709!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x872b47178b175ccf%3A0x7d21982efd535e9e!2s4870%20N%20Litchfield%20Rd%20Suite%20103%2C%20Litchfield%20Park%2C%20AZ%2085340!5e0!3m2!1sen!2sus!4v1771507099057!5m2!1sen!2sus"
                      className="w-full h-full border-0"
                      loading="lazy"
                      allowFullScreen
                      referrerPolicy="no-referrer-when-downgrade"
                      title="Litchfield Perk Location Map"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </SectionShell>
      </Container>
    </Section>
  );
}
