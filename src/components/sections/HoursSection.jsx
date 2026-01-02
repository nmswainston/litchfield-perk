/**
 * HoursSection Component
 * 
 * Displays operating hours in a centered card layout.
 * Shows weekday, Saturday, and Sunday hours with special holiday notice.
 * 
 * @component
 */
import { Section, Container, SectionShell } from "../ui";
import { BUSINESS_INFO } from "../../constants/business";
import { formatTime } from "../../utils/format";

/**
 * Generate operating hours display data from business hours configuration
 */
function getOperatingHours() {
  const { hours } = BUSINESS_INFO;
  
  return [
    {
      label: "Monday - Thursday",
      hours: `${formatTime(hours.mondayThursday.open)} - ${formatTime(hours.mondayThursday.close)}`,
      isClosed: false
    },
    {
      label: "Friday - Saturday",
      hours: `${formatTime(hours.fridaySaturday.open)} - ${formatTime(hours.fridaySaturday.close)}`,
      isClosed: false
    },
    {
      label: "Sunday",
      hours: "Closed",
      isClosed: true
    }
  ];
}

export default function HoursSection() {
  const OPERATING_HOURS = getOperatingHours();
  
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
          </div>

          {/* Special Hours Note */}
          <div className="mt-10 sm:mt-12 p-6 bg-brand-background-light rounded-xl border border-brand-border">
              <p className="text-brand-text-light text-center leading-relaxed text-sm sm:text-base">
              <strong>Holiday Hours:</strong> We may have special hours during holidays. 
              Call {BUSINESS_INFO.contact.phone} or check Instagram for updates.
            </p>
          </div>
        </SectionShell>
      </Container>
    </Section>
  );
}