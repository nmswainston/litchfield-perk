/**
 * WholesalePage Component
 * 
 * Wholesale Partner Program page featuring program details, benefits,
 * signature offerings, and contact information.
 * 
 * @component
 */
import { useState } from "react";
import { Download } from "lucide-react";
import { Section, Container, Button, SectionShell, HeroShell } from "../ui";
import ContactModal from "../ui/ContactModal";
import ScrollHeader from "../layout/ScrollHeader";
import Footer from "./Footer";

const FEATURES = [
  {
    title: "Commitment to Earth",
    difference: "The ONLY Zero-Emissions Roasting Process in the Phoenix Valley. Our proprietary, electric-powered roasting system ensures a genuinely low carbon footprint, drastically reducing environment impact compared to traditional gas roasters.",
    value: "Unique Marketing Edge: Attract environmentally conscious consumers and strengthen your brand's sustainability story.",
  },
  {
    title: "Unbeaten Freshness",
    difference: "Roasted In-House at our Litchfield Park Headquarters. Located right here in the heart of the community, we guarantee peak freshness. We control the entire process, ensuring the highest quality from green bean to final roast.",
    value: "Superior Product Quality: Deliver the freshest possible coffee, translating directly into better flavor and customer loyalty.",
  },
  {
    title: "True Customization",
    difference: "Tailored Blends and Roasts for Your Preference. We don't believe in one-size-fits-all. Our team will work with you to accommodate and fully customize the blend and roast profile to perfectly match your brand's unique taste standards.",
    value: "Brand Differentiation: Offer a truly exclusive, signature coffee that only your establishment can provide.",
  },
];

const PROFIT_SCENARIOS = [
  {
    product: "Drip Coffee",
    yield: "200 Cups",
    yieldNote: "(Per 5 lbs)",
    salePrice: "$3.25/cup",
    totalRevenue: "$650.00",
    coffeeCost: "$80.00",
    totalCOGS: "$80.00",
    cogsNote: "(Estimated)",
    netProfit: "$570.00",
  },
  {
    product: "Espresso / Latte",
    yield: "150 Lattes",
    yieldNote: "(300 shots, Per 5 lbs)",
    salePrice: "$5.50/latte",
    totalRevenue: "$825.00",
    coffeeCost: "$80.00",
    totalCOGS: "$230.00",
    cogsNote: "($80 Coffee + $150 Milk/Syrup)",
    netProfit: "$595.00",
  },
];

// Consistent page container wrapper
const PageContainer = ({ children, className = "" }) => (
  <div className={`max-w-6xl mx-auto px-4 sm:px-6 lg:px-8 ${className}`}>
    {children}
  </div>
);

// Consistent section wrapper with vertical rhythm
const PageSection = ({ children, className = "" }) => (
  <div className={`py-14 sm:py-16 ${className}`}>
    {children}
  </div>
);

