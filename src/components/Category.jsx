import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Tile from "./Tile";
import { getProducts } from "../lib/requests";
import { capitalizeFirstLetter, extractPageNumber } from "../lib/utils";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { category, pg: pgNoStr } = useParams();
  const pgNo = extractPageNumber(pgNoStr);

  useEffect(() => {
    getProducts(pgNo, category).then((fetchedProducts) => {
      if (fetchedProducts != null) {
        setProducts(fetchedProducts.products);
        setTotal(fetchedProducts.total);
      }
    });
  }, [pgNo, category]);

  return (
    <main className="shop-main">
      <h1 className="shop-main-heading">{capitalizeFirstLetter(category)}</h1>
      <div className="tile-grid">
        {products &&
          products.map((product, idx) => (
            <Link key={idx} to={`product/${product.id}`}>
              <Tile product={product} />
            </Link>
          ))}
      </div>
      <div className="page-btns">
        <Link className={pgNo < 2 ? "disable" : ""} to={`../categories/${category}/${pgNo - 1}`}>
          <button disabled={pgNo < 2}>Prev Page</button>
        </Link>
        <Link className={pgNo * 12 < total ? "" : "disable"} to={pgNo * 12 >= total ? null : `../categories/${category}/${pgNo + 1}`}>
          <button disabled={pgNo * 12 >= total}>Next Page</button>
        </Link>
      </div>
    </main>
  );
};

export default Category;
