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

export const getShowcase = async (setShowcase) => {
  const categories = await getCategories();
  if (categories == null) return;

  const showcase = [];
  for (const category of categories) {
    try {
      const response = await fetch(
        `${API_PREFIX}/category/${category.slug}?limit=4&select=title,price,discountPercentage,rating,stock,thumbnail`
      );
      const payload = await response.json();
      showcase.push({
        category,
        products: payload.products,
      });
      if (showcase.length === 3) {
        setShowcase(() => [...showcase]);
      }
    } catch (err) {
      console.error("Failed to get showcase", err);
      return;
    }
  }
  setShowcase(() => [...showcase]);
};

export const getProducts = async (pgNo, category) => {
  try {
    const response = await fetch(
      `${API_PREFIX}/category/${category}?limit=12&skip=${
        12 * (pgNo - 1)
      }&select=title,price,discountPercentage,rating,stock,thumbnail`
    );
    const payload = await response.json();
    return { products: payload.products, total: payload.total };
  } catch (err) {
    console.error("Failed to get data for tiles", err);
    return null;
  }
};

export const getFullProduct = async (productId) => {
  try {
    const response = await fetch(`${API_PREFIX}/${productId}`);
    const payload = await response.json();
    return payload;
  } catch (err) {
    console.error("Failed to get data for tiles", err);
    return null;
  }
};

export const getSearchResults = async (pgNo, query) => {
  try {
    const response = await fetch(
      `${API_PREFIX}/search?q=${query}&limit=12&skip=${12 * (pgNo - 1)}`
    );
    const payload = await response.json();
    return payload;
  } catch (err) {
    console.error("Search failed", err);
    return null;
  }
};
