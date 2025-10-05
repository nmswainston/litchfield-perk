import React, { useState } from "react";
import { menuCategories, getMenuItemsByCategory } from "../../data/menu";
import { MenuCard, Section, Container, Button, SectionShell } from "../ui";
import analytics from "../../utils/analytics";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]?.id || '');

  const getFilteredItems = () => {
    return getMenuItemsByCategory(selectedCategory);
  };

  const filteredItems = Array.from(
    new Map(getFilteredItems().map(item => [item.id, item])).values()
  );

  return (
    <Section 
      id="menu" 
      background="white"
      padding="lg"
      aria-labelledby="menu-heading"
    >
      <Container>
        <SectionShell
          kicker="Signature Drinks & Eats"
          title="Our Menu"
          subhead="Fresh ingredients, expertly crafted. Choose your favorites or try something new."
          align="center"
        >
          {/* Category Filter */}
          <div
            className="grid grid-cols-2 gap-2 sm:gap-3 mb-2 sm:mb-4 px-4 lg:flex lg:flex-nowrap lg:justify-center lg:items-stretch lg:gap-3"
            role="group"
            aria-label="Filter menu items by category"
          >
            {menuCategories.map(category => (
              <Button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  analytics.trackMenuFilter(category.id, 'filter');
                }}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="default"
                className="w-full lg:w-auto rounded-full gap-2 whitespace-normal break-words leading-snug text-sm sm:text-base px-4 sm:px-5 text-center h-auto py-2 lg:whitespace-nowrap lg:truncate lg:h-12 lg:py-0"
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.name}`}
              >
                <span className="text-base sm:text-lg" aria-hidden="true">{category.icon}</span>
                <span className="clamp-2-mobile">{category.name}</span>
              </Button>
            ))}
          </div>
        </SectionShell>

        {/* Signature Drinks Grid (aligned tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-4 sm:gap-6">
          {filteredItems.map((item) => (
            <div key={item.id} className="h-full">
              <MenuCard
                name={item.name}
                description={item.description}
                price={item.price}
                popular={item.popular}
                allergens={item.allergens}
                temperature={item.temperature}
                category={item.category}
                animated={false}
              />
            </div>
          ))}
        </div>

        {/* Menu Note */}
        <div className="mt-12 p-6 bg-brand-background-light rounded-2xl border border-brand-border-light">
          <p className="text-brand-text-light text-center leading-relaxed">
            <strong>Allergen Information:</strong> Please inform our staff of any food allergies. 
            We're happy to accommodate dietary restrictions and can modify most items upon request.
          </p>
        </div>
      </Container>
    </Section>
  );
}