export default function WholesalePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <ScrollHeader />

      {/* Hero Section - Using Shared HeroShell */}
      <HeroShell
        id="main-content"
        ariaLabelledBy="wholesale-hero-heading"
      >
        {/* Heading */}
        <h1
          id="wholesale-hero-heading"
          className="display-hero text-brand-text"
        >
          Litchfield Perk Coffee: Wholesale Partner Program
        </h1>

        {/* Subtitle */}
        <p className="text-lg sm:text-xl md:text-2xl text-brand-text max-w-2xl mx-auto leading-relaxed px-4 body-text">
          Elevate your brew. Elevate your business. Brew a better cup.
        </p>

        {/* CTA Buttons */}
        <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 px-4">
          <Button
            variant="filled"
            size="lg"
            onClick={handleContactClick}
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5"
            aria-label="Contact our Wholesale Team"
          >
            Contact Wholesale Team
          </Button>
          <Button
            variant="filled"
            size="lg"
            href="/docs/Wholesale Program_251221_103838.pdf"
            download
            className="w-full sm:w-auto sm:min-w-32 px-6 sm:px-8 py-3 sm:py-3.5"
            aria-label="Download Wholesale Partner Program PDF"
          >
            <Download className="h-5 w-5 mr-2 inline" aria-hidden="true" />
            Download Program PDF
          </Button>
        </div>
      </HeroShell>

      {/* Intro + Why Partner Section - Combined Value Proposition */}
      <Section id="wholesale-intro" background="light" padding="lg" className="pt-24 sm:pt-28 md:pt-32">
        <Container>
          <div className="max-w-3xl mx-auto space-y-10 sm:space-y-14">
            {/* Intro Paragraph */}
            <div className="text-brand-text-light text-center">
              <p className="body-text leading-relaxed text-[15px] sm:text-base mx-auto">
                Litchfield Perk Coffee invites you to elevate your coffee program with the freshest, most sustainable beans available in the Phoenix Valley. Our Sunrise Blend and Sierra Azul are our signature offerings, perfectly balanced, vibrant, and smooth roasts designed to be the definitive daily coffee for your discerning customers.
              </p>
            </div>

            {/* Why Partner Section */}
            <div className="text-brand-text-light text-center">
              <h2 className="section-title text-brand-text mb-4">Why Partner with Litchfield Perk?</h2>
              <p className="body-text leading-relaxed text-[15px] sm:text-base mx-auto">
                When you choose Litchfield Perk, you are choosing unparalleled freshness, quality, and environmental responsibility that customers today demand.
              </p>
            </div>
          </div>
        </Container>
      </Section>

      {/* Litchfield Perk Difference Section */}
      <Section id="wholesale-difference" background="white" padding="none">
        <PageSection>
          <PageContainer>
            <div className="space-y-10 sm:space-y-14">
              <SectionShell
                title="Litchfield Perk Difference"
                align="center"
                divider={false}
              >
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6 lg:gap-8 mt-6 sm:mt-8">
                  {FEATURES.map((feature) => (
                    <div
                      key={feature.title}
                      className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-7 shadow-md h-full flex flex-col"
                    >
                      <h3 className="subheading text-brand-text mb-4">{feature.title}</h3>
                      <div className="space-y-4 flex-grow">
                        <div>
                          <h4 className="text-sm font-semibold text-brand-primary mb-2 uppercase tracking-wide">
                            Difference
                          </h4>
                          <p className="body-text text-brand-text-light text-sm leading-relaxed">
                            {feature.difference}
                          </p>
                        </div>
                        <div className="pt-2 border-t border-brand-border-light">
                          <h4 className="text-sm font-semibold text-brand-primary mb-2 uppercase tracking-wide">
                            Value
                          </h4>
                          <p className="body-text text-brand-text-light text-sm leading-relaxed">
                            {feature.value}
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              </SectionShell>
            </div>
          </PageContainer>
        </PageSection>
      </Section>

      {/* Signature Offerings Section - Complete Rebuild */}
      <Section id="wholesale-offerings" background="light" padding="none">
        <PageSection>
          <PageContainer>
            <div className="space-y-10 sm:space-y-14">
              <SectionShell
                title="Our Signature Offerings"
                align="center"
                divider={false}
              >
                <div className="max-w-4xl mx-auto space-y-8 sm:space-y-10 mt-6 sm:mt-8">
                  {/* Sunrise Blend Card */}
                  <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-md">
                    <h3 className="section-title text-brand-text mb-4 text-center">Sunrise Blend</h3>
                    <div className="space-y-4 text-brand-text-light text-center">
                      <p className="body-text leading-relaxed text-[15px] sm:text-base mx-auto">
                        The Sunrise is built around sweetness, silky body and a restrained acidity. Originally designed as a traditional espresso blend, we've found it serves very well as a drip coffee for those who prefer a simpler, smoother cup with lots of ripe red cherry. It shines with or without cream, and works especially well as a cold brew, where its cola and tamarind flavors come out into full blossom. Takes dark roasts well, especially for those who like their coffees to be full of deep pipe tobacco and malty sweetness. The components of the Sunrise Blend rotate seasonally as fresh coffees arrive, but the current iteration is comprised of a naturally processed Brazilian coffee and a washed process Ethiopian coffee.
                      </p>
                      <p className="body-text leading-relaxed text-[15px] sm:text-base mx-auto">
                        The Sunrise Blend is a versatile, approachable, and consistently delicious coffee. It features notes of bright citrus, smooth caramel, and a clean, satisfying finish. It is excellent as a drip coffee, pour-over, or as a base for espresso drinks.
                      </p>
                    </div>
                  </div>

                  {/* Sierra Azul Card */}
                  <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-md">
                    <h3 className="section-title text-brand-text mb-4 text-center">Sierra Azul</h3>
                    <div className="space-y-4 text-brand-text-light text-center">
                      <p className="body-text leading-relaxed text-[15px] sm:text-base mx-auto">
                        Mexico's Sierra Azul is a women-produced lot that is celebrated for its versatility, structure, and beautifully approachable profile by way of Chiapas, Mexico. At lighter roasts, Sierra Azul highlights notes of honeycomb sweetness layered with milk chocolate, almond, and a gentle orange lift. Moving into medium, the sweetness deepens and the profile rounds out, revealing flavors of cola, chocolate, heavy cream, and warm baking spice. As the roast is pushed further, the body grows richer and the acidity mellows, giving way to notes of dark chocolate, toasted nuts, vanilla, caramel, and nutmeg. Taken all the way to a dark roast, expect a heavy-bodied, syrupy expression with bold notes of dark chocolate, cola, and molasses. This coffee makes for an espresso with lush crema, perfect for sipping on its own or beautifully paired with milk, or an approachable, delicious batch brew.
                      </p>
                    </div>
                  </div>
                </div>
              </SectionShell>
            </div>
          </PageContainer>
        </PageSection>
      </Section>

      {/* Profit Scenarios Section */}
      <Section id="wholesale-profit" background="white" padding="none">
        <PageSection>
          <PageContainer>
            <div className="space-y-10 sm:space-y-14">
              <SectionShell
                title="Profit scenarios at a glance"
                align="center"
                divider={false}
              >
                <div className="mt-6 sm:mt-8 overflow-x-auto">
                  <div className="min-w-full inline-block">
                    <table className="w-full border-collapse">
                      <thead>
                        <tr className="border-b-2 border-brand-border">
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Product</th>
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Yield</th>
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Sale Price</th>
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Total Revenue</th>
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Coffee COGS</th>
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Total COGS</th>
                          <th className="text-left py-4 px-4 sm:px-6 font-semibold text-brand-text">Net Profit</th>
                        </tr>
                      </thead>
                      <tbody>
                        {PROFIT_SCENARIOS.map((scenario, index) => (
                          <tr
                            key={scenario.product}
                            className={`border-b border-brand-border-light ${
                              index % 2 === 0 ? "bg-brand-background-light" : "bg-white"
                            }`}
                          >
                            <td className="py-4 px-4 sm:px-6 text-brand-text font-medium">
                              {scenario.product}
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-brand-text-light">
                              {scenario.yield}
                              <span className="block text-xs text-brand-text-muted">{scenario.yieldNote}</span>
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-brand-text-light">
                              {scenario.salePrice}
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-brand-text font-semibold">
                              {scenario.totalRevenue}
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-brand-text-light">
                              {scenario.coffeeCost}
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-brand-text-light">
                              {scenario.totalCOGS}
                              <span className="block text-xs text-brand-text-muted">{scenario.cogsNote}</span>
                            </td>
                            <td className="py-4 px-4 sm:px-6 text-brand-primary font-semibold">
                              {scenario.netProfit}
                              <span className="block text-xs text-brand-text-muted font-normal">
                                (Before Overhead)
                              </span>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>
                </div>
              </SectionShell>
            </div>
          </PageContainer>
        </PageSection>
      </Section>

      {/* Friends Wink Line */}
      <Section id="wholesale-wink" background="light" padding="none">
        <PageSection className="py-10 sm:py-12">
          <PageContainer>
            <p className="text-center text-brand-text-muted italic body-text">
              "The one where your coffee is perfect…"
            </p>
          </PageContainer>
        </PageSection>
      </Section>

      {/* Made in Arizona Section */}
      <Section id="wholesale-arizona" background="white" padding="none">
        <PageSection className="py-10 sm:py-12">
          <PageContainer>
            <div className="text-center">
              <p className="text-brand-primary font-semibold text-lg sm:text-xl">
                Proudly Made in Arizona
              </p>
            </div>
          </PageContainer>
        </PageSection>
      </Section>

      {/* Final CTA Section */}
      <Section id="wholesale-cta" background="light" padding="none">
        <PageSection>
          <PageContainer>
            <div className="max-w-3xl mx-auto">
              <div className="bg-white rounded-xl border border-brand-border p-6 sm:p-8 shadow-md space-y-6 text-center">
                <h2 className="section-title text-brand-text">Ready to Start a Conversation?</h2>
                <p className="body-text text-lg text-brand-text-light leading-relaxed">
                  Elevate your offerings with the most environmentally responsible and freshest coffee in the region.
                </p>
                <div className="flex flex-wrap items-center justify-center gap-3 sm:gap-4 pt-2">
                  <Button
                    variant="filled"
                    size="lg"
                    onClick={handleContactClick}
                    className="w-full sm:w-auto"
                  >
                    Contact our Wholesale Team
                  </Button>
                  <Button
                    variant="secondary"
                    size="lg"
                    href="/docs/Wholesale Program_251221_103838.pdf"
                    download
                    className="w-full sm:w-auto"
                  >
                    <Download className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                    Download Program PDF
                  </Button>
                </div>
                <p className="body-text text-brand-text-muted text-sm leading-relaxed pt-2">
                  Contact our Wholesale Team today for pricing, samples, and to begin designing your custom roast profile.
                </p>
              </div>
            </div>
          </PageContainer>
        </PageSection>
      </Section>

      {/* Footer */}
      <Footer />

      {/* Contact Modal */}
      <ContactModal
        isOpen={isContactModalOpen}
        onClose={() => setIsContactModalOpen(false)}
      />
    </div>
  );
}
