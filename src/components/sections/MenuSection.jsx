import React, { useState } from "react";
import { menuCategories, menuItems, getMenuItemsByCategory, getPopularItems } from "../../data/menu";
import { MenuCard, Section, Container, Button } from "../ui";
import analytics from "../../utils/analytics";

export default function MenuSection() {
  const [selectedCategory, setSelectedCategory] = useState('all');

  const getFilteredItems = () => {
    if (selectedCategory === 'all') {
      return getPopularItems();
    }
    return getMenuItemsByCategory(selectedCategory);
  };

  const filteredItems = getFilteredItems();

  return (
    <Section 
      id="menu" 
      background="white"
      padding="lg"
      aria-labelledby="menu-heading"
    >
      <Container>
        <div className="mb-12">
          <h2 className="text-4xl md:text-6xl font-bold text-brand-text mb-5 text-center leading-tight">
            Our Menu
          </h2>
          <p className="text-brand-text-muted text-lg md:text-xl mb-10 max-w-3xl mx-auto leading-relaxed">
            Fresh ingredients, expertly crafted. Choose your favorites or try something new.
          </p>
          
          {/* Category Filter */}
          <div 
            className="flex flex-wrap items-center justify-center gap-3 mb-10"
            role="group"
            aria-label="Filter menu items by category"
          >
            <Button
              onClick={() => {
                setSelectedCategory('all');
                analytics.trackMenuFilter('all', 'filter');
              }}
              variant={selectedCategory === 'all' ? 'primary' : 'secondary'}
              size="default"
              className="rounded-full"
              aria-label="Show all menu items"
            >
              All Items
            </Button>
            {menuCategories.map(category => (
              <Button
                key={category.id}
                onClick={() => {
                  setSelectedCategory(category.id);
                  analytics.trackMenuFilter(category.id, 'filter');
                }}
                variant={selectedCategory === category.id ? 'primary' : 'secondary'}
                size="default"
                className="rounded-full"
                aria-pressed={selectedCategory === category.id}
                aria-label={`Filter by ${category.name}`}
              >
                <category.icon className="w-4 h-4 mr-2" aria-hidden="true" />
                {category.name}
              </Button>
            ))}
          </div>
        </div>

        {/* Menu Grid */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
          {filteredItems.map(item => (
            <MenuCard
              key={item.id}
              name={item.name}
              description={item.description}
              price={item.price}
              popular={item.popular}
              allergens={item.allergens}
              calories={item.calories}
              category={item.category}
            />
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