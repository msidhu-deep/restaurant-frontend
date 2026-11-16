// Cart page - shows items in the cart
import { useCart } from "../context/CartContext";

function Cart() {
  const { cart, removeFromCart, updateQuantity, total } = useCart();

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
    </div>
  );
}

export default Cart;
