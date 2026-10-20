import { Section, Container, SectionShell, HoursList } from "../ui";
import { BUSINESS_INFO } from "../../constants/business";
import CONTENT from "../../data/content.json";

const { hours } = CONTENT;

export default function HoursSection() {
  return (
    <Section
      id="hours"
      background="light"
      padding="lg"
      aria-labelledby="hours-heading"
    >
      <Container>
        <SectionShell
          title={hours.title}
          titleId="hours-heading"
          subhead={hours.subhead}
          align="center"
          divider={false}
          className="mb-8 sm:mb-10"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-brand-background rounded-xl p-6 sm:p-8 shadow-md">
              <h3 className="subheading text-brand-text mb-6 sm:mb-8 text-center">
                {hours.cardHeading}
              </h3>
              <div className="space-y-4 sm:space-y-5">
                <HoursList variant="card" showNote={true} />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 p-6 bg-brand-background-light rounded-xl border border-brand-border">
            <p className="text-brand-text-light text-center leading-relaxed text-sm sm:text-base [text-wrap:balance] max-w-[28ch] sm:max-w-none mx-auto">
              <strong>{hours.holidayLabel}</strong> {hours.holidayText}
              <span className="block mt-3">
                {hours.holidayLinkPrefix} <a href={BUSINESS_INFO.social.instagram.url} target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:opacity-90 transition-colors">{hours.holidayLinkText}</a> {hours.holidayLinkSuffix}
              </span>
            </p>
          </div>
        </SectionShell>
      </Container>
    </Section>
  );
}