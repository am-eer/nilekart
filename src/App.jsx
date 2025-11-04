import './App.css'
import Navbar from "./components/Navbar";
import Footer from './components/Footer';
import { Outlet } from "react-router";
import { CartProvider } from './lib/CartContext';

function App() {

  return (
    <>
      <CartProvider>
        <Navbar />
        <Outlet />
      </CartProvider>
      <Footer />
    </>
  )
}

export default App
