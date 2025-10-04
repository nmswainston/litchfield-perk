import React, { useState } from "react";
import { menuCategories, menuItems, getMenuItemsByCategory, getPopularItems } from "../../data/menu";
import MenuCard from "../ui/MenuCard";

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
    <section 
      id="menu" 
      style={{
        backgroundColor: '#ffffff',
        padding: '60px 20px',
        textAlign: 'center'
      }}
      aria-labelledby="menu-heading"
    >
      <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
        <div style={{ marginBottom: '50px' }}>
          <h2 style={{
            fontSize: 'clamp(32px, 4vw, 48px)',
            fontWeight: '700',
            color: '#000000',
            marginBottom: '20px',
            textAlign: 'center',
            lineHeight: '1.2'
          }}>
            Our Menu
          </h2>
          <p style={{ 
            color: '#666666', 
            fontSize: 'clamp(16px, 2vw, 20px)', 
            marginBottom: '40px',
            maxWidth: '700px',
            margin: '0 auto 40px auto',
            lineHeight: '1.6'
          }}>
            Fresh ingredients, expertly crafted. Choose your favorites or try something new.
          </p>
          
          {/* Category Filter */}
          <div style={{
            display: 'flex',
            flexWrap: 'wrap',
            justifyContent: 'center',
            gap: '12px',
            marginBottom: '40px'
          }}>
            <button
              onClick={() => setSelectedCategory('all')}
              style={{
                padding: '12px 24px',
                borderRadius: '25px',
                border: selectedCategory === 'all' ? '2px solid #00d294' : '2px solid #e0e0e0',
                backgroundColor: selectedCategory === 'all' ? '#00d294' : '#ffffff',
                color: selectedCategory === 'all' ? '#000000' : '#666666',
                fontWeight: '600',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                fontSize: '14px'
              }}
            >
              All Items
            </button>
            {menuCategories.map(category => (
              <button
                key={category.id}
                onClick={() => setSelectedCategory(category.id)}
                style={{
                  padding: '12px 24px',
                  borderRadius: '25px',
                  border: selectedCategory === category.id ? '2px solid #00d294' : '2px solid #e0e0e0',
                  backgroundColor: selectedCategory === category.id ? '#00d294' : '#ffffff',
                  color: selectedCategory === category.id ? '#000000' : '#666666',
                  fontWeight: '600',
                  cursor: 'pointer',
                  transition: 'all 0.3s ease',
                  fontSize: '14px',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px'
                }}
              >
                <span>{category.icon}</span>
                {category.name}
              </button>
            ))}
          </div>
        </div>

        {/* Menu Items Grid */}
        <div style={{ 
          display: 'grid', 
          gridTemplateColumns: 'repeat(auto-fit, minmax(350px, 1fr))', 
          gap: '24px',
          marginTop: '0'
        }}>
          {filteredItems.map((item) => (
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

        {/* Show message if no items in category */}
        {filteredItems.length === 0 && (
          <div style={{
            textAlign: 'center',
            padding: '60px 20px',
            color: '#666666'
          }}>
            <p style={{ fontSize: '18px', margin: 0 }}>
              No items found in this category.
            </p>
          </div>
        )}
      </div>
    </section>
  );
}
