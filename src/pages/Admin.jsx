// Admin page - fake login, then manage orders, reservations, and menu
import { useState } from "react";
import { useOrders } from "../context/OrdersContext";
import { useMenu } from "../context/MenuContext";

function Admin() {
  const { orders, reservations, updateOrderStatus, updateReservationStatus } =
    useOrders();
  const { menuItems, addMenuItem, updateMenuItem, deleteMenuItem } = useMenu();

  // login state
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

  // menu form state
  const [name, setName] = useState("");
  const [category, setCategory] = useState("Starters");
  const [description, setDescription] = useState("");
  const [ingredients, setIngredients] = useState("");
  const [price, setPrice] = useState("");
  const [dietary, setDietary] = useState("");
  const [editingId, setEditingId] = useState(null); // null = adding, number = editing
  const [formError, setFormError] = useState("");

  function handleLogin(e) {
    e.preventDefault();

    // fake password - just for the frontend assignment
    if (password === "admin123") {
      setLoggedIn(true);
      setError("");
    } else {
      setError("Wrong password.");
    }
  }

  // clear the form and go back to "add" mode
  function resetForm() {
    setName("");
    setCategory("Starters");
    setDescription("");
    setIngredients("");
    setPrice("");
    setDietary("");
    setEditingId(null);
    setFormError("");
  }

  // turn "a, b, c" into ["a", "b", "c"]
  function splitList(text) {
    return text
      .split(",")
      .map((s) => s.trim())
      .filter((s) => s !== "");
  }

  function handleMenuSubmit(e) {
    e.preventDefault();

    // validation
    if (name.trim() === "" || description.trim() === "") {
      setFormError("Please fill in the name and description.");
      return;
    }
    if (price === "" || Number(price) <= 0) {
      setFormError("Price must be more than 0.");
      return;
    }

    const item = {
      name: name.trim(),
      category,
      description: description.trim(),
      ingredients: splitList(ingredients),
      price: Number(price),
      dietary: splitList(dietary),
    };

    if (editingId === null) {
      addMenuItem(item);
    } else {
      updateMenuItem(editingId, item);
    }

    resetForm();
  }

  // fill the form with an item so it can be edited
  function handleEdit(item) {
    setEditingId(item.id);
    setName(item.name);
    setCategory(item.category);
    setDescription(item.description);
    setIngredients(item.ingredients.join(", "));
    setPrice(item.price);
    setDietary(item.dietary.join(", "));
    setFormError("");
  }

  // not logged in - show the login form only
  if (!loggedIn) {
    return (
      <div>
        <h1>Admin Login</h1>
        <form onSubmit={handleLogin}>
          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button type="submit">Login</button>
        </form>
        {error && <p>{error}</p>}
      </div>
    );
  }

  // logged in - show the dashboard
  return (
    <div>
      <h1>Admin Dashboard</h1>
      <button onClick={() => setLoggedIn(false)}>Logout</button>

      <h2>Manage Menu</h2>

      {/* form changes between add and edit mode */}
      <h3>{editingId === null ? "Add New Item" : "Edit Item"}</h3>
      <form onSubmit={handleMenuSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Category: </label>
          <select
            value={category}
            onChange={(e) => setCategory(e.target.value)}
          >
            <option value="Starters">Starters</option>
            <option value="Mains">Mains</option>
            <option value="Desserts">Desserts</option>
            <option value="Beverages">Beverages</option>
          </select>
        </div>

        <div>
          <label>Description: </label>
          <input
            type="text"
            value={description}
            onChange={(e) => setDescription(e.target.value)}
          />
        </div>

        <div>
          <label>Ingredients (separate with commas): </label>
          <input
            type="text"
            value={ingredients}
            onChange={(e) => setIngredients(e.target.value)}
          />
        </div>

        <div>
          <label>Price: </label>
          <input
            type="number"
            step="0.01"
            value={price}
            onChange={(e) => setPrice(e.target.value)}
          />
        </div>

        <div>
          <label>Dietary (vegetarian, vegan, gluten-free): </label>
          <input
            type="text"
            value={dietary}
            onChange={(e) => setDietary(e.target.value)}
          />
        </div>

        {formError && <p>{formError}</p>}

        <button type="submit">
          {editingId === null ? "Add Item" : "Save Changes"}
        </button>

        {/* cancel button only shows while editing */}
        {editingId !== null && (
          <button type="button" onClick={resetForm}>
            Cancel Edit
          </button>
        )}
      </form>

      {/* list of current menu items with edit and delete */}
      <h3>Current Menu Items</h3>
      {menuItems.length === 0 && <p>No menu items.</p>}
      {menuItems.map((item) => (
        <div key={item.id} className="menu-row">
          <p>
            {item.name} ({item.category}) - ${item.price.toFixed(2)}
          </p>
          <button onClick={() => handleEdit(item)}>Edit</button>
          <button onClick={() => deleteMenuItem(item.id)}>Delete</button>
        </div>
      ))}

      <h2>Orders</h2>
      {orders.length === 0 && <p>No orders yet.</p>}

      {/* one box per order */}
      {orders.map((order) => (
        <div key={order.id} className="order-box">
          <p>Order #{order.id}</p>
          <p>Type: {order.type}</p>
          {order.type === "delivery" && <p>Address: {order.address}</p>}

          {/* list the items in the order */}
          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>

          <p>Total: ${order.total.toFixed(2)}</p>

          {/* dropdown to change the status */}
          <label>Status: </label>
          <select
            value={order.status}
            onChange={(e) => updateOrderStatus(order.id, e.target.value)}
          >
            <option value="Preparing">Preparing</option>
            <option value="Ready">Ready</option>
            <option value="Delivered">Delivered</option>
          </select>
        </div>
      ))}

      <h2>Reservations</h2>
      {reservations.length === 0 && <p>No reservations yet.</p>}

      {/* one box per reservation */}
      {reservations.map((res) => (
        <div key={res.id} className="reservation-box">
          <p>Name: {res.name}</p>
          <p>
            Date: {res.date} at {res.time}
          </p>
          <p>Guests: {res.guests}</p>
          <p>Type: {res.type}</p>
          {res.notes && <p>Notes: {res.notes}</p>}
          <p>Status: {res.status}</p>

          <button onClick={() => updateReservationStatus(res.id, "Approved")}>
            Approve
          </button>
          <button onClick={() => updateReservationStatus(res.id, "Cancelled")}>
            Cancel
          </button>
        </div>
      ))}
    </div>
  );
}

export default Admin;
