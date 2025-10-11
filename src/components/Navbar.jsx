import { Link } from "react-router";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav>
      <Link to="/" className={location.pathname === "/" ? "selected-nav-tab" : ""}>Home</Link>
      <Link to="/shop" className={location.pathname.startsWith("/shop") ? "selected-nav-tab" : ""}>Shop</Link>
      <Link to="/cart" className={location.pathname === "/cart" ? "selected-nav-tab" : ""}>Cart</Link>
    </nav>
  );
};

export default Navbar;