import Stars from "./Stars";

const Tile = ({ product }) => {
  return (
    <div className="tile">
      <img src={product.thumbnail} alt="Product Image" />
      <p className="tile-title">{product.title}</p>
      <Stars rating={product.rating} />
      {product.discountPercentage ? (
        <>
          <p className="tile-price">
            <s className="tile-striked-price">${product.price}</s>
          </p>
          <p className="tile-price">
            ${Math.trunc(product.price * (100 - product.discountPercentage)) / 100}
          </p>
        </>
      ) : (
        <p className="tile-price">${Math.trunc(product.price * 100) / 100}</p>
      )}
      {product.stock ? (
        product.stock < 10 && <p className="tile-stock-msg tile-stock-left-msg">Only {product.stock} units left!</p>
      ) : (
        <p className="tile-stock-msg tile-out-of-stock-msg">Out of Stock</p>
      )}
    </div>
  );
};

export default Tile;
