import menuData from "./menu.json";

export const menuCategories = menuData.categories ?? [];
export const menuItems = menuData.items ?? [];

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

export const formatPrice = (price) => {
  if (typeof price !== "number" || !Number.isFinite(price)) return "";
  return `$${price.toFixed(2)}`;
};
