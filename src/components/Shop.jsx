import { useState, useEffect } from "react";
import { Link, Outlet, useLocation } from "react-router";
import { getCategories } from "../lib/requests";

const Shop = () => {
  const [categories, setCategories] = useState([]);
  const location = useLocation();

  useEffect(() => {
    getCategories().then((fetchedCategories) => {
      if (fetchedCategories != null) setCategories(fetchedCategories);
    });
  }, []);

  return (
    <div className="shop">
      {
        location.pathname !== "/shop" && (
          <aside className="shop-aside">
            <h2 className="aside-heading">Categories</h2>
            <ul>
              {categories.map((category, idx) => (
                <li key={idx}>
                  <Link to={`/shop/categories/${category.slug}/1`}>
                    <div className="category-card">
                      {category.name}
                    </div>
                  </Link>
                </li>
              ))}
            </ul>
          </aside>
        )
      }
      <Outlet />
    </div>
  );
};

export default Shop;