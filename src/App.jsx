// Main app - holds all the routes
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";
import Menu from "./pages/Menu";
import Reservations from "./pages/Reservations";

function App() {
  return (
    <div>
      {/* Navbar sits outside Routes so it shows on every page */}
      <Navbar />

      <Routes>
        {/* "/" means the home page */}
        <Route path="/" element={<Home />} />
        <Route path="/menu" element={<Menu />} />
        <Route path="/reservations" element={<Reservations />} />
      </Routes>
    </div>
  );
}

export default App;
