import { useState, useContext, createContext } from "react";

// Map<productId: Number, productCount: Number>
const initialContextValue = [new Map(),()=>{}];
const CartContext = createContext(initialContextValue);

const CartProvider = ({children}) => {
  const cartState = useState(new Map());

  return (
    <CartContext value={cartState}>
      {children}
    </CartContext>
  );
};

const useCart = () => {
  const context = useContext(CartContext);
  if(context === initialContextValue) {
    console.warn("Context used outside provider");
  }
  // console.log(context);
  return context;
};

export {CartProvider, useCart};