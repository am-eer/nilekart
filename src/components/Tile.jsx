const Tile = ({ prod }) => {
  return (
    <div>
      <img src={prod.thumbnail} alt="Product Image" />
      <p>{prod.title}</p>
      <span>{prod.rating}⭐</span>
      {prod.discountPercentage ? (
        <>
          <h4>
            <s>${prod.price}</s>
          </h4>
          <h3>
            ${Math.trunc(prod.price * (100 - prod.discountPercentage)) / 100}
          </h3>
        </>
      ) : (
        <h3>${Math.trunc(prod.price * 100) / 100}</h3>
      )}
      {prod.stock ? (
        prod.stock < 10 && <h4>Only {prod.stock} units left. Hurry up!</h4>
      ) : (
        <h4>Out of Stock</h4>
      )}
    </div>
  );
};

export default Tile;
