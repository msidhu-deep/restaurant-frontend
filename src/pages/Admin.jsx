// Admin page - fake login, then manage orders and reservations
import { useState } from "react";
import { useOrders } from "../context/OrdersContext";

function Admin() {
  const { orders, reservations, updateOrderStatus, updateReservationStatus } =
    useOrders();

  // login state
  const [password, setPassword] = useState("");
  const [loggedIn, setLoggedIn] = useState(false);
  const [error, setError] = useState("");

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
