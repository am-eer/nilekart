import { Link } from "react-router";

const Home = () => {
  return (
    <div style={{position: "fixed", top: "50%", left: "50%", translate: "-50% -50%"}}>
      <p style={{fontSize: "3rem", textAlign: "center"}}>Welcome to NileKart 😊</p>
      <Link to="shop"><button className="wipe-btn" style={{display: "block", fontSize: "1.5rem", marginInline: "auto", padding: "1.5rem 3rem"}}>Start Shopping</button></Link>
    </div>
  );
};

export default Home;