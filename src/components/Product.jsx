import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getFullProduct } from "../lib/requests";
import { formatCategory } from "../lib/utils";

const Product = () => {
  const { productId } = useParams();
  const [product, setProduct] = useState(null);
  const [imageNo, setImageNo] = useState(0);

  useEffect(() => {
    getFullProduct(productId).then((fetchedProduct) => {
      if (fetchedProduct != null) setProduct(fetchedProduct);
    });
  }, []);

  return (
    product && (
      <main className="product">
        <div className="carousel">
          <button
            disabled={imageNo < 1}
            onClick={() => {
              setImageNo((imageNo) => imageNo - 1);
              console.log(imageNo);
            }}
            className="dark-btn rotate"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11 4l3 8l-3 8"/></svg>
          </button>
          <img src={product.images[imageNo]} alt="Product Image" />
          <button
            disabled={imageNo + 1 >= product.images.length}
            onClick={() => {
              setImageNo((imageNo) => imageNo + 1);
              console.log(imageNo);
            }}
            className="dark-btn"
          >
            <svg xmlns="http://www.w3.org/2000/svg" width="50" height="50" viewBox="0 0 24 24"><path fill="none" stroke="currentColor" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="m11 4l3 8l-3 8"/></svg>
          </button>
        </div>
        <div className="product-info">
          <div className="buy-buttons">
            <button className="dark-btn">Add to Cart</button>
            <button className="dark-btn">Buy Now</button>
          </div>
          <h1>{product.title}</h1>
          <span>{product.rating}⭐</span>
          {product.discountPercentage ? (
            <>
              <h2>
                <s>${product.price}</s>
              </h2>
              <h1>
                $
                {Math.trunc(
                  product.price * (100 - product.discountPercentage)
                ) / 100}
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
              <tr>
                <th>Category</th>
                <td>{formatCategory(product.category)}</td>
              </tr>
              <tr>
                <th>Brand</th>
                <td>{product.brand}</td>
              </tr>
              <tr>
                <th>SKU</th>
                <td>{product.sku}</td>
              </tr>
              <tr>
                <th>Dimensions</th>
                <td>{`${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth}`}</td>
              </tr>
              <tr>
                <th>Weight</th>
                <td>{product.weight + " units"}</td>
              </tr>
              <tr>
                <th>Warranty</th>
                <td>{product.warrantyInformation}</td>
              </tr>
              <tr>
                <th>Return Policy</th>
                <td>{product.returnPolicy}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </main>
    )
  );
};

export default Product;
