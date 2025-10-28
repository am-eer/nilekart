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
    <div style={{position: "fixed", top: "50%", left: "50%", translate: "-50% -50%"}}>
      <p style={{fontSize: "3rem", textAlign: "center"}}>Welcome to NileKart</p>
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
      <Link to="shop"><button className="dark-btn" style={{display: "block", fontSize: "1.5rem", marginInline: "auto", padding: "1.5rem 3rem"}}>Start Shopping</button></Link>
    </div>
  );
};

export default Home;