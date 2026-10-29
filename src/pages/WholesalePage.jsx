import { useState, useEffect } from "react";
import { Download } from "lucide-react";
import { Section, Container, Button } from "../components/ui";
import ContactModal from "../components/ui/ContactModal";
import ScrollHeader from "../components/layout/ScrollHeader";
import Footer from "../components/sections/Footer";
import logoImage from "../assets/logo-512.webp";
import CONTENT from "../data/content.json";

const W = CONTENT.wholesale;
const SECTION_Y = "py-14 md:py-16 lg:py-18";
const HEADER_BLOCK = "max-w-3xl mx-auto text-center space-y-3 mb-6 md:mb-8";

export default function WholesalePage() {
  const [isContactModalOpen, setIsContactModalOpen] = useState(false);

  useEffect(() => {
    document.title = "Wholesale Partner Program | Litchfield Perk Coffee";
    
    let metaDescription = document.querySelector('meta[name="description"]');
    if (!metaDescription) {
      metaDescription = document.createElement('meta');
      metaDescription.setAttribute('name', 'description');
      document.head.appendChild(metaDescription);
    }
    metaDescription.setAttribute('content', 'Partner with Litchfield Perk for zero-emissions roasted coffee. Custom blends, in-house roasting, and peak freshness for your business in the Phoenix Valley.');
    
    let canonical = document.querySelector('link[rel="canonical"]');
    if (!canonical) {
      canonical = document.createElement('link');
      canonical.setAttribute('rel', 'canonical');
      document.head.appendChild(canonical);
    }
    canonical.setAttribute('href', 'https://litchfieldperk.com/wholesale/');
    
    const ogTitle = document.querySelector('meta[property="og:title"]');
    if (ogTitle) ogTitle.setAttribute('content', 'Wholesale Partner Program | Litchfield Perk');
    
    const ogDescription = document.querySelector('meta[property="og:description"]');
    if (ogDescription) ogDescription.setAttribute('content', 'Partner with Litchfield Perk for zero-emissions roasted coffee. Custom blends and peak freshness.');
    
    const ogUrl = document.querySelector('meta[property="og:url"]');
    if (ogUrl) ogUrl.setAttribute('content', 'https://litchfieldperk.com/wholesale/');
    
    return () => {
      document.title = "Litchfield Perk — Litchfield Park's Friendly Neighborhood Cafe";
    };
  }, []);

  const handleContactClick = () => {
    setIsContactModalOpen(true);
  };

  return (
    <div className="min-h-screen bg-brand-background">
      {/* Header */}
      <ScrollHeader />

      {/* Hero Section */}
      {/* Resilient to zoom, scaling, and viewport variations - uses flexible min-height */}
      <section
        id="wholesale-hero"
        className="
        relative
        bg-gradient-to-br from-brand-background-light to-brand-background-dark
        px-4 sm:px-5
        min-h-screen min-h-[100svh]
        flex items-center justify-center
        py-8 sm:py-10 md:py-12 lg:py-16
        "
        style={{
          // Safari compatibility: Use vh with svh fallback for mobile Safari address bar handling
          minHeight: 'min(100vh, 100svh)'
        }}
      >
        {/* Background wrapper with overflow-hidden scoped to decorative elements only */}
        <div className="absolute inset-0 overflow-hidden">
          <div
            className="absolute inset-0 opacity-30 mix-blend-multiply"
            style={{
              backgroundImage: "url(/botanical-pattern.webp)",
              backgroundSize: "80% auto",
              backgroundPosition: "center",
              backgroundRepeat: "repeat",
            }}
          />
        </div>

        <Container maxWidth="2xl" className="relative z-10 w-full">
          <div className="flex flex-col items-center text-center w-full space-y-5 sm:space-y-6">
            <h1 className="display-hero text-brand-text">{W.hero.title}</h1>

            <img
              src={logoImage}
              alt="Litchfield Perk cafe logo"
              width={320}
              height={320}
              className="h-24 sm:h-28 md:h-32 w-auto drop-shadow-md"
              loading="eager"
            />

            <p className="text-lg sm:text-xl md:text-2xl text-brand-text max-w-2xl mx-auto leading-relaxed px-2 body-text">
              {W.hero.tagline}
            </p>

            <div className="flex flex-col sm:flex-row items-center justify-center gap-3 sm:gap-4 w-full sm:w-auto">
              <Button
                variant="filled"
                size="lg"
                onClick={handleContactClick}
                className="w-full sm:w-auto sm:min-w-40 px-7 py-3"
              >
                {W.hero.contactButton}
              </Button>
              <Button
                variant="secondary"
                size="lg"
                href="/docs/litchfield-perk-wholesale-partner-program.pdf"
                download
                className="w-full sm:w-auto sm:min-w-40 px-7 py-3"
              >
                <Download className="h-5 w-5 mr-2 inline" aria-hidden="true" />
                {W.hero.pdfButton}
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
            <h2 className="section-title text-brand-text">{W.intro.title}</h2>
            <p className="body-text text-brand-text-muted">
              {W.intro.subhead}
            </p>
          </div>
          <div className="max-w-[70ch] mx-auto text-brand-text-light text-left">
            <p className="body-text text-base sm:text-lg leading-relaxed">
              {W.intro.paragraph}
            </p>
          </div>
        </Container>
      </Section>
      <Section
        id="wholesale-difference"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="2xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">{W.difference.title}</h2>
            <p className="body-text text-brand-text-muted">
              {W.difference.subhead}
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 sm:gap-8">
            {W.difference.features.map((feature) => (
              <div
                key={feature.title}
                className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-8 shadow-md h-full flex flex-col"
              >
                <h3 className="subheading text-brand-text mb-4 text-center">{feature.title}</h3>

                <div className="space-y-5 flex-grow">
                  <div className="max-w-[70ch] mx-auto text-left">
                    <h4 className="text-xs font-semibold text-brand-primary mb-2 uppercase tracking-[0.12em]">
                      {W.difference.differenceLabel}
                    </h4>
                    <p className="body-text text-brand-text-light text-sm leading-relaxed">
                      {feature.difference}
                    </p>
                  </div>

                  <div className="pt-4 border-t border-brand-border-light max-w-[70ch] mx-auto text-left">
                    <h4 className="text-xs font-semibold text-brand-primary mb-2 uppercase tracking-[0.12em]">
                      {W.difference.valueLabel}
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
      <Section
        id="wholesale-offerings"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">{W.offerings.title}</h2>
            <p className="body-text text-brand-text-muted">
              {W.offerings.subhead}
            </p>
          </div>

          <div className="space-y-7 md:space-y-8">
            {W.offerings.items.map((item) => (
              <div
                key={item.title}
                className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-8 shadow-md max-w-3xl mx-auto"
              >
                <h3 className="subheading text-brand-text mb-3 text-center">{item.title}</h3>
                <div className="space-y-4 text-brand-text-light max-w-[70ch] mx-auto text-left">
                  {item.paragraphs.map((paragraph, index) => (
                    <p key={index} className="body-text leading-relaxed">
                      {paragraph}
                    </p>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </Container>
      </Section>
      <Section
        id="wholesale-cta"
        background="light"
        padding="none"
        className={`${SECTION_Y} px-4 sm:px-6 lg:px-8`}
      >
        <Container maxWidth="xl">
          <div className={HEADER_BLOCK}>
            <h2 className="section-title text-brand-text">{W.cta.title}</h2>
            <p className="body-text text-lg text-brand-text-light">
              {W.cta.text}
            </p>
            <p className="body-text text-brand-text-muted italic text-sm">
              "{W.cta.quote}"
            </p>
          </div>

          <div className="max-w-3xl mx-auto text-center space-y-4">
            <div className="flex justify-center">
              <Button variant="filled" size="lg" onClick={handleContactClick}>
                {W.cta.button}
              </Button>
            </div>

            <p className="body-text text-brand-text-muted text-sm">
              {W.cta.note}
            </p>

            <p className="text-brand-primary font-semibold text-lg sm:text-xl pt-2">
              {W.cta.badge}
            </p>
          </div>
        </Container>
      </Section>

      <Footer />

      <ContactModal isOpen={isContactModalOpen} onClose={() => setIsContactModalOpen(false)} />
    </div>
  );
}

