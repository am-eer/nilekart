const Tile = ({ product }) => {
  return (
    <div className="tile">
      <img src={product.thumbnail} alt="Product Image" />
      <p>{product.title}</p>
      <span>{product.rating}⭐</span>
      {product.discountPercentage ? (
        <>
          <p>
            <s>${product.price}</s>
          </p>
          <p>
            ${Math.trunc(product.price * (100 - product.discountPercentage)) / 100}
          </p>
        </>
      ) : (
        <p>${Math.trunc(product.price * 100) / 100}</p>
      )}
      {product.stock ? (
        product.stock < 10 && <p>Only {product.stock} units left. Hurry up!</p>
      ) : (
        <p>Out of Stock</p>
      )}
    </div>
  );
};

export default Tile;
