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
    description: "Our coffee is roasted in-house, ensuring a fresh and exceptional cup every single time."
  }
];

export default function AboutUs() {
  return (
    <Section
      id="about"
      background="white"
      padding="lg"
      aria-labelledby="about-heading"
      className="scroll-mt-24"
    >
      <Container>
        <div className="grid grid-cols-1 xl:grid-cols-2 gap-8 sm:gap-12 items-start">
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
          
          <div className="mt-8 sm:mt-10 xl:mt-0 flex flex-col gap-4">
            <h3 className="subheading text-brand-text">
              What We Stand For
            </h3>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 sm:gap-5 xl:gap-4 xl:ml-auto items-stretch">
              {VALUES.map((value) => (
                <div
                  key={value.title}
                  className="bg-brand-background-light rounded-xl border border-brand-border shadow-md px-6 md:px-8 py-5 flex flex-col h-full"
                >
                  <h4 className="text-brand-text font-semibold leading-tight [text-wrap:balance]
                                 text-[1.125rem] lg:text-[1.1rem] xl:text-[1.05rem]
                                 mb-2 min-h-[2.5rem] sm:min-h-[2.75rem]
                                 flex items-center justify-center sm:justify-start text-center sm:text-left">
                    {value.title}
                  </h4>

                  <p className="text-brand-text-light leading-relaxed hyphens-none [text-wrap:pretty]
                                text-[0.95rem] lg:text-[0.95rem] xl:text-[0.9rem]
                                max-w-[42ch] mx-auto sm:mx-0 text-center sm:text-left">
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