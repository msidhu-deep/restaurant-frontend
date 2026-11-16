// Cart page - shows items, checkout with fake payment, and order confirmation
import { useState } from "react";
import { useCart } from "../context/CartContext";
import { useOrders } from "../context/OrdersContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, clearCart, total } = useCart();
  const { addOrder } = useOrders();

  // form state
  const [orderType, setOrderType] = useState("pickup");
  const [address, setAddress] = useState("");
  const [paymentMethod, setPaymentMethod] = useState("card");
  const [cardName, setCardName] = useState("");
  const [cardNumber, setCardNumber] = useState("");
  const [expiry, setExpiry] = useState("");
  const [cvv, setCvv] = useState("");
  const [error, setError] = useState("");

  // holds the order after it's placed (null = not placed yet)
  const [placedOrder, setPlacedOrder] = useState(null);

  function handlePlaceOrder() {
    // delivery needs an address
    if (orderType === "delivery" && address.trim() === "") {
      setError("Please enter a delivery address.");
      return;
    }

    // card payment needs valid (fake) card details
    if (paymentMethod === "card") {
      if (cardName.trim() === "") {
        setError("Please enter the name on the card.");
        return;
      }
      // remove spaces, then check it is exactly 16 digits
      const digits = cardNumber.replace(/\s/g, "");
      if (!/^\d{16}$/.test(digits)) {
        setError("Card number must be 16 digits.");
        return;
      }
      // expiry like 08/28
      if (!/^(0[1-9]|1[0-2])\/\d{2}$/.test(expiry)) {
        setError("Expiry must look like MM/YY, for example 08/28.");
        return;
      }
      if (!/^\d{3}$/.test(cvv)) {
        setError("CVV must be 3 digits.");
        return;
      }
    }

    setError("");

    // make the order object
    const order = {
      id: Date.now(),
      items: cart,
      total: total,
      type: orderType,
      address: address,
      payment: paymentMethod,
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
        <p>Payment: {placedOrder.payment}</p>
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

      {/* payment method */}
      <h3>Payment method</h3>
      <label>
        <input
          type="radio"
          value="card"
          checked={paymentMethod === "card"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Credit/Debit Card
      </label>
      <label>
        <input
          type="radio"
          value="cash"
          checked={paymentMethod === "cash"}
          onChange={(e) => setPaymentMethod(e.target.value)}
        />
        Pay at {orderType === "delivery" ? "delivery" : "pickup"}
      </label>

      {/* card boxes only show for card payment */}
      {paymentMethod === "card" && (
        <div>
          <p>This is a demo. Do not enter a real card number.</p>
          <input
            type="text"
            placeholder="Name on card"
            value={cardName}
            onChange={(e) => setCardName(e.target.value)}
          />
          <input
            type="text"
            placeholder="Card number (16 digits)"
            value={cardNumber}
            onChange={(e) => setCardNumber(e.target.value)}
          />
          <input
            type="text"
            placeholder="MM/YY"
            value={expiry}
            onChange={(e) => setExpiry(e.target.value)}
          />
          <input
            type="password"
            placeholder="CVV"
            value={cvv}
            onChange={(e) => setCvv(e.target.value)}
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
