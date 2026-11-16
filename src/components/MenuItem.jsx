// MenuItem card - shows one menu item
function MenuItem({ item }) {
  return (
    <div className="menu-card">
      <h3>{item.name}</h3>
      <p>{item.description}</p>
      <p>Ingredients: {item.ingredients.join(", ")}</p>

      {/* only show dietary tags if the item has any */}
      {item.dietary.length > 0 && <p>Dietary: {item.dietary.join(", ")}</p>}

      <p>${item.price.toFixed(2)}</p>
      <button>Add to Cart</button>
    </div>
  );
}

export default MenuItem;
