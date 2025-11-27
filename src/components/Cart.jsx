import { useState, useEffect } from "react";
import { useCart } from "../lib/CartContext";
import { getCart } from "../lib/requests";
import CartItem from "./CartItem";

const Cart = () => {
  const [cart, setCart] = useCart();
  const [products, setProducts] = useState([]);

  useEffect(() => {
    getCart(cart).then((fetchedProducts) => {
      if (fetchedProducts !== null) {
        setProducts(fetchedProducts);
      }
    });
  }, [cart]);

  return (
    <main className="shop-main">
      <h1 className="shop-main-heading">Cart</h1>
      {products.length === 0 ? (
        <p className="empty-msg">There are no products to display</p>
      ) : (
        <div className="cart-items">
        {products.map((product, idx) => {
          return (
            <CartItem
              key={idx}
              product={product}
              cart={cart}
              setCart={setCart}
            />
          );
        })}
        </div>
      )}
    </main>
  );
};

export default Cart;
