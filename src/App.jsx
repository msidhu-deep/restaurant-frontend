// Main app - holds all the routes
import { Routes, Route } from "react-router-dom";
import Navbar from "./components/Navbar";
import Home from "./pages/Home";

function App() {
  return (
    <div>
      {/* Navbar sits outside Routes so it shows on every page */}
      <Navbar />

      <Routes>
        {/* "/" means the home page */}
        <Route path="/" element={<Home />} />
      </Routes>
    </div>
  );
}

export default App;
