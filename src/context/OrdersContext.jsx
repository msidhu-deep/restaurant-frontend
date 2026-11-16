// OrdersContext - stores all orders and reservations
import { createContext, useContext, useState } from "react";

const OrdersContext = createContext();

export function OrdersProvider({ children }) {
  // lists of everything customers placed
  const [orders, setOrders] = useState([]);
  const [reservations, setReservations] = useState([]);

  // add a new order to the list
  function addOrder(order) {
    setOrders([...orders, order]);
  }

  // admin changes the status (Preparing, Ready, Delivered)
  function updateOrderStatus(id, status) {
    setOrders(orders.map((o) => (o.id === id ? { ...o, status } : o)));
  }

  // add a new reservation to the list
  function addReservation(reservation) {
    setReservations([...reservations, reservation]);
  }

  // admin approves or cancels (Approved, Cancelled)
  function updateReservationStatus(id, status) {
    setReservations(
      reservations.map((r) => (r.id === id ? { ...r, status } : r)),
    );
  }

  return (
    <OrdersContext.Provider
      value={{
        orders,
        reservations,
        addOrder,
        updateOrderStatus,
        addReservation,
        updateReservationStatus,
      }}
    >
      {children}
    </OrdersContext.Provider>
  );
}

// shortcut so other files can write useOrders()
export function useOrders() {
  return useContext(OrdersContext);
}
