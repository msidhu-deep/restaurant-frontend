// Cart page - shows items, checkout, and order confirmation
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  // addOrder sends the order to the shared storage (admin will see it)
  const { addOrder } = useOrders();

  // form state
  const [orderType, setOrderType] = useState("pickup");
  const [address, setAddress] = useState("");
  const [error, setError] = useState("");

  // holds the order after it's placed (null = not placed yet)
  const [placedOrder, setPlacedOrder] = useState(null);

  function handlePlaceOrder() {
    // delivery needs an address
    if (orderType === "delivery" && address.trim() === "") {
      setError("Please enter a delivery address.");
      return;
    }

    setError("");

    // make the order object
    const order = {
      id: Date.now(),
      items: cart,
      total: total,
      type: orderType,
      address: address,
      status: "Preparing",
    };

    addOrder(order);
    setPlacedOrder(order);
    clearCart();
  }

  // order placed - show confirmation (must be checked before the empty cart)
  if (placedOrder) {
    return (
      <div>
        <h1>Order Confirmed!</h1>
        <p>Order #{placedOrder.id}</p>
        <p>Type: {placedOrder.type}</p>
        {placedOrder.type === "delivery" && (
          <p>Address: {placedOrder.address}</p>
        )}
        <p>Status: {placedOrder.status}</p>
        <p>Total: ${placedOrder.total.toFixed(2)}</p>
      </div>
    );
  }

  // if cart is empty, show a message instead
  if (cart.length === 0) {
    return (
      <div>
        <h1>Your Cart</h1>
        <p>Your cart is empty. Go to the Menu to add something!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>Your Cart</h1>

      {/* one row per cart item */}
      {cart.map((item) => (
        <div key={item.id} className="cart-row">
          <h3>{item.name}</h3>
          <p>${item.price.toFixed(2)} each</p>

          {/* minus, quantity, plus buttons */}
          <button onClick={() => updateQuantity(item.id, item.quantity - 1)}>
            -
          </button>
          <span> {item.quantity} </span>
          <button onClick={() => updateQuantity(item.id, item.quantity + 1)}>
            +
          </button>

          <p>Subtotal: ${(item.price * item.quantity).toFixed(2)}</p>
          <button onClick={() => removeFromCart(item.id)}>Remove</button>
        </div>
      ))}

      <h2>Total: ${total.toFixed(2)}</h2>

      {/* pickup or delivery */}
      <h3>How do you want your order?</h3>
      <label>
        <input
          type="radio"
          value="pickup"
          checked={orderType === "pickup"}
          onChange={(e) => setOrderType(e.target.value)}
        />
        Pickup
      </label>
      <label>
        <input
          type="radio"
          value="delivery"
          checked={orderType === "delivery"}
          onChange={(e) => setOrderType(e.target.value)}
        />
        Delivery
      </label>

      {/* address box only shows for delivery */}
      {orderType === "delivery" && (
        <div>
          <input
            type="text"
            placeholder="Delivery address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
        </div>
      )}

      {/* error message if something is missing */}
      {error && <p>{error}</p>}

      <button onClick={handlePlaceOrder}>Place Order</button>
    </div>
  );
}

export default Cart;
