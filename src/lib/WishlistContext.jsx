import { useState, useContext, createContext } from "react";

const initialContextValue = [new Set(),()=>{}];
const WishlistContext = createContext(initialContextValue);

const WishlistProvider = ({children}) => {
  const wishlistState = useState(new Set());

  return (
    <WishlistContext value={wishlistState}>
      {children}
    </WishlistContext>
  );
};

const useWishlist = () => {
  const context = useContext(WishlistContext);
  if(context === initialContextValue) {
    console.warn("Context used outside provider");
  }
  return context;
};

export {WishlistProvider, useWishlist};