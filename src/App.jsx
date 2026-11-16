// Main app - holds all the routes
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Cart from "./pages/Cart";
import MyOrders from "./pages/MyOrders";
import Reservations from "./pages/Reservations";
import MyReservations from "./pages/MyReservations";
import Chat from "./pages/Chat";
import Admin from "./pages/Admin";

function App() {
  return (
    <div>
      {/* Navbar sits outside Routes so it shows on every page */}
      <Navbar />

      <Routes>
        {/* "/" means the home page */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/cart" element={<Cart />} />
        <Route path="/my-orders" element={<MyOrders />} />
        <Route path="/reservations" element={<Reservations />} />
        <Route path="/my-reservations" element={<MyReservations />} />
        <Route path="/chat" element={<Chat />} />
        <Route path="/admin" element={<Admin />} />
      </Routes>
    </div>
  );
}

export default App;
