import { Section, Container, AppStoreLinks } from "../ui";

export default function AppCTASection() {
  return (
    <Section
      id="app-cta"
      background="light"
      padding="lg"
      aria-labelledby="app-cta-heading"
    >
      <Container>
        <div className="max-w-2xl mx-auto text-center">
          <h2
            id="app-cta-heading"
            className="text-2xl sm:text-3xl md:text-4xl font-bold text-brand-text mb-4"
          >
            Order faster with our app
          </h2>
          <p className="text-base sm:text-lg text-brand-text-light mb-6 body-text">
            Order ahead, save favorites, and stay in the loop.
          </p>
          <AppStoreLinks placement="home_cta" variant="badges" />
        </div>
      </Container>
    </Section>
  );
}

