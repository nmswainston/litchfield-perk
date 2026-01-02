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
import { Section, Container, Button } from "../components/ui";
import ContactModal from "../components/ui/ContactModal";
import ScrollHeader from "../components/layout/ScrollHeader";
import Footer from "../components/sections/Footer";
import logoImage from "../assets/logo-512.png";

const FEATURES = [
  {
    title: "Commitment to Earth",
    difference:
      "The ONLY Zero-Emissions Roasting Process in the Phoenix Valley. Our proprietary, electric-powered roasting system ensures a genuinely low carbon footprint, drastically reducing environment impact compared to traditional gas roasters.",
    value:
      "Unique Marketing Edge: Attract environmentally conscious consumers and strengthen your brand's sustainability story.",
  },
  {
    title: "Unbeaten Freshness",
    difference:
      "Roasted In-House at our Litchfield Park Headquarters. Located right here in the heart of the community, we guarantee peak freshness. We control the entire process, ensuring the highest quality from green bean to final roast.",
    value:
      "Superior Product Quality: Deliver the freshest possible coffee, translating directly into better flavor and customer loyalty.",
  },
  {
    title: "True Customization",
    difference:
      "Tailored Blends and Roasts for Your Preference. We don't believe in one-size-fits-all. Our team will work with you to accommodate and fully customize the blend and roast profile to perfectly match your brand's unique taste standards.",
    value:
      "Brand Differentiation: Offer a truly exclusive, signature coffee that only your establishment can provide.",
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

const SECTION_Y = "py-14 md:py-16 lg:py-18";
const HEADER_BLOCK = "max-w-3xl mx-auto text-center space-y-3 mb-6 md:mb-8";

export default function WholesalePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <ScrollHeader />

      {/* Hero Section */}
      {/* Header height: 80px fixed across all breakpoints (see ScrollHeader.jsx line 89) */}
      <section
        id="wholesale-hero"
        className="
        relative overflow-hidden
        bg-gradient-to-br from-brand-background-light to-brand-background-dark
        px-4 sm:px-5
        min-h-[calc(100svh)]
        flex items-center justify-center
        "
      >
        
        {/* Botanical Pattern */}
        <div
          className="absolute inset-0 opacity-30 mix-blend-multiply"
          style={{
            backgroundImage: "url(/botanical-pattern.png)",
            backgroundSize: "80% auto",
            backgroundPosition: "center",
            backgroundRepeat: "repeat",
          }}
        />

        <Container maxWidth="2xl" className="relative z-10 w-full">
          <div className="flex flex-col items-center text-center w-full space-y-5 sm:space-y-6">
            <div className="uppercase tracking-[0.18em] text-xs sm:text-sm font-semibold text-brand-text-muted">
              Partner Program
            </div>

            <h1 className="display-hero text-brand-text">Wholesale Partner Program</h1>

            <img
              src={logoImage}
              alt="Litchfield Perk cafe logo"
              width={320}
              height={320}
              className="h-24 sm:h-28 md:h-32 w-auto drop-shadow-md"
              loading="eager"
            />

            <p className="text-lg sm:text-xl md:text-2xl text-brand-text max-w-2xl mx-auto leading-relaxed px-2 body-text">
              Elevate your brew. Elevate your business. Brew a better cup.
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="filled"
                size="lg"
                onClick={handleContactClick}
                className="w-full sm:w-auto sm:min-w-40 px-7 py-3"
              >
                Contact Wholesale Team
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/docs/litchfield-perk-wholesale-partner-program.pdf"
                download
                className="w-full sm:w-auto sm:min-w-40 px-7 py-3"
              >
                <Download className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                Download Program PDF
              </Button>
            </div>
          </div>
        </Container>
      </section>

      {/* Intro Section */}
      <Section
        id="wholesale-intro"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">Why Partner with Litchfield Perk?</h2>
            <p className="body-text text-brand-text-muted">
              Unparalleled freshness, quality, and environmental responsibility that customers today demand.
            </p>
          </div>

          {/* Slightly narrower body for better "density" */}
          <div className="max-w-[70ch] mx-auto text-brand-text-light text-left">
            <p className="body-text text-base sm:text-lg leading-relaxed">
              Litchfield Perk Coffee invites you to elevate your coffee program with the freshest, most
              sustainable beans available in the Phoenix Valley. Our Sunrise Blend and Sierra Azul are our
              signature offerings, perfectly balanced, vibrant, and smooth roasts designed to be the
              definitive daily coffee for your discerning customers.
            </p>
          </div>
        </Container>
      </Section>

      {/* Litchfield Perk Difference Section */}
      <Section
        id="wholesale-difference"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="2xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">Litchfield Perk Difference</h2>
            <p className="body-text text-brand-text-muted">
              Clear differentiators that translate into real value for your customers and your business.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {FEATURES.map((feature) => (
              <div
                key={feature.title}
                className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-8 shadow-md h-full flex flex-col"
              >
                <h3 className="subheading text-brand-text mb-4 text-center">{feature.title}</h3>

                <div className="space-y-5 flex-grow">
                  <div className="max-w-[70ch] mx-auto text-left">
                    <h4 className="text-xs font-semibold text-brand-primary mb-2 uppercase tracking-[0.12em]">
                      Difference
                    </h4>
                    <p className="body-text text-brand-text-light text-sm leading-relaxed">
                      {feature.difference}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border-light max-w-[70ch] mx-auto text-left">
                    <h4 className="text-xs font-semibold text-brand-primary mb-2 uppercase tracking-[0.12em]">
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
        </Container>
      </Section>

      {/* Signature Offerings Section */}
      <Section
        id="wholesale-offerings"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">Our Signature Offerings</h2>
            <p className="body-text text-brand-text-muted">
              Two signature coffees designed to be versatile, consistent, and crowd-pleasing.
            </p>
          </div>

          <div className="space-y-7 md:space-y-8">
            <div className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-8 shadow-md max-w-3xl mx-auto">
              <h3 className="subheading text-brand-text mb-3 text-center">Sunrise Blend</h3>
              <div className="space-y-4 text-brand-text-light max-w-[70ch] mx-auto text-left">
                <p className="body-text leading-relaxed">
                  The Sunrise is built around sweetness, silky body and a restrained acidity. Originally
                  designed as a traditional espresso blend, we've found it serves very well as a drip coffee
                  for those who prefer a simpler, smoother cup with lots of ripe red cherry. It shines with
                  or without cream, and works especially well as a cold brew, where its cola and tamarind
                  flavors come out into full blossom. Takes dark roasts well, especially for those who like
                  their coffees to be full of deep pipe tobacco and malty sweetness. The components of the
                  Sunrise Blend rotate seasonally as fresh coffees arrive, but the current iteration is
                  comprised of a naturally processed Brazilian coffee and a washed process Ethiopian coffee.
                </p>
                <p className="body-text leading-relaxed">
                  The Sunrise Blend is a versatile, approachable, and consistently delicious coffee. It
                  features notes of bright citrus, smooth caramel, and a clean, satisfying finish. It is
                  excellent as a drip coffee, pour-over, or as a base for espresso drinks.
                </p>
              </div>
            </div>

            <div className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-8 shadow-md max-w-3xl mx-auto">
              <h3 className="subheading text-brand-text mb-3 text-center">Sierra Azul</h3>
              <div className="space-y-4 text-brand-text-light max-w-[70ch] mx-auto text-left">
                <p className="body-text leading-relaxed">
                  Mexico's Sierra Azul is a women-produced lot that is celebrated for its versatility,
                  structure, and beautifully approachable profile by way of Chiapas, Mexico. At lighter
                  roasts, Sierra Azul highlights notes of honeycomb sweetness layered with milk chocolate,
                  almond, and a gentle orange lift. Moving into medium, the sweetness deepens and the
                  profile rounds out, revealing flavors of cola, chocolate, heavy cream, and warm baking
                  spice. As the roast is pushed further, the body grows richer and the acidity mellows,
                  giving way to notes of dark chocolate, toasted nuts, vanilla, caramel, and nutmeg. Taken
                  all the way to a dark roast, expect a heavy-bodied, syrupy expression with bold notes of
                  dark chocolate, cola, and molasses. This coffee makes for an espresso with lush crema,
                  perfect for sipping on its own or beautifully paired with milk, or an approachable,
                  delicious batch brew.
                </p>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Profit Scenarios Section */}
      <Section
        id="wholesale-profit"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">Profit scenarios at a glance</h2>
            <p className="body-text text-brand-text-muted">
              Realistic examples of margin potential, before your overhead.
            </p>
          </div>

          <div>
            {/* Mobile */}
            <div className="space-y-6 md:hidden">
              {PROFIT_SCENARIOS.map((scenario) => (
                <div
                  key={scenario.product}
                  className="bg-brand-background-light rounded-xl border border-brand-border p-6 shadow-md max-w-md mx-auto"
                >
                  <h3 className="subheading text-brand-text mb-4 text-center">{scenario.product}</h3>
                  <div className="space-y-3">
                    <div>
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary mb-1">
                        Yield
                      </div>
                      <div className="text-brand-text-light">
                        {scenario.yield}
                        <span className="block text-xs text-brand-text-muted mt-1">{scenario.yieldNote}</span>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary mb-1">
                          Sale Price
                        </div>
                        <div className="text-brand-text-light">{scenario.salePrice}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary mb-1">
                          Total Revenue
                        </div>
                        <div className="text-brand-text font-semibold">{scenario.totalRevenue}</div>
                      </div>
                    </div>

                    <div className="grid grid-cols-2 gap-4">
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary mb-1">
                          Coffee COGS
                        </div>
                        <div className="text-brand-text-light">{scenario.coffeeCost}</div>
                      </div>
                      <div>
                        <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary mb-1">
                          Total COGS
                        </div>
                        <div className="text-brand-text-light">
                          {scenario.totalCOGS}
                          <span className="block text-xs text-brand-text-muted mt-1">{scenario.cogsNote}</span>
                        </div>
                      </div>
                    </div>

                    <div className="pt-3 border-t border-brand-border-light">
                      <div className="text-xs font-semibold uppercase tracking-[0.12em] text-brand-primary mb-1">
                        Net Profit
                      </div>
                      <div className="text-brand-primary font-semibold text-lg">
                        {scenario.netProfit}
                        <span className="block text-xs text-brand-text-muted font-normal mt-1">
                          (Before Overhead)
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>

            {/* Desktop */}
            <div className="hidden md:block">
              <div className="bg-brand-background-light rounded-xl border border-brand-border shadow-md overflow-hidden">
                <div 
                  className="overflow-x-auto relative scroll-indicator-fade"
                  aria-label="Profit scenarios table - scroll horizontally to view all columns"
                >
                  <table className="w-full border-collapse">
                    <thead>
                      <tr className="bg-brand-background border-b-2 border-brand-border">
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Product</th>
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Yield</th>
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Sale Price</th>
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Total Revenue</th>
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Coffee COGS</th>
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Total COGS</th>
                        <th className="text-left py-4 px-6 font-semibold text-brand-text">Net Profit</th>
                      </tr>
                    </thead>
                    <tbody>
                      {PROFIT_SCENARIOS.map((scenario, index) => (
                        <tr
                          key={scenario.product}
                          className={`border-b border-brand-border-light ${
                            index % 2 === 0 ? "bg-brand-background-light" : "bg-brand-background"
                          }`}
                        >
                          <td className="py-4 px-6 text-brand-text font-medium">{scenario.product}</td>
                          <td className="py-4 px-6 text-brand-text-light">
                            {scenario.yield}
                            <span className="block text-xs text-brand-text-muted">{scenario.yieldNote}</span>
                          </td>
                          <td className="py-4 px-6 text-brand-text-light">{scenario.salePrice}</td>
                          <td className="py-4 px-6 text-brand-text font-semibold">{scenario.totalRevenue}</td>
                          <td className="py-4 px-6 text-brand-text-light">{scenario.coffeeCost}</td>
                          <td className="py-4 px-6 text-brand-text-light">
                            {scenario.totalCOGS}
                            <span className="block text-xs text-brand-text-muted">{scenario.cogsNote}</span>
                          </td>
                          <td className="py-4 px-6 text-brand-primary font-semibold">
                            {scenario.netProfit}
                            <span className="block text-xs text-brand-text-muted font-normal">(Before Overhead)</span>
                          </td>
                        </tr>
                      ))}
                    </tbody>
                  </table>
                </div>
              </div>
            </div>
          </div>
        </Container>
      </Section>

      {/* Final CTA Section */}
      <Section
        id="wholesale-cta"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">Ready to Start a Conversation?</h2>
            <p className="body-text text-lg text-brand-text-light">
              Elevate your offerings with the most environmentally responsible and freshest coffee in the region.
            </p>
            <p className="body-text text-brand-text-muted italic text-sm">
              "The one where your coffee is perfect…"
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex justify-center">
              <Button variant="filled" size="lg" onClick={handleContactClick}>
                Contact our Wholesale Team
              </Button>
            </div>

            <p className="body-text text-brand-text-muted text-sm">
              Contact our Wholesale Team today for pricing, samples, and to begin designing your custom roast profile.
            </p>

            <p className="text-brand-primary font-semibold text-lg sm:text-xl pt-2">
              Proudly Made in Arizona
            </p>
          </div>
        </Container>
      </Section>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

