/**
 * HoursSection Component
 * 
 * Displays operating hours and visit information in a responsive grid layout.
 * Shows weekday, Saturday, and Sunday hours with special holiday notice.
 * 
 * @component
 */
import { Section, Container } from "../ui";

const OPERATING_HOURS = [
  {
    label: "Monday - Friday",
    hours: "5:30 AM - 2:00 PM"
  },
  {
    label: "Saturday",
    hours: "7:00 AM - 12:00 PM"
  },
  {
    label: "Sunday",
    hours: "Closed",
    isClosed: true
  }
];

export default function HoursSection() {
  return (
    <Section 
      id="hours" 
      background="light"
      padding="lg"
      aria-labelledby="hours-heading"
    >
      <Container>
        <div className="mb-8 sm:mb-10 text-center">
          <h2 id="hours-heading" className="section-title text-brand-text mb-2">
            Hours
          </h2>
          <p className="body-text text-brand-text-muted mb-0 max-w-3xl mx-auto">
            We're open weekdays and Saturdays. Stop by for your morning coffee or afternoon break.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8 max-w-4xl mx-auto">
          {/* Operating Hours */}
          <div className="bg-brand-background rounded-xl p-6 sm:p-8 shadow-md">
            <h3 className="subheading text-brand-text mb-6 sm:mb-8 text-center">
              Operating Hours
            </h3>
            <div className="space-y-4 sm:space-y-5">
              {OPERATING_HOURS.map((schedule, index) => (
                <div
                  key={schedule.label}
                  className={`flex justify-between items-center py-3 ${
                    index < OPERATING_HOURS.length - 1 ? "border-b border-brand-border-light" : ""
                  }`}
                >
                  <span className="text-brand-text-light font-medium">
                    {schedule.label}
                  </span>
                  {schedule.isClosed ? (
                    <span className="text-brand-primary font-bold text-lg">
                      Closed
                    </span>
                  ) : (
                    <span className="accent-price text-brand-primary">
                      {schedule.hours}
                    </span>
                  )}
              </div>
              ))}
            </div>
            <p className="body-text text-brand-text-muted mt-6 text-center">
              Open early for your morning coffee, closed by afternoon.
            </p>
          </div>

          {/* Additional Info */}
          <div className="bg-brand-background rounded-xl p-6 sm:p-8 shadow-md flex flex-col justify-center">
            <h3 className="subheading text-brand-text mb-4 text-center">
              Visit Us
            </h3>
            <p className="body-text text-brand-text-light text-center mb-4">
              We serve fresh coffee and friendly service during our operating hours.
            </p>
            <p className="body-text text-brand-text-muted text-center">
              Call us at (480) 823-4073 for large orders or special requests.
            </p>
          </div>
        </div>

        {/* Special Hours Note */}
        <div className="mt-10 sm:mt-12 p-6 bg-brand-50 rounded-xl border border-brand-200">
          <p className="text-brand-text-light text-center leading-relaxed text-sm sm:text-base">
            <strong>Holiday Hours:</strong> We may have special hours during holidays. 
            Call (480) 823-4073 or check Instagram for updates.
          </p>
        </div>
      </Container>
    </Section>
  );
}