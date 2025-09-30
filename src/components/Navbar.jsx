import { Link } from "react-router";
import { useLocation } from "react-router";

const Navbar = () => {
  const location = useLocation();
  
  return (
    <nav>
      {location.pathname === "/" ? (<b><Link to="/">Home</Link></b>) : (<Link to="/">Home</Link>)}
      {location.pathname.startsWith("/shop") ? (<b><Link to="shop">Shop</Link></b>) : (<Link to="shop">Shop</Link>)}
      {location.pathname === "/cart" ? (<b><Link to="cart">Cart</Link></b>) : (<Link to="cart">Cart</Link>)}
    </nav>
  );
};

export default Navbar;