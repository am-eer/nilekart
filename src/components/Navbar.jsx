import { Link } from "react-router";
import { useLocation, useNavigate } from "react-router";

const Navbar = () => {
  const location = useLocation();
  let navigate = useNavigate();
  
  return (
    <nav>
      <Link to="/" className={location.pathname === "/" ? "selected-nav-tab" : ""}>Home</Link>
      <Link to="/shop" className={location.pathname.startsWith("/shop") ? "selected-nav-tab" : ""}>Shop</Link>
      <form onSubmit={(e) => {
        e.preventDefault();
        const formData = new FormData(e.target);
        const searchTerm = formData.get("search");
        if(searchTerm === "") return;
        navigate(`/shop/search/${searchTerm}/1`);
      }}>
        <input type="text" name="search" />
        <button type="submit"></button>
      </form>
      <Link to="/cart" className={location.pathname === "/cart" ? "selected-nav-tab" : ""}>Cart</Link>
    </nav>
  );
};

export default Navbar;