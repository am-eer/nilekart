import { useState } from "react";
import { Link } from "react-router";
import { useLocation, useNavigate } from "react-router";
import { useCart } from "../lib/CartContext";
import { initTheme } from "../lib/utils";
import HamburgerMenu from "./HamburgerMenu";

const Navbar = () => {
  const location = useLocation();
  let navigate = useNavigate();
  const [cart, setCart] = useCart();
  const [theme, setTheme] = useState(initTheme());
  const [hamburgerAnimationClass, setHamburgerAnimationClass] = useState("hidden");

  if (theme === "light") {
    document.body.classList.remove("dark");
  } else {
    document.body.classList.add("dark");
  }

  const toggleTheme = () => {
    if (theme === "light") {
      setTheme("dark");
    } else {
      setTheme("light");
    }
  };

  return (
    <nav>
      <div className="logo">
        <img className="logo-icon" src="/favicon.svg" />
        <span className="logo-text">NileKart</span>
      </div>
      <Link
        to="/"
        className={location.pathname === "/" ? "selected-nav-tab" : ""}
      >
        Home
      </Link>
      <Link
        to="/shop"
        className={
          location.pathname.startsWith("/shop") &&
          !location.pathname.endsWith("/wishlist") &&
          !location.pathname.endsWith("/cart")
            ? "selected-nav-tab"
            : ""
        }
      >
        Shop
      </Link>
      <form
        onSubmit={(e) => {
          e.preventDefault();
          const formData = new FormData(e.target);
          const searchTerm = formData.get("search");
          if (searchTerm === "") return;
          navigate(`/shop/search/${searchTerm}/1`);
        }}
      >
        <input type="text" name="search" />
        <button type="submit" className="polar-btn">
          <svg
            xmlns="http://www.w3.org/2000/svg"
            width="32"
            height="32"
            viewBox="0 0 24 24"
          >
            <path
              fill="currentColor"
              d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"
            />
          </svg>
        </button>
      </form>
      <Link
        to="/shop/wishlist"
        className={
          location.pathname === "/shop/wishlist" ? "selected-nav-tab" : ""
        }
      >
        Wishlist
      </Link>
      <div className="cart-link">
        <Link
          to="/shop/cart"
          className={
            location.pathname === "/shop/cart" ? "selected-nav-tab" : ""
          }
        >
          Cart
        </Link>
        <span className="cart-count">{cart.size}</span>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        <img
          src={theme === "light" ? "/moon.svg" : "/sun.svg"}
          alt="theme button"
        />
      </button>
      <button
        className="hamburger-btn"
        onClick={() => {
          setHamburgerAnimationClass(animationClass => {
            if(animationClass==="hidden" || animationClass==="hamburger-menu-exit") {
              return "hamburger-menu-enter";
            } else {
              return "hamburger-menu-exit";
            }
          });
        }}
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="32"
          height="32"
          viewBox="0 0 48 48"
        >
          <path
            fill="none"
            stroke="currentColor"
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth="4"
            d="M7.95 11.95h32m-32 12h32m-32 12h32"
          />
        </svg>
      </button>
      <HamburgerMenu
          location={location}
          navigate={navigate}
          cart={cart}
          theme={theme}
          toggleTheme={toggleTheme}
          hamburgerAnimationClass={hamburgerAnimationClass}
          setHamburgerAnimationClass={setHamburgerAnimationClass}
        />
    </nav>
  );
};

export default Navbar;
