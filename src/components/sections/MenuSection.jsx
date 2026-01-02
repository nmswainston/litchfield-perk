/**
 * MenuSection Component
 * 
 * Displays the cafe menu with category filtering functionality.
 * Shows menu items in a responsive grid with allergen information.
 * Tracks menu interactions for analytics.
 * Supports overlay dropdowns to show full descriptions without changing card layout.
 * 
 * @component
 */
import { useState, useRef, useEffect } from "react";
import { menuCategories, getMenuItemsByCategory } from "../../data/menu";
import { MenuCard, Section, Container, Button, SectionShell } from "../ui";
import analytics from "../../utils/analytics";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState(menuCategories[0]?.id || '');
  const [openItemId, setOpenItemId] = useState(null);
  const openCardRef = useRef(null);

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

  /**
   * Close overlay when category changes
   */
  useEffect(() => {
    setOpenItemId(null);
  }, [selectedCategory]);

  /**
   * Handle click outside and Escape key to close open card
   */
  useEffect(() => {
    if (!openItemId) return;

    const onPointerDown = (e) => {
      const el = openCardRef.current;
      if (!el) return;
      if (!el.contains(e.target)) {
        setOpenItemId(null);
      }
    };

    const onKeyDown = (e) => {
      if (e.key === "Escape") {
        setOpenItemId(null);
      }
    };

    document.addEventListener("pointerdown", onPointerDown);
    document.addEventListener("keydown", onKeyDown);

    return () => {
      document.removeEventListener("pointerdown", onPointerDown);
      document.removeEventListener("keydown", onKeyDown);
    };
  }, [openItemId]);

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
                className={[
                  "w-full lg:w-auto rounded-full",
                  "gap-2",
                  "text-center",
                  "px-4 sm:px-5",
                  "text-sm sm:text-base",
                  "leading-tight",
                  "min-h-[52px] sm:min-h-0",     // consistent mobile height
                  "py-2 sm:py-2.5 lg:py-0",
                  "whitespace-normal sm:whitespace-normal lg:whitespace-nowrap",
                  "lg:h-12 lg:truncate"
                ].join(" ")}
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.name}`}
                title={category.name}
              >
                <span className="sm:hidden">
                  {category.shortName ?? category.name}
                </span>
                <span className="hidden sm:inline">
                  {category.name}
                </span>
              </Button>
            ))}
          </div>
        </SectionShell>

        {/* Signature Drinks Grid (aligned tiles) */}
        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item) => {
            const isOpen = openItemId === item.id;
            return (
              <div 
                key={item.id} 
                className="relative min-h-[150px] sm:min-h-[170px] lg:min-h-[210px]"
              >
                {/* MenuCard: absolutely positioned when expanded, normal when collapsed */}
                <MenuCard
                  id={item.id}
                  name={item.name}
                  description={item.description}
                  price={item.price}
                  popular={item.popular}
                  allergens={item.allergens}
                  temperature={item.temperature}
                  animated={false}
                  isOpen={isOpen}
                  isExpanded={isOpen}
                  onToggle={() =>
                    setOpenItemId((prev) => (prev === item.id ? null : item.id))
                  }
                  cardRef={isOpen ? openCardRef : null}
                  className={isOpen ? "absolute inset-0 z-30 w-full" : "relative z-10 w-full"}
                />
              </div>
            );
          })}
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