import { useState, useEffect } from "react";
import { useParams } from "react-router";
import { getFullProduct } from "../lib/requests";
import { formatCategory } from "../lib/utils";
import { useWishlist } from "../lib/WishlistContext";
import Stars from "./Stars";
import Review from "./Review";

const Product = () => {
  const { productId } = useParams();
  const [wishlist, setWishlist] = useWishlist();
  const [product, setProduct] = useState(null);
  const [imageNo, setImageNo] = useState(0);
  const [shareBtnTimeoutId, setShareBtnTimeoutId] = useState(null);
  const [isLinkCopied, setIsLinkCopied] = useState(false);

  useEffect(() => {
    getFullProduct(productId).then((fetchedProduct) => {
      if (fetchedProduct != null) setProduct(fetchedProduct);
    });
  }, []);

  if (!product) return <p>Unable to fetch product. Please refresh the page.</p>;
  return (
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m11 4l3 8l-3 8"
            />
          </svg>
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
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="50"
            height="50"
            viewBox="0 0 24 24"
          >
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="m11 4l3 8l-3 8"
            />
          </svg>
        </button>
      </div>
      <div className="dashboard">
        <h1 className="product-title">{product.title}</h1>
        <div className="dashboard-main">
          <div>
            <span>{product.rating + " "}</span>
            <Stars rating={product.rating} />
          </div>
          {product.discountPercentage ? (
            <>
              <p>
                <s className="prev-price">${product.price}</s>
                <span className="discount">
                  {" "}
                  {product.discountPercentage}% off
                </span>
              </p>
              <p className="current-price">
                $
                {Math.trunc(
                  product.price * (100 - product.discountPercentage)
                ) / 100}
              </p>
            </>
          ) : (
            <p>${Math.trunc(product.price * 100) / 100}</p>
          )}
          {product.stock ? (
            product.stock < 10 && (
              <p className="product-stock">
                Only {product.stock} units left. Hurry up!
              </p>
            )
          ) : (
            <p className="product-stock">Out of Stock</p>
          )}
        </div>
        <div className="action-buttons">
          <button className="dark-btn">Add to Cart</button>
          <button className="dark-btn">Buy Now</button>
          <button
            disabled={!wishlist.has(productId) && wishlist.size >= 12}
            onClick={() => {
              const tempWishlist = new Set(wishlist);
              wishlist.has(productId)
                ? tempWishlist.delete(productId)
                : tempWishlist.add(productId);
              setWishlist(tempWishlist);
            }}
            className="light-btn"
          >
            {wishlist.has(productId)
              ? "Remove from Wishlist"
              : "Add to Wishlist"}
          </button>
          <button 
          onClick={async () => {
            try {
              await navigator.clipboard.writeText(window.location.href);
              clearTimeout(shareBtnTimeoutId);
              setShareBtnTimeoutId(setTimeout(() => {setIsLinkCopied(false)}, 2000));
              setIsLinkCopied(true);
            } catch {
              console.error("Could not copy link to clipboard");
            }
          }}
          className="light-btn">{isLinkCopied ? "Link Copied" : "Share"}</button>
        </div>
      </div>
      <div className="info">
        <h2>Description</h2>
        <p className="description">{product.description}</p>
        <table>
          <tbody>
            <tr>
              <th scope="col" className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M10 3H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1M9 9H5V5h4zm11-6h-6a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1V4a1 1 0 0 0-1-1m-1 6h-4V5h4zm-9 4H4a1 1 0 0 0-1 1v6a1 1 0 0 0 1 1h6a1 1 0 0 0 1-1v-6a1 1 0 0 0-1-1m-1 6H5v-4h4zm8-6c-2.206 0-4 1.794-4 4s1.794 4 4 4s4-1.794 4-4s-1.794-4-4-4m0 6c-1.103 0-2-.897-2-2s.897-2 2-2s2 .897 2 2s-.897 2-2 2"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">Category</p>
                <p>{formatCategory(product.category)}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M3 13a9 9 0 0 0 9 9a9 9 0 0 0-9-9m2.44 2.44c1.91.71 3.41 2.21 4.12 4.12a7 7 0 0 1-4.12-4.12M12 22a9 9 0 0 0 9-9a9 9 0 0 0-9 9m2.42-2.43a6.88 6.88 0 0 1 4.15-4.15a7.03 7.03 0 0 1-4.15 4.15M12 14a6 6 0 0 0 6-6V3a5.9 5.9 0 0 0-2.16.39c-.55.23-1.04.57-1.45 1L12 2L9.61 4.39c-.41-.43-.9-.77-1.45-1A5.9 5.9 0 0 0 6 3v5a6 6 0 0 0 6 6M8 5.61l1.57 1.65L12 4.83l2.43 2.43L16 5.61V8a4 4 0 0 1-4 4a4 4 0 0 1-4-4z"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">Brand</p>
                <p>{product.brand ? product.brand : "Nilekart"}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M8 4v4H4v2h4v4H4v2h4v4h2v-4h4v4h2v-4h4v-2h-4v-4h4V8h-4V4h-2v4h-4V4zm6 10v-4h-4v4z"
                    clipRule="evenodd"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">SKU</p>
                <p>{product.sku}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="none"
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="M3 5h11m-2 2l2-2l-2-2M5 3L3 5l2 2m14 3v11m-2-2l2 2l2-2m0-7l-2-2l-2 2M3 12a2 2 0 0 1 2-2h7a2 2 0 0 1 2 2v7a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">Dimension</p>
                <p>{`${product.dimensions.width}x${product.dimensions.height}x${product.dimensions.depth}`}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M7 6h1a2.5 2.5 0 0 1 2.5 2.5v8A2.5 2.5 0 0 1 8 19H7a2.5 2.5 0 0 1-2.5-2.5v-8A2.5 2.5 0 0 1 7 6m1.5 2.5v8a.5.5 0 0 1-.5.5H7a.5.5 0 0 1-.5-.5v-8A.5.5 0 0 1 7 8h1a.5.5 0 0 1 .5.5M17 6h-1a2.5 2.5 0 0 0-2.5 2.5v8A2.5 2.5 0 0 0 16 19h1a2.5 2.5 0 0 0 2.5-2.5v-8A2.5 2.5 0 0 0 17 6m-1.5 2.5v8a.5.5 0 0 0 .5.5h1a.5.5 0 0 0 .5-.5v-8A.5.5 0 0 0 17 8h-1a.5.5 0 0 0-.5.5"
                    clipRule="evenodd"
                  />
                  <path fill="currentColor" d="M9 13h6v2H9zm0-3h6v2H9z" />
                  <path
                    fill="currentColor"
                    fillRule="evenodd"
                    d="M19.877 11.003a20 20 0 0 0-.469-.003H19a1 1 0 1 1 0-2h.458c.33 0 .668 0 .95.037c.326.044.722.152 1.055.48l.005.006l.015.014c.328.333.436.729.48 1.054c.037.283.037.622.037.952v1.915c0 .33 0 .668-.038.951c-.043.325-.151.72-.48 1.054l-.005.005l-.014.015c-.333.328-.729.436-1.054.48a8 8 0 0 1-.952.037H19a1 1 0 1 1 0-2h.408a20 20 0 0 0 .584-.008l.005-.116c.003-.128.003-.278.003-.468v-1.816a20 20 0 0 0-.008-.585zm-15.754 0C4.252 11 4.402 11 4.592 11H5a1 1 0 1 0 0-2h-.458c-.33 0-.668 0-.951.037c-.325.044-.72.152-1.054.48l-.005.006l-.015.014c-.328.333-.436.729-.48 1.054a8 8 0 0 0-.037.952v1.915c0 .33 0 .668.037.951c.044.325.152.72.48 1.054l.006.005l.014.015c.333.328.729.436 1.054.48c.283.037.622.037.952.037H5a1 1 0 1 0 0-2h-.408a20 20 0 0 1-.585-.008A20 20 0 0 1 4 13.407v-1.815a20 20 0 0 1 .007-.585z"
                    clipRule="evenodd"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">Weight</p>
                <p>{product.weight + " units"}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M6 20q-1.25 0-2.125-.875T3 17H1V6q0-.825.588-1.412T3 4h14v4h3l3 4v5h-2q0 1.25-.875 2.125T18 20t-2.125-.875T15 17H9q0 1.25-.875 2.125T6 20m0-2q.425 0 .713-.288T7 17t-.288-.712T6 16t-.712.288T5 17t.288.713T6 18m-3-3h.8q.425-.45.975-.725T6 14t1.225.275T8.2 15H15V6H3zm15 3q.425 0 .713-.288T19 17t-.288-.712T18 16t-.712.288T17 17t.288.713T18 18m-1-5h4.25L19 10h-2zm-8-2.5"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">Shipping Time</p>
                <p>{product.shippingInformation}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 14 14"
                >
                  <g fill="none" stroke="currentColor" strokeLinejoin="round">
                    <path d="M1.082 7.626a.976.976 0 0 1 0-1.273q.338-.393.678-.773q-.103-.493-.198-.996a.976.976 0 0 1 .636-1.103q.49-.172.974-.331q.157-.479.327-.962A.976.976 0 0 1 4.6 1.552q.5.094.992.196q.374-.334.76-.666a.976.976 0 0 1 1.273 0q.39.334.764.67q.5-.105 1.009-.2a.976.976 0 0 1 1.102.636q.17.484.327.962q.484.16.974.331c.455.16.725.628.636 1.103q-.096.512-.201 1.013q.34.381.68.777a.976.976 0 0 1 .001 1.273q-.337.393-.678.773q.104.493.198.997a.976.976 0 0 1-.636 1.102q-.49.172-.974.331q-.158.48-.327.962a.976.976 0 0 1-1.102.637a53 53 0 0 1-.992-.197q-.374.335-.76.666a.976.976 0 0 1-1.273 0q-.39-.334-.764-.67q-.5.105-1.009.2a.976.976 0 0 1-1.102-.636a53 53 0 0 1-.327-.962a52 52 0 0 1-.974-.33a.976.976 0 0 1-.636-1.103q.096-.513.201-1.014a53 53 0 0 1-.68-.777Z" />
                    <path
                      strokeLinecap="round"
                      d="M4.62 7.738L6.212 9.38C6.962 7.227 7.586 6.282 9 5"
                    />
                  </g>
                </svg>
              </th>
              <td>
                <p className="info-heading">Warranty</p>
                <p>{product.warrantyInformation}</p>
              </td>
            </tr>
            <tr>
              <th className="info-icon">
                <svg
                  xmlns="http://www.w3.org/2000/svg"
                  width="32"
                  height="32"
                  viewBox="0 0 24 24"
                >
                  <path
                    fill="currentColor"
                    d="M12 4V1L8 5l4 4V6c3.31 0 6 2.69 6 6c0 1.01-.25 1.97-.7 2.8l1.46 1.46A7.93 7.93 0 0 0 20 12c0-4.42-3.58-8-8-8m0 14c-3.31 0-6-2.69-6-6c0-1.01.25-1.97.7-2.8L5.24 7.74A7.93 7.93 0 0 0 4 12c0 4.42 3.58 8 8 8v3l4-4l-4-4z"
                  />
                </svg>
              </th>
              <td>
                <p className="info-heading">Return Policy</p>
                <p>{product.returnPolicy}</p>
              </td>
            </tr>
          </tbody>
        </table>
      </div>
      <div className="review-section">
        <h2>Reviews</h2>
        <ul className="reviews">
          {product.reviews.map((review, index) => (
            <li key={index}>{<Review review={review} />}</li>
          ))}
        </ul>
      </div>
    </main>
  );
};

export default Product;
