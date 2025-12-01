import { Link } from "react-router";

const HamburgerMenu = ({ location, navigate, cart, theme, toggleTheme, hamburgerAnimationClass, setHamburgerAnimationClass }) => {
  const closeMenu = () => {
    setHamburgerAnimationClass("hamburger-menu-exit");
  };
  
  return (
    <div className={`hamburger-menu ${hamburgerAnimationClass}`}>
      <button className="hamburger-close-btn unpolar-btn" onClick={closeMenu}>
        <svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m12 13.4l-4.9 4.9q-.275.275-.7.275t-.7-.275t-.275-.7t.275-.7l4.9-4.9l-4.9-4.9q-.275-.275-.275-.7t.275-.7t.7-.275t.7.275l4.9 4.9l4.9-4.9q.275-.275.7-.275t.7.275t.275.7t-.275.7L13.4 12l4.9 4.9q.275.275.275.7t-.275.7t-.7.275t-.7-.275z"/></svg>
      </button>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTerm = formData.get("search");
        if(searchTerm === "") return;
        navigate(`/shop/search/${searchTerm}/1`);
        closeMenu();
      }}>
        <input type="text" name="search" />
        <button type="submit" className="polar-btn"><svg xmlns="http://www.w3.org/2000/svg" width="32" height="32" viewBox="0 0 24 24"><path fill="currentColor" d="m19.6 21l-6.3-6.3q-.75.6-1.725.95T9.5 16q-2.725 0-4.612-1.888T3 9.5t1.888-4.612T9.5 3t4.613 1.888T16 9.5q0 1.1-.35 2.075T14.7 13.3l6.3 6.3zM9.5 14q1.875 0 3.188-1.312T14 9.5t-1.312-3.187T9.5 5T6.313 6.313T5 9.5t1.313 3.188T9.5 14"/></svg></button>
      </form>
      <Link to="/" onClick={closeMenu} className={location.pathname === "/" ? "selected-nav-tab" : ""}>Home</Link>
      <Link to="/shop" onClick={closeMenu} className={location.pathname.startsWith("/shop") && !location.pathname.endsWith("/wishlist") && !location.pathname.endsWith("/cart") ? "selected-nav-tab" : ""}>Shop</Link>
      <Link to="/shop/wishlist" onClick={closeMenu} className={location.pathname === "/shop/wishlist" ? "selected-nav-tab" : ""}>Wishlist</Link>
      <div className="cart-link">
        <Link to="/shop/cart" onClick={closeMenu} className={location.pathname === "/shop/cart" ? "selected-nav-tab" : ""}>Cart</Link>
        <span className="cart-count">{cart.size}</span>
      </div>
      <button className="theme-toggle" onClick={toggleTheme}>
        {theme === "light" ? "Dark" : "Light"}
      </button>
    </div>
  );
}

export default HamburgerMenu;