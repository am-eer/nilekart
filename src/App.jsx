import './App.css' 
import './responsive.css'
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { Outlet } from "react-router";
import { CartProvider } from './lib/CartContext';
import { WishlistProvider } from './lib/WishlistContext';

function App() {

  return (
    <>
      <CartProvider>
        <WishlistProvider>
          <Navbar />
          <Outlet />
        </WishlistProvider>
      </CartProvider>
      <Footer />
    </>
  )
}

export default App
