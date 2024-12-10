const BookslotRepository = require("../models/BookslotRepository");
const google = require("../services/google");

/**
 * Book a slot and sync with Google Calendar.
 */
const bookSlot = async (req, res) => {
  const {
    user_id,
    date,
    time_slot,
    duration,
    guest_name,
    guest_phone,
    summary,
  } = req.body;

  if (!user_id || !date || !time_slot || !duration) {
    return res.status(400).json({ error: "Missing required fields." });
  }

  try {
    // Book the slot in the database
    const bookingId = await BookslotRepository.create({
      user_id,
      date,
      time_slot,
      duration,
      guest_name,
      guest_phone,
    });

    // Sync the booking with Google Calendar
    await google.createEvent({
      summary: summary || "Client Booking",
      start: { dateTime: `${date}T${time_slot}:00Z` },
      end: {
        dateTime: `${date}T${parseInt(time_slot.split(":")[0]) + duration}:00Z`,
      }, // Duration in hours
    });

    res.status(201).json({ id: bookingId });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).json({ error: "Failed to book slot." });
  }
};

/**
 * Delete a booked slot.
 */
const deleteBooking = async (req, res) => {
  const { bookingId } = req.params;

  if (!bookingId) {
    return res.status(400).json({ error: "Booking ID is required." });
  }

  try {
    const deletedRows = await BookslotRepository.delete(bookingId);

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    // Optional: Remove the booking from Google Calendar
    await google.deleteEvent(bookingId);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking." });
  }
};

module.exports = {
  bookSlot,
  deleteBooking,
};
