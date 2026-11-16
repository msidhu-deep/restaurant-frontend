// Navbar - links to all the pages
import { Link } from "react-router-dom";

function Navbar() {
  return (
    <nav>
      <Link to="/">Home</Link>
      <Link to="/menu">Menu</Link>
      <Link to="/cart">Cart</Link>
      <Link to="/my-orders">My Orders</Link>
      <Link to="/reservations">Reservations</Link>
      <Link to="/my-reservations">My Reservations</Link>
      <Link to="/chat">Chat</Link>
      <Link to="/admin">Admin</Link>
    </nav>
  );
}

export default Navbar;
