import { useState, useEffect } from "react";
import { Link, useParams } from "react-router";
import Tile from "./Tile";
import { getProducts, getSearchResults, getWishlist } from "../lib/requests";
import { formatCategory, extractPageNumber } from "../lib/utils";
import { useWishlist } from "../lib/WishlistContext";

const Category = () => {
  const [products, setProducts] = useState([]);
  const [total, setTotal] = useState(0);
  const { query, category, pg: pgNoStr } = useParams();
  const [wishlist, setWishlist] = useWishlist();
  const pgNo = extractPageNumber(pgNoStr);

  useEffect(() => {
    query ? (
      getSearchResults(pgNo, query).then((fetchedProducts) => {
        if (fetchedProducts != null) {
          setProducts(fetchedProducts.products);
          setTotal(fetchedProducts.total);
        }
      })
    ) : category ? (
      getProducts(pgNo, category).then((fetchedProducts) => {
        if (fetchedProducts != null) {
          setProducts(fetchedProducts.products);
          setTotal(fetchedProducts.total);
        }
      })
    ) : (
      getWishlist(wishlist).then((fetchedProducts) => {
        if (fetchedProducts != null) {
          setProducts(fetchedProducts);
        }
      })
    )
  }, [pgNo, category, query, wishlist]);

  return (
    <main className="shop-main">
      <h1 className="shop-main-heading">{query ? "Search Results" : category ? formatCategory(category) : "Wishlist"}</h1>
      <div className="tile-grid">
        {0 < products.length ?
          (
            products.map((product, idx) => (
              <Link key={idx} to={`../product/${product.id}`}>
                <Tile product={product} />
              </Link>
            ))
          ) : (
            <p className="empty-msg">There are no products to display</p>
          )
        }
      </div>
      {(query || category) && (<div className="page-btns">
        <Link className={pgNo < 2 ? "disable" : ""} to={query ? `../search/${query}/${pgNo - 1}` :`../categories/${category}/${pgNo - 1}`}>
          <button disabled={pgNo < 2} className="polar-btn">Prev Page</button>
        </Link>
        <Link className={pgNo * 12 < total ? "" : "disable"} to={query ? `../search/${query}/${pgNo + 1}` : `../categories/${category}/${pgNo + 1}`}>
          <button disabled={pgNo * 12 >= total} className="polar-btn" >Next Page</button>
        </Link>
      </div>)}
    </main>
  );
};

export default Category;
