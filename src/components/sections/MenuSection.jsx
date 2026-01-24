import { useState, useRef, useEffect, useMemo } from "react";
import { menuCategories, getMenuItemsByCategory } from "../../data/menu";
import { MenuCard, Section, Container, Button, SectionShell } from "../ui";
import analytics from "../../utils/analytics";

export default function MenuSection({ seasonalMenuUrl }) {
  const getActiveCategories = () => {
    return menuCategories.filter(category => {
      const items = getMenuItemsByCategory(category.id);
      return items && items.length > 0;
    });
  };

  const activeCategories = useMemo(() => getActiveCategories(), []);

  const [selectedCategory, setSelectedCategory] = useState(() => {
    const active = getActiveCategories();
    return active[0]?.id || '';
  });
  const [openItemId, setOpenItemId] = useState(null);
  const openCardRef = useRef(null);

  useEffect(() => {
    if (activeCategories.length > 0) {
      const isCurrentCategoryValid = activeCategories.find(cat => cat.id === selectedCategory);
      if (!isCurrentCategoryValid) {
        setSelectedCategory(activeCategories[0].id);
      }
    }
  }, [activeCategories, selectedCategory]);

  const getFilteredItems = () => {
    const items = getMenuItemsByCategory(selectedCategory);
    return Array.from(
      new Map(items.map(item => [item.id, item])).values()
  );
  };

  const filteredItems = getFilteredItems();

  // Shared className for category filter buttons
  const categoryButtonClassName = [
    // Mobile: full-width single column, consistent height for visual balance
    "w-full min-w-0",
    // Desktop: allow flexible growth in row layout
    "md:flex-1 md:min-w-0 md:w-auto",
    "rounded-full",
    "gap-2",
    "text-center",
    "px-4 sm:px-5",
    "text-sm sm:text-base",
    "leading-tight",
    // Consistent height on mobile for balanced appearance (48px for comfortable touch target)
    "h-12 sm:h-auto sm:min-h-0",
    "flex items-center justify-center",
    "py-2 sm:py-2.5 lg:py-0",
    "whitespace-normal sm:whitespace-normal lg:whitespace-nowrap",
    "lg:h-12 lg:truncate"
  ].join(" ");

  useEffect(() => {
    setOpenItemId(null);
  }, [selectedCategory]);

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
          <div
            className="flex flex-col gap-2 sm:gap-3 mb-2 sm:mb-4 px-4 sm:flex-row sm:flex-wrap sm:justify-center md:items-stretch md:min-w-0"
            role="group"
            aria-label="Filter menu items by category"
          >
            {activeCategories.map(category => (
              <Button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  analytics.trackMenuFilter(category.id, 'filter');
                }}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="default"
                className={categoryButtonClassName}
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.name}`}
                title={category.name}
              >
                {category.name}
              </Button>
            ))}
            {seasonalMenuUrl && (
              <Button
                href={seasonalMenuUrl}
                variant="secondary"
                size="default"
                target="_blank"
                rel="noopener noreferrer"
                className={categoryButtonClassName}
                aria-label="Open Seasonal Menu on Instagram (opens in new tab)"
                title="Seasonal Menu"
                onClick={() => {
                  analytics.trackCTAClick("seasonal_menu", "menu");
                }}
              >
                <span className="sm:hidden">
                  Seasonal
                </span>
                <span className="hidden sm:inline">
                  Seasonal Menu
                </span>
              </Button>
            )}
          </div>
          
          {seasonalMenuUrl && (
            <p className="text-sm text-brand-text-light text-center mt-2 sm:mt-3 px-4 max-w-2xl mx-auto leading-relaxed">
              See our latest seasonal drinks on Instagram.
              <span className="hidden sm:inline"> Look for the pinned post or the 'Seasonal' highlight.</span>
            </p>
          )}
        </SectionShell>

        <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-3 sm:gap-4">
          {filteredItems.map((item) => {
            const isOpen = openItemId === item.id;
            return (
              <div 
                key={item.id} 
                className="relative min-h-[150px] sm:min-h-[170px] lg:min-h-[210px]"
              >
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
                  className={isOpen ? "absolute top-0 left-0 right-0 z-30 w-full" : "relative z-10 w-full h-full"}
                />
              </div>
            );
          })}
        </div>

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