// Litchfield Perk Cafe Menu Data
// Easy to update items, prices, and descriptions without touching JSX

export const menuCategories = [
  {
    id: "greatest-hits",
    name: "Greatest Hits",
    description: "Our signature creations",
  },
  {
    id: "coffee",
    name: "Coffee & Espresso",
    description: "Freshly roasted beans, expertly crafted",
  },
  {
    id: "other-drinks",
    name: "Other Drinks",
    description: "Refreshing beverages for any time",
  },
  {
    id: "desserts",
    name: "Desserts",
    description: "Gelato and affogato",
  },
];

export const menuItems = [
  // Specialty Drinks
  {
    id: "turtle",
    name: "Turtle",
    description:
      "Dark chocolate, caramel, and pecan. Named after our Turtle Park!",
    temperature: "Hot or Iced",
    price: 3.75,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 5,
  },
  {
    id: "horchata",
    name: "Horchata",
    description: "Our curated blend of flavors. Served standard with oatmilk.",
    temperature: "Iced",
    price: 4.95,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 15,
  },
  {
    id: "litchfield-sunrise",
    name: "Litchfield Sunrise",
    description:
      "Citrusy coffee dessert delight inspired by the scenery of our hometown!",
    temperature: "Iced",
    price: 3.25,
    category: "greatest-hits",
    popular: false,
    allergens: [],
    calories: 25,
  },
  {
    id: "marcel",
    name: "Marcel",
    description: "Banana and white chocolate.",
    temperature: "Iced ",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },
  {
    id: "black-and-white",
    name: "Black and White",
    description: "Dark and white chocolate.",
    temperature: "Hot or Iced",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },
  {
    id: "cinnabee",
    name: "Cinnabee",
    description: "Honey and cinnamon.",
    temperature: "Hot or Iced",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },
  {
    id: "perky-chai",
    name: "Perky Chai",
    description: "Chai latte with additional espresso.",
    temperature: "Hot or Iced",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },
  {
    id: "mazapan",
    name: "Mazapan",
    description: "Mexican pantry staple turned latte!",
    temperature: "Hot or Iced",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },
  {
    id: "loose-leaf-tea",
    name: "Loose Leaf Tea",
    description: "Choice of classic black or orange blossom green tea.",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },
  {
    id: "litchfield-lemonade",
    name: "Litchfield Lemonade",
    description:
      "Choice of classic black or orange blossom green tea with fresh local lemonade.",
    price: 4.0,
    category: "greatest-hits",
    popular: true,
    allergens: [],
    calories: 90,
  },

  // Coffee & Espresso
  {
    id: "drip",
    name: "Drip Coffee",
    description: "Classic drip coffee",
    price: 3.0,
    category: "coffee",
    popular: false,
    allergens: [],
    calories: 5,
  },
  {
    id: "cold-brew",
    name: "Cold Brew",
    description: "Smooth, cold-brewed coffee",
    price: 3.5,
    category: "coffee",
    popular: true,
    allergens: [],
    calories: 5,
  },
  {
    id: "espresso",
    name: "Espresso",
    description: "Pure, intense coffee shot",
    price: 2.75,
    category: "coffee",
    popular: false,
    allergens: [],
    calories: 5,
  },
  {
    id: "latte",
    name: "Café Latte",
    description: "Espresso with steamed milk and a light layer of foam",
    price: 4.25,
    category: "coffee",
    popular: true,
    allergens: ["dairy"],
    calories: 120,
  },
  {
    id: "americano",
    name: "Americano",
    description: "Rich espresso with hot water, bold and smooth",
    price: 3.5,
    category: "coffee",
    popular: true,
    allergens: [],
    calories: 5,
  },
  {
    id: "cappuccino",
    name: "Cappuccino",
    description: "Equal parts espresso, steamed milk, and foam",
    price: 4.0,
    category: "coffee",
    popular: true,
    allergens: ["dairy"],
    calories: 80,
  },
  {
    id: "pour-over",
    name: "Pour Over",
    description:
      "Coffee brewed by pouring hot water over fresh coffee grounds.",
    price: 4.25,
    category: "coffee",
    popular: false,
    allergens: ["dairy"],
    calories: 120,
  },
  {
    id: "mocha",
    name: "Mocha",
    description:
      "Espresso with chocolate and steamed milk, topped with whipped cream",
    price: 4.75,
    category: "coffee",
    popular: false,
    allergens: ["dairy", "gluten"],
    calories: 250,
  },

  // Other Drinks
  {
    id: "chai",
    name: "Chai Latte",
    description:
      "Spiced chai latte with steamed milk and a light layer of foam",
    price: 3.25,
    category: "other-drinks",
    popular: true,
    allergens: [],
    calories: 5,
  },
  {
    id: "matcha",
    name: "Matcha Latte",
    description:
      "Blended ice, coffee, and matcha - like a milkshake but better",
    price: 4.95,
    category: "other-drinks",
    popular: true,
    allergens: ["dairy"],
    calories: 220,
  },
  {
    id: "hot-cocoa",
    name: "Hot Cocoa",
    description: "Warm, rich, and creamy cocoa",
    price: 2.75,
    category: "other-drinks",
    popular: false,
    allergens: [],
    calories: 5,
  },
  {
    id: "tea",
    name: "Hot or IcedTea",
    description: "Classic black or orange blossom green tea.",
    price: 3.0,
    category: "other-drinks",
    popular: false,
    allergens: [],
    calories: 5,
  },

  // Desserts
  {
    id: "gelato",
    name: "Gelato",
    description: "Classic gelato flavors",
    price: 6.0,
    category: "desserts",
    popular: true,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 280,
  },
  {
    id: "affogato",
    name: "Affogato",
    description: "Espresso poured over vanilla gelato",
    price: 8.0,
    category: "desserts",
    popular: true,
    allergens: ["dairy", "gluten", "eggs"],
    calories: 320,
  },
];

// Helper functions for menu data
export const getMenuItemsByCategory = (categoryId) => {
  return menuItems.filter((item) => item.category === categoryId);
};

export const getPopularItems = () => {
  return menuItems.filter((item) => item.popular);
};

export const getMenuItemById = (id) => {
  return menuItems.find((item) => item.id === id);
};

export const getMenuCategoriesWithItems = () => {
  return menuCategories.map((category) => ({
    ...category,
    items: getMenuItemsByCategory(category.id),
  }));
};

// Price formatting helper
export const formatPrice = (price) => {
  return `$${price.toFixed(2)}`;
};

// Allergen formatting helper
export const formatAllergens = (allergens) => {
  if (allergens.length === 0) return "No allergens";
  return allergens.join(", ");
};
