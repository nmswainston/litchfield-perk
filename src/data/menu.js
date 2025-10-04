// Litchfield Perk Cafe Menu Data
// Easy to update items, prices, and descriptions without touching JSX

export const menuCategories = [
  {
    id: 'coffee',
    name: 'Coffee & Espresso',
    description: 'Freshly roasted beans, expertly crafted',
    icon: '☕'
  },
  {
    id: 'specialty',
    name: 'Specialty Drinks',
    description: 'Our signature creations',
    icon: '✨'
  },
  {
    id: 'food',
    name: 'Food & Pastries',
    description: 'Fresh baked goods and light bites',
    icon: '🥐'
  },
  {
    id: 'cold',
    name: 'Cold Drinks',
    description: 'Refreshing beverages for any time',
    icon: '🧊'
  }
];

export const menuItems = [
  // Coffee & Espresso
  {
    id: 'americano',
    name: 'Americano',
    description: 'Rich espresso with hot water, bold and smooth',
    price: 3.50,
    category: 'coffee',
    popular: true,
    allergens: [],
    calories: 5
  },
  {
    id: 'latte',
    name: 'Café Latte',
    description: 'Espresso with steamed milk and a light layer of foam',
    price: 4.25,
    category: 'coffee',
    popular: true,
    allergens: ['dairy'],
    calories: 120
  },
  {
    id: 'cappuccino',
    name: 'Cappuccino',
    description: 'Equal parts espresso, steamed milk, and foam',
    price: 4.00,
    category: 'coffee',
    popular: true,
    allergens: ['dairy'],
    calories: 80
  },
  {
    id: 'mocha',
    name: 'Mocha',
    description: 'Espresso with chocolate and steamed milk, topped with whipped cream',
    price: 4.75,
    category: 'coffee',
    popular: false,
    allergens: ['dairy', 'gluten'],
    calories: 250
  },
  {
    id: 'macchiato',
    name: 'Caramel Macchiato',
    description: 'Vanilla syrup, steamed milk, espresso, and caramel drizzle',
    price: 4.50,
    category: 'coffee',
    popular: true,
    allergens: ['dairy'],
    calories: 180
  },
  {
    id: 'espresso',
    name: 'Espresso',
    description: 'Pure, intense coffee shot',
    price: 2.75,
    category: 'coffee',
    popular: false,
    allergens: [],
    calories: 5
  },

  // Specialty Drinks
  {
    id: 'friends-blend',
    name: 'Friends Blend',
    description: 'Our signature house blend - "The one where coffee is always there for you"',
    price: 3.75,
    category: 'specialty',
    popular: true,
    allergens: [],
    calories: 5
  },
  {
    id: 'central-perk-special',
    name: 'Central Perk Special',
    description: 'Cinnamon, vanilla, and a hint of orange - just like the show',
    price: 4.95,
    category: 'specialty',
    popular: true,
    allergens: [],
    calories: 15
  },
  {
    id: 'rachel-green-tea',
    name: 'Rachel Green Tea',
    description: 'Earl Grey with lavender and honey - elegant and sophisticated',
    price: 3.25,
    category: 'specialty',
    popular: false,
    allergens: [],
    calories: 25
  },
  {
    id: 'chandler-bing-chai',
    name: 'Chandler Bing Chai',
    description: 'Spiced chai with a touch of humor and extra foam',
    price: 4.00,
    category: 'specialty',
    popular: true,
    allergens: ['dairy'],
    calories: 90
  },

  // Food & Pastries
  {
    id: 'croissant',
    name: 'Butter Croissant',
    description: 'Flaky, buttery perfection - baked fresh daily',
    price: 3.25,
    category: 'food',
    popular: true,
    allergens: ['dairy', 'gluten', 'eggs'],
    calories: 280
  },
  {
    id: 'muffin',
    name: 'Blueberry Muffin',
    description: 'Moist muffin bursting with fresh blueberries',
    price: 3.50,
    category: 'food',
    popular: true,
    allergens: ['dairy', 'gluten', 'eggs'],
    calories: 320
  },
  {
    id: 'bagel',
    name: 'Everything Bagel',
    description: 'Toasted with cream cheese, tomatoes, and red onion',
    price: 4.25,
    category: 'food',
    popular: false,
    allergens: ['dairy', 'gluten', 'sesame'],
    calories: 380
  },
  {
    id: 'quiche',
    name: 'Spinach & Feta Quiche',
    description: 'Light and fluffy with fresh spinach and feta cheese',
    price: 6.50,
    category: 'food',
    popular: true,
    allergens: ['dairy', 'gluten', 'eggs'],
    calories: 420
  },
  {
    id: 'avocado-toast',
    name: 'Avocado Toast',
    description: 'Smashed avocado on sourdough with lemon and sea salt',
    price: 7.25,
    category: 'food',
    popular: true,
    allergens: ['gluten'],
    calories: 280
  },

  // Cold Drinks
  {
    id: 'iced-coffee',
    name: 'Iced Coffee',
    description: 'Cold-brewed coffee over ice - smooth and refreshing',
    price: 3.25,
    category: 'cold',
    popular: true,
    allergens: [],
    calories: 5
  },
  {
    id: 'frappuccino',
    name: 'Vanilla Frappé',
    description: 'Blended ice, coffee, and vanilla - like a milkshake but better',
    price: 4.95,
    category: 'cold',
    popular: true,
    allergens: ['dairy'],
    calories: 220
  },
  {
    id: 'iced-tea',
    name: 'Iced Tea',
    description: 'Freshly brewed black tea, served over ice',
    price: 2.75,
    category: 'cold',
    popular: false,
    allergens: [],
    calories: 5
  },
  {
    id: 'smoothie',
    name: 'Berry Smoothie',
    description: 'Mixed berries, banana, and yogurt - healthy and delicious',
    price: 5.25,
    category: 'cold',
    popular: true,
    allergens: ['dairy'],
    calories: 180
  }
];

// Helper functions for menu data
export const getMenuItemsByCategory = (categoryId) => {
  return menuItems.filter(item => item.category === categoryId);
};

export const getPopularItems = () => {
  return menuItems.filter(item => item.popular);
};

export const getMenuItemById = (id) => {
  return menuItems.find(item => item.id === id);
};

export const getMenuCategoriesWithItems = () => {
  return menuCategories.map(category => ({
    ...category,
    items: getMenuItemsByCategory(category.id)
  }));
};

// Price formatting helper
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Allergen formatting helper
export const formatAllergens = (allergens) => {
  if (allergens.length === 0) return 'No allergens';
  return allergens.join(', ');
};
