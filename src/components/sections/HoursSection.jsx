import { Section, Container, SectionShell, HoursList } from "../ui";

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
          title="Hours"
          titleId="hours-heading"
          subhead="We're open weekdays and Saturdays. Stop by for your morning coffee or afternoon break."
          align="center"
          divider={false}
          className="mb-8 sm:mb-10"
        >
          <div className="max-w-2xl mx-auto">
            <div className="bg-brand-background rounded-xl p-6 sm:p-8 shadow-md">
              <h3 className="subheading text-brand-text mb-6 sm:mb-8 text-center">
                Operating Hours
              </h3>
              <div className="space-y-4 sm:space-y-5">
                <HoursList variant="card" showNote={true} />
              </div>
            </div>
          </div>
          <div className="mt-10 sm:mt-12 p-6 bg-brand-background-light rounded-xl border border-brand-border">
            <p className="text-brand-text-light text-center leading-relaxed text-sm sm:text-base [text-wrap:balance] max-w-[28ch] sm:max-w-none mx-auto">
              <strong>Holiday Hours:</strong> We may have special hours during holidays.
              <span className="block mt-3">
                Check <a href="https://www.instagram.com/litchfieldperk/" target="_blank" rel="noopener noreferrer" className="text-brand-primary hover:opacity-90 transition-colors">Instagram</a> for updates.
              </span>
            </p>
          </div>
        </SectionShell>
      </Container>
    </Section>
  );
}