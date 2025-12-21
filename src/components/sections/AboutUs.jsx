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
                  Litchfield Perk is more than just a coffee shop—it's a gathering place for our community. 
                  We're passionate about serving freshly brewed coffee, delicious pastries, and creating a warm, 
                  welcoming atmosphere where everyone feels at home.
                </p>
                <p className="body-text">
                  Whether you're starting your morning with a perfectly crafted latte, meeting friends for an 
                  afternoon pick-me-up, or grabbing a quick bite, we're here to make your day a little brighter. 
                  Stop by and experience the Litchfield Perk difference.
                </p>
              </div>
            </SectionShell>
          </div>
          
          {/* Values grid */}
          <div className="mt-8 sm:mt-10 lg:mt-0">
<<<<<<< HEAD
            <h3 className="subheading text-brand-text mb-6">
=======
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-text mb-4 sm:mb-6">
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
              What We Stand For
            </h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-6">
              {VALUES.map((value) => (
                <div
                  key={value.title}
<<<<<<< HEAD
                  className="bg-brand-background-light rounded-xl border border-brand-border p-6 shadow-md"
=======
                  className="bg-brand-background-light rounded-2xl border border-brand-border p-6 shadow-soft"
>>>>>>> 6426a7da9ed8934f952a11a5a55bb15a53d4c96f
                >
                  <h4 className="subheading text-brand-text mb-2">{value.title}</h4>
                  <p className="body-text text-brand-text-light m-0">
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