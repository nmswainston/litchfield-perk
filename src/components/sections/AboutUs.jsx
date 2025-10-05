import React from "react";
import { Section, Container, ResponsiveImage } from "../ui";

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
            <h2
              id="about-heading"
              className="text-3xl sm:text-4xl md:text-6xl font-bold text-brand-text mb-4 sm:mb-6 leading-tight friends-font"
            >
              About Us
            </h2>
            <div className="prose max-w-none">
              <p className="text-brand-text-muted text-base sm:text-lg md:text-xl leading-relaxed m-0 mb-4">
                {/* Replace this text with your story/introduction */}
                Coming soon: a short intro about you and the cafe. Share your passion, what inspired
                Litchfield Perk, and what guests can expect.
              </p>
              <p className="text-brand-text-light leading-relaxed m-0 mb-3">
                {/* Replace with details, e.g., history, mission, or values */}
                Add a brief history or mission statement here. Keep sentences short for readability.
              </p>
              <p className="text-brand-text-light leading-relaxed m-0">
                {/* Replace with a personable note */}
                Include a personal note, favorite drink, or a fun fact to make the page feel welcoming.
              </p>
            </div>
          </div>
          
          {/* Team grid - 4 tiles */}
          <div className="mt-8 sm:mt-10 lg:mt-0">
            <h3 className="text-2xl sm:text-3xl font-bold text-brand-text mb-4 sm:mb-6">Meet the Team</h3>
            <div className="grid grid-cols-2 lg:grid-cols-2 xl:grid-cols-4 gap-4 sm:gap-6">
              {[1,2,3,4].map((i) => (
                <div key={i} className="bg-brand-background-light rounded-2xl border border-brand-border p-4 sm:p-5 shadow-soft flex flex-col items-center text-center">
                  <div className="w-24 h-24 sm:w-28 sm:h-28 rounded-full overflow-hidden mb-3 sm:mb-4 bg-brand-background-dark">
                    <img
                      src="/src/assets/logo-512.png"
                      alt="Employee placeholder"
                      className="w-full h-full object-cover"
                      loading="lazy"
                    />
                  </div>
                  <div className="space-y-1">
                    <div className="font-semibold text-brand-text">Employee Name</div>
                    <div className="text-sm text-brand-text-muted">Role / Title</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </Container>
    </Section>
  );
}