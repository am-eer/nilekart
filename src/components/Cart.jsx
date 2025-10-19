import { Link } from "react-router";

const Cart = () => {
  return (
    <div style={{position: "fixed", top: "50%", left: "50%", translate: "-50% -50%"}}>
      <p style={{fontSize: "3rem", textAlign: "center"}}>Cart page under construction 🛠️</p>
      <Link to=".."><button className="wipe-btn" style={{display: "block", fontSize: "1.5rem", marginInline: "auto", padding: "1.5rem 4rem"}}>Back</button></Link>
    </div>
  );
};

export default Cart;