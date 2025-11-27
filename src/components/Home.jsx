import { Link } from "react-router";
import { useState, useEffect } from "react";
import { getCategoryCount, getProductCount } from "../lib/requests";

const Home = () => {
  const [productCount, setProductCount] = useState(194);
  const [categoryCount, setCategoryCount] = useState(24);

  useEffect(() => {
    getProductCount().then((result) => {
      if(result) {
        setProductCount(result);
      }
    });
    getCategoryCount().then((result) => {
      if(result) {
        setCategoryCount(result);
      }
    });
  }, [])

  return (
    <main className="home">
      <section className="home-section">
        <h1 className="welcome">Welcome to NileKart</h1>
        <div className="highlight-container">
          <div className="highlight">
            <p className="highlight-big">{productCount}</p>
            <p className="highlight-small">Products</p>
          </div>
          <div className="highlight">
            <p className="highlight-big">{categoryCount}</p>
            <p className="highlight-small">Categories</p>
          </div>
        </div>
        <Link to="shop"><button className="polar-btn large-btn">Start Shopping</button></Link>
      </section>
      {/* <section className="home-section dummy">
        <span>Stats</span>
      </section>
      <section className="home-section dummy">
        <span>Testimonials</span>
      </section>
      <section className="home-section dummy">
        <span>Newsletter</span>
      </section> */}
    </main>
  );
};

export default Home;