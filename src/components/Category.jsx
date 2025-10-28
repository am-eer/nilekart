import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Tile from "./Tile";
import { getProducts, getSearchResults } from "../lib/requests";
import { formatCategory, extractPageNumber } from "../lib/utils";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { query, category, pg: pgNoStr } = useParams();
  const pgNo = extractPageNumber(pgNoStr);

  useEffect(() => {
    query ? (
      getSearchResults(pgNo, query).then((fetchedProducts) => {
        if (fetchedProducts != null) {
          setProducts(fetchedProducts.products);
          setTotal(fetchedProducts.total);
        }
      })
    ) : (
      getProducts(pgNo, category).then((fetchedProducts) => {
        if (fetchedProducts != null) {
          setProducts(fetchedProducts.products);
          setTotal(fetchedProducts.total);
        }
      })
    )
  }, [pgNo, category, query]);

  return (
    <main className="shop-main">
      <h1 className="shop-main-heading">{query ? "Search Results" : formatCategory(category)}</h1>
      <div className="tile-grid">
        {products &&
          products.map((product, idx) => (
            <Link key={idx} to={`../product/${product.id}`}>
              <Tile product={product} />
            </Link>
          ))}
      </div>
      <div className="page-btns">
        <Link className={pgNo < 2 ? "disable" : ""} to={query ? `../search/${query}/${pgNo - 1}` :`../categories/${category}/${pgNo - 1}`}>
          <button disabled={pgNo < 2} className="dark-btn">Prev Page</button>
        </Link>
        <Link className={pgNo * 12 < total ? "" : "disable"} to={query ? `../search/${query}/${pgNo + 1}` : `../categories/${category}/${pgNo + 1}`}>
          <button disabled={pgNo * 12 >= total} className="dark-btn" >Next Page</button>
        </Link>
      </div>
    </main>
  );
};

export default Category;
