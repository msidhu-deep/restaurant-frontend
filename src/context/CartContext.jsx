// CartContext - stores the cart so every page can use it
import { createContext, useContext, useState } from "react";

const CartContext = createContext();

export function CartProvider({ children }) {
  // cart is an array of items, each with a quantity
  const [cart, setCart] = useState([]);

  // add item, or +1 if it's already in the cart
  function addToCart(item) {
    const existing = cart.find((c) => c.id === item.id);
    if (existing) {
      setCart(
        cart.map((c) =>
          c.id === item.id ? { ...c, quantity: c.quantity + 1 } : c,
        ),
      );
    } else {
      setCart([...cart, { ...item, quantity: 1 }]);
    }
  }

  // remove an item completely
  function removeFromCart(id) {
    setCart(cart.filter((c) => c.id !== id));
  }

  // change quantity (remove the item if it goes below 1)
  function updateQuantity(id, quantity) {
    if (quantity < 1) {
      removeFromCart(id);
      return;
    }
    setCart(cart.map((c) => (c.id === id ? { ...c, quantity } : c)));
  }

  // empty the cart (we use this after checkout)
  function clearCart() {
    setCart([]);
  }

  // add up price x quantity for every item
  const total = cart.reduce((sum, c) => sum + c.price * c.quantity, 0);

  return (
    <CartContext.Provider
      value={{
        cart,
        addToCart,
        removeFromCart,
        updateQuantity,
        clearCart,
        total,
      }}
    >
      {children}
    </CartContext.Provider>
  );
}

// shortcut so other files can write useCart()
export function useCart() {
  return useContext(CartContext);
}
