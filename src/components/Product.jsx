import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getFullProduct } from "../lib/requests";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  
  useEffect(() => {
    getFullProduct(productId).then((fetchedProduct) => {
      if(fetchedProduct != null) setProduct(fetchedProduct);
    });
  }, []);

  return product &&
    <main className="product">
      <img src={product.images[0]} alt="Product Image" />
      <div>
        <h1>{product.title}</h1>
        <span>{product.rating}⭐</span>
        {product.discountPercentage ? (
          <>
            <h2>
              <s>${product.price}</s>
            </h2>
            <h1>
              $
              {Math.trunc(product.price * (100 - product.discountPercentage)) /
                100}
            </h1>
          </>
        ) : (
          <h1>${Math.trunc(product.price * 100) / 100}</h1>
        )}
        {product.stock ? (
          product.stock < 10 && (
            <h2>Only {product.stock} units left. Hurry up!</h2>
          )
        ) : (
          <h2>Out of Stock</h2>
        )}
        <span>{product.shippingInformation}</span>
        <h3>Description</h3>
        <p>{product.description}</p>
        <table>
          <tbody>
            <tr><th>Category</th><td>{product.category}</td></tr>
            <tr><th>Brand</th><td>{product.brand}</td></tr>
            <tr><th>SKU</th><td>{product.sku}</td></tr>
            <tr><th>Dimensions</th><td>{`${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth}`}</td></tr>
            <tr><th>Weight</th><td>{product.weight + " units"}</td></tr>
            <tr><th>Warranty</th><td>{product.warrantyInformation}</td></tr>
            <tr><th>Return Policy</th><td>{product.returnPolicy}</td></tr>
          </tbody>
        </table>
      </div>
    </main>
};

export default Product;
