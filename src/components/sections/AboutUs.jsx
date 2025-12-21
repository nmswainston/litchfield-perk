/**
 * AboutUs Section Component
 * 
 * Displays the cafe's story, mission, and core values in a two-column layout.
 * Features responsive design with a values grid showcasing key principles.
 * 
 * @component
 */
import { Section, Container, SectionShell } from "../ui";

const VALUES = [
  {
    title: "Quality First",
    description: "We source the finest ingredients and take pride in every cup we serve."
  },
  {
    title: "Community Focused",
    description: "Building connections and creating a space where neighbors become friends."
  },
  {
    title: "Friendly Service",
    description: "Every interaction matters. We're here to make your visit enjoyable and memorable."
  },
  {
    title: "Fresh Daily",
    description: "Our pastries and baked goods are made fresh daily, ensuring quality in every bite."
  }
];

export default function AboutUs() {
  return (
    <Section
      id="about"
      background="white"
      padding="lg"
      aria-labelledby="about-heading"
    >
      <Container>
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 sm:gap-12 items-start">
          <div>
            <SectionShell
              kicker="Our Story"
              title="About Us"
              titleId="about-heading"
              subhead="A friendly neighborhood cafe where great coffee meets good vibes."
              align="left"
              divider={true}
            >
              <div className="space-y-4 text-brand-text-light">
                <p className="body-text">
                  Litchfield Perk is a gathering place for our community. 
                  We serve freshly brewed coffee, specialty drinks, and baked goods in a warm, 
                  welcoming space where everyone feels at home.
                </p>
                <p className="body-text">
                  Whether you're starting your morning with a latte, meeting friends for a midday break, 
                  or grabbing something on the go, we're here to serve you. Stop by and say hello.
                </p>
              </div>
            </SectionShell>
          </div>
          
          {/* Values grid */}
          <div className="mt-8 sm:mt-10 lg:mt-0">
            <h3 className="subheading text-brand-text mb-6">
              What We Stand For
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="bg-brand-background-light rounded-xl border border-brand-border p-6 sm:p-7 shadow-md"
                >
                  <h4 className="subheading text-brand-text mb-3">{value.title}</h4>
                  <p className="body-text text-brand-text-light">
                    {value.description}
                  </p>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}