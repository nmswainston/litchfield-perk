/**
 * AppCTASection Component
 * 
 * Homepage CTA section promoting the mobile app with Google Play badge.
 * 
 * @component
 */
import { Section, Container } from "../ui";
import { APP_STORE_URL, APP_NAME } from "../../constants/business";
import { trackAppStoreClick } from "../../utils/appStore";

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
          <a
            href={APP_STORE_URL}
            target="_blank"
            rel="noopener noreferrer"
            onClick={() => trackAppStoreClick("home_cta", APP_STORE_URL)}
            className="inline-block"
            aria-label={`Get ${APP_NAME} on Google Play`}
          >
            <img
              src="/badges/google-play-badge.svg"
              alt="Get it on Google Play"
              className="h-12 sm:h-14 md:h-16 w-auto mx-auto"
              loading="lazy"
            />
          </a>
        </div>
      </Container>
    </Section>
  );
}

