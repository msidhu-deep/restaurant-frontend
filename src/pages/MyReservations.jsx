// MyReservations page - customer sees bookings and can cancel
import { useOrders } from "../context/OrdersContext";

function MyReservations() {
  // same shared list the admin changes
  const { reservations, updateReservationStatus } = useOrders();

  // empty state
  if (reservations.length === 0) {
    return (
      <div>
        <h1>My Reservations</h1>
        <p>You have no reservations yet. Go to Reservations to book a table!</p>
      </div>
    );
  }

  return (
    <div>
      <h1>My Reservations</h1>

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

          {/* status changes when the admin approves or cancels */}
          <p>
            <strong>Status: {res.status}</strong>
          </p>

          {res.status === "Approved" && <p>Your table is confirmed! 🎉</p>}

          {/* customer can cancel unless it's already cancelled */}
          {res.status !== "Cancelled" && (
            <button
              onClick={() => updateReservationStatus(res.id, "Cancelled")}
            >
              Cancel Reservation
            </button>
          )}
        </div>
      ))}
    </div>
  );
}

export default MyReservations;
