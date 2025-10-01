import { useState, useEffect } from "react";
import { Link } from "react-router";
import Tile from "./Tile";

const Shop = () => {
  const [cats, setCats] = useState([]);
  const [prods, setProds] = useState([]);
  const [pgNo, setPgNo] = useState(1);
  
  const nextPage = () => setPgNo((pgNo) => pgNo + 1)
  const prevPage = () => setPgNo((pgNo) => pgNo - 1)
  
  useEffect(() => {
    fetch("https://dummyjson.com/products/categories")
      .then((data) => data.json())
      .then((array) => setCats(array));
  }, []);
  useEffect(() => {
    fetch(
      `https://dummyjson.com/products?limit=12&skip=${
        12 * (pgNo - 1)
      }&select=title,price,discountPercentage,rating,stock,thumbnail`
    )
      .then((data) => data.json())
      .then((array) => setProds(array.products));
  }, [pgNo]);

  return (
    <>
      <aside>
        <h4>Categories</h4>
        <ul>
          {cats.map((cat, idx) => (
            <li key={idx}>
              <Link to={`shop/categories/${cat.slug}`}>{cat.name}</Link>
            </li>
          ))}
        </ul>
      </aside>
      <main>
        {prods && prods.map((prod, idx) => (
          <Tile key={idx} prod={prod}/>
        ))}
      </main>
      {pgNo > 1 && (
        <button
          onClick={prevPage}
        >
          Prev Page
        </button>
      )}
      <button
        onClick={nextPage}
      >
        Next Page
      </button>
    </>
  );
};

export default Shop;
