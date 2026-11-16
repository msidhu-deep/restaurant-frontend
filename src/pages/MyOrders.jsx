// MyOrders page - customer sees their orders and live status
import { useOrders } from "../context/OrdersContext";

function MyOrders() {
  // same shared list the admin changes
  const { orders } = useOrders();

  // empty state
  if (orders.length === 0) {
    return (
      <div>
        <h1>My Orders</h1>
        <p>You have no orders yet. Go to the Menu to order something!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Orders</h1>

      {/* one box per order */}
      {orders.map((order) => (
        <div key={order.id} className="order-box">
          <p>Order #{order.id}</p>
          <p>Type: {order.type}</p>
          {order.type === "delivery" && <p>Address: {order.address}</p>}

          <ul>
            {order.items.map((item) => (
              <li key={item.id}>
                {item.name} x {item.quantity}
              </li>
            ))}
          </ul>

          <p>Total: ${order.total.toFixed(2)}</p>

          {/* status changes when the admin updates it */}
          <p>
            <strong>Status: {order.status}</strong>
          </p>

          {/* friendly message when it's ready */}
          {order.status === "Ready" && <p>Your order is ready! 🎉</p>}
        </div>
      ))}
    </div>
  );
}

export default MyOrders;
