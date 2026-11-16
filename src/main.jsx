// Entry file - starts the React app
import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import { BrowserRouter } from "react-router-dom";
import App from "./App.jsx";
import { CartProvider } from "./context/CartContext";
import { OrdersProvider } from "./context/OrdersContext";
import { MenuProvider } from "./context/MenuContext";

// providers wrap the app so every page can use the menu, cart, and orders
createRoot(document.getElementById("root")).render(
  <StrictMode>
    <BrowserRouter>
      <MenuProvider>
        <OrdersProvider>
          <CartProvider>
            <App />
          </CartProvider>
        </OrdersProvider>
      </MenuProvider>
    </BrowserRouter>
  </StrictMode>,
);
