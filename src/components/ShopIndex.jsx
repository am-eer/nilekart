import Tile from "./Tile";
import { getCategories } from "../lib/requests";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import CategoryButton from "./CategoryButton";

const ShopIndex = () => {
  const [categories, setCategories] = useState([]);
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCategories().then((fetchedCategories) => {
      if (fetchedCategories != null) {
        fetchedCategories.forEach((category) => {
          fetch(
            `https://dummyjson.com/products/category/${category.slug}?limit=4&select=title,price,discountPercentage,rating,stock,thumbnail`
          )
            .then((response) => response.json())
            .then((payload) => {
              setProducts((products) => [...products, payload.products]);
              setCategories((categories) => [...categories, category]);
            })
            .catch((ex) => console.error("Failed to fetch categories", ex));
        });
      }
    });
  }, []);

  return (
    <main className="shop-main">
      {categories.map((category, index) => (
        <div key={index} className="category-showcase">
          <h1 className="center">{category.name}</h1>
          <div className="product-showcase-box">
            <div className="product-showcase">
              {products[index].map((product, idx) => (
                <Link key={idx} to={`product/${product.id}`}>
                  <Tile product={product} />
                </Link>
              ))}
            </div>
            <CategoryButton categorySlug={category.slug} />
          </div>
        </div>
      ))}
    </main>
  );
};

export default ShopIndex;
