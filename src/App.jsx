// Main app - holds all the routes
import { Routes, Route } from "react-router-dom";
import Home from "./pages/Home";

function App() {
  return (
    <Routes>
      {/* "/" means the home page */}
      <Route path="/" element={<Home />} />
    </Routes>
  );
}

export default App;
