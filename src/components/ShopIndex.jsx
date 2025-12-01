import Tile from "./Tile";
import { getShowcase } from "../lib/requests";
import { useState, useEffect } from "react";
import { Link } from "react-router";
import CategoryButton from "./CategoryButton";

const ShopIndex = () => {
  const [showcase, setShowcase] = useState([]);

  useEffect(() => {
    getShowcase(setShowcase);
  }, []);

  return (
    <main className="shop-main">
      {showcase.map((section, index) => (
        <div key={index} className="category-showcase">
          <div className="title-container">
            <h1 className="center">{section.category.name}</h1>
            <CategoryButton categorySlug={section.category.slug} />
          </div>
          <div className="product-showcase-box">
            <div className="product-showcase">
              {section.products.map((product, idx) => (
                <Link key={idx} to={`product/${product.id}`}>
                  <Tile product={product} />
                </Link>
              ))}
            </div>
            <CategoryButton categorySlug={section.category.slug} />
          </div>
        </div>
      ))}
    </main>
  );
};

export default ShopIndex;