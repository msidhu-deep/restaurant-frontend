// MenuItem card - shows one menu item
import { useCart } from "../context/CartContext";

function MenuItem({ item }) {
  // grab addToCart from the cart context
  const { addToCart } = useCart();

  return (
    <div className="menu-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Ingredients: {item.ingredients.join(", ")}</p>

      {/* only show dietary tags if the item has any */}
      {item.dietary.length > 0 && <p>Dietary: {item.dietary.join(", ")}</p>}

      <p>${item.price.toFixed(2)}</p>

      {/* clicking calls addToCart with this item */}
      <button onClick={() => addToCart(item)}>Add to Cart</button>
    </div>
  );
}

export default MenuItem;
