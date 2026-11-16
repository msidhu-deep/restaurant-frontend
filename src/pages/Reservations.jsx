// Reservations page - book a table or event
import { useState } from "react";

function Reservations() {
  // one state for each form field
  const [name, setName] = useState("");
  const [date, setDate] = useState("");
  const [time, setTime] = useState("");
  const [guests, setGuests] = useState(2);
  const [type, setType] = useState("regular");
  const [notes, setNotes] = useState("");
  const [error, setError] = useState("");

  // holds the reservation after it's booked (null = not booked yet)
  const [booking, setBooking] = useState(null);

  function handleSubmit(e) {
    // stop the page from reloading
    e.preventDefault();

    // check required fields
    if (name.trim() === "" || date === "" || time === "") {
      setError("Please fill in your name, date, and time.");
      return;
    }

    // date can't be in the past
    const today = new Date().toISOString().split("T")[0];
    if (date < today) {
      setError("Please pick a date that is today or later.");
      return;
    }

    // guests must be at least 1
    if (Number(guests) < 1) {
      setError("Number of guests must be at least 1.");
      return;
    }

    setError("");

    // make the reservation object
    const reservation = {
      id: Date.now(),
      name,
      date,
      time,
      guests: Number(guests),
      type,
      notes,
      status: "Pending",
    };

    setBooking(reservation);
  }

  // booked - show confirmation
  if (booking) {
    return (
      <div>
        <h1>Reservation Confirmed!</h1>
        <p>Name: {booking.name}</p>
        <p>Date: {booking.date}</p>
        <p>Time: {booking.time}</p>
        <p>Guests: {booking.guests}</p>
        <p>Type: {booking.type}</p>
        {booking.notes && <p>Notes: {booking.notes}</p>}
        <p>Status: {booking.status}</p>
        <button onClick={() => setBooking(null)}>
          Make Another Reservation
        </button>
      </div>
    );
  }

  return (
    <div>
      <h1>Reservations</h1>

      <form onSubmit={handleSubmit}>
        <div>
          <label>Name: </label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div>
          <label>Date: </label>
          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
          />
        </div>

        <div>
          <label>Time: </label>
          <input
            type="time"
            value={time}
            onChange={(e) => setTime(e.target.value)}
          />
        </div>

        <div>
          <label>Guests: </label>
          <input
            type="number"
            min="1"
            value={guests}
            onChange={(e) => setGuests(e.target.value)}
          />
        </div>

        <div>
          <label>Type: </label>
          <select value={type} onChange={(e) => setType(e.target.value)}>
            <option value="regular">Regular Table</option>
            <option value="birthday">Birthday Party</option>
            <option value="corporate">Corporate Gathering</option>
          </select>
        </div>

        {/* notes box only shows for special events */}
        {type !== "regular" && (
          <div>
            <label>Special requirements: </label>
            <input
              type="text"
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
            />
          </div>
        )}

        {/* error message if something is wrong */}
        {error && <p>{error}</p>}

        <button type="submit">Book Now</button>
      </form>
    </div>
  );
}

export default Reservations;
