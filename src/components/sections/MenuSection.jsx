/**
 * MenuSection Component
 * 
 * Displays the cafe menu with category filtering functionality.
 * Shows menu items in a responsive grid with allergen information.
 * Tracks menu interactions for analytics.
 * 
 * @component
 */
import { useState } from "react";
import { menuCategories, getMenuItemsByCategory } from "../../data/menu";
import { MenuCard, Section, Container, Button, SectionShell } from "../ui";
import analytics from "../../utils/analytics";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]?.id || '');

  /**
   * Get filtered menu items for the selected category
   * Removes duplicates by ID to ensure unique items
   */
  const getFilteredItems = () => {
    const items = getMenuItemsByCategory(selectedCategory);
    // Remove duplicates by ID
    return Array.from(
      new Map(items.map(item => [item.id, item])).values()
  );
  };

  const filteredItems = getFilteredItems();

  return (
    <Section 
      id="menu" 
      background="white"
      padding="lg"
      aria-labelledby="menu-heading"
      className="pt-24 sm:pt-28 md:pt-32"
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
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item) => (
            <div key={item.id} className="h-full">
              <MenuCard
                name={item.name}
                description={item.description}
                price={item.price}
                popular={item.popular}
                allergens={item.allergens}
                temperature={item.temperature}
                animated={false}
              />
            </div>
          ))}
        </div>

        {/* Menu Note */}
        <div className="mt-10 sm:mt-12 p-6 bg-brand-background-light rounded-xl border border-brand-border">
          <p className="text-brand-text-light text-center leading-relaxed">
            <strong>Allergen Information:</strong> Please inform our staff of any food allergies. 
            We're happy to accommodate dietary restrictions and can modify most items upon request.
          </p>
        </div>
      </Container>
    </Section>
  );
}