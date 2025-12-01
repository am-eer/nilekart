import { limitToRange } from "../lib/utils";
import { Link } from "react-router";

const deleteIcon = (
  <svg
    className="delete-svg"
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M7 21q-.825 0-1.412-.587T5 19V6q-.425 0-.712-.288T4 5t.288-.712T5 4h4q0-.425.288-.712T10 3h4q.425 0 .713.288T15 4h4q.425 0 .713.288T20 5t-.288.713T19 6v13q0 .825-.587 1.413T17 21zM17 6H7v13h10zm-7 11q.425 0 .713-.288T11 16V9q0-.425-.288-.712T10 8t-.712.288T9 9v7q0 .425.288.713T10 17m4 0q.425 0 .713-.288T15 16V9q0-.425-.288-.712T14 8t-.712.288T13 9v7q0 .425.288.713T14 17M7 6v13z"
    />
  </svg>
);

const minusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M18 12.998H6a1 1 0 0 1 0-2h12a1 1 0 0 1 0 2"
    />
  </svg>
);

const plusIcon = (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    width="32"
    height="32"
    viewBox="0 0 24 24"
  >
    <path
      fill="currentColor"
      d="M12 21q-.425 0-.712-.288T11 20v-7H4q-.425 0-.712-.288T3 12t.288-.712T4 11h7V4q0-.425.288-.712T12 3t.713.288T13 4v7h7q.425 0 .713.288T21 12t-.288.713T20 13h-7v7q0 .425-.288.713T12 21"
    />
  </svg>
);

const CartItem = ({ product, cart, setCart }) => {
  const finalPrice =
    Math.trunc(product.price * (100 - product.discountPercentage)) / 100;
  const totalPrice = finalPrice * cart.get(product.id);

  return (
    <div className="cart-item">
      <Link to={`../product/${product.id}`} className="cart-item-img-box">
        <img src={product.thumbnail} alt="Product Image" />
      </Link>
      <Link to={`../product/${product.id}`} className="cart-item-title">{product.title}</Link>
      <p className="cart-item-price">Rate: ${finalPrice.toFixed(2)}</p>
      <div className="count-editor">
        <button
          className={`unpolar-btn ${cart.get(product.id) <= 1 ? "decrement-btn" : ""}`}
          onClick={() => {
            setCart((cart) => {
              const tempCart = new Map(cart);
              const newQuantity = cart.get(product.id) - 1;
              if (newQuantity >= 1) {
                tempCart.set(product.id, limitToRange(newQuantity, 1, Math.min(10, product.stock)));
              } else {
                tempCart.delete(product.id);
              }
              return tempCart;
            });
          }}
        >
          {cart.get(product.id) <= 1 ? deleteIcon : minusIcon}
        </button>
        <div className="cart-item-count">{cart.get(product.id)}</div>
        <button
          disabled={cart.get(product.id) >= Math.min(10, product.stock)}
          className="unpolar-btn"
          onClick={() => {
            setCart((cart) => {
              const tempCart = new Map(cart);
              const newQuantity = cart.get(product.id) + 1;
              tempCart.set(product.id, limitToRange(newQuantity, 1, Math.min(10, product.stock)));
              return tempCart;
            });
          }}
        >
          {plusIcon}
        </button>
      </div>
      <p className="cart-item-total-price">Total: ${totalPrice.toFixed(2)}</p>
      <button
        className="delete-btn"
        onClick={() => {
          setCart((cart) => {
            const tempCart = new Map(cart);
            tempCart.delete(product.id);
            return tempCart;
          });
        }}
      >
        {deleteIcon}
      </button>
    </div>
  );
};

export default CartItem;
