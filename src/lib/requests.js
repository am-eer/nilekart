const API_PREFIX = "https://dummyjson.com/products";

export const getCategories = async () => {
  try {
    const response = await fetch(`${API_PREFIX}/categories`);
    const payload = await response.json();
    return payload;
  } catch (err) {
    console.error("Failed to get categories", err);
    return null;
  }
};
