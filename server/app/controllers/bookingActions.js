const BookingRepository = require("../models/BookingRepository");

/**
 * Create a new booking.
 */
const createBooking = async (req, res) => {
  try {
    const {
      user_id,
      booking_date,
      time_slot,
      guest_name,
      guest_phone,
      payment_status,
      payment_amount,
    } = req.body;

    if (!user_id || !booking_date || !time_slot || !payment_status) {
      return res.status(400).json({ error: "Missing required fields." });
    }

    const bookingId = await BookingRepository.create({
      user_id,
      booking_date,
      time_slot,
      guest_name,
      guest_phone,
      payment_status,
      payment_amount,
    });

    res.status(201).json({ id: bookingId });
  } catch (error) {
    console.error("Error creating booking:", error);
    res.status(500).json({ error: "Failed to create booking." });
  }
};

/**
 * Fetch bookings for a specific user.
 */
const getUserBookings = async (req, res) => {
  try {
    const { userId } = req.params;

    if (!userId) {
      return res.status(400).json({ error: "User ID is required." });
    }

    const bookings = await BookingRepository.fetchByUser(userId);
    res.json(bookings);
  } catch (error) {
    console.error("Error fetching user bookings:", error);
    res.status(500).json({ error: "Failed to fetch bookings." });
  }
};

/**
 * Delete a booking by ID.
 */
const deleteBooking = async (req, res) => {
  try {
    const { id } = req.params;

    if (!id) {
      return res.status(400).json({ error: "Booking ID is required." });
    }

    const deletedRows = await BookingRepository.delete(id);

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Booking not found." });
    }

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting booking:", error);
    res.status(500).json({ error: "Failed to delete booking." });
  }
};

module.exports = { createBooking, getUserBookings, deleteBooking };
