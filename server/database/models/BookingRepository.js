const db = require("../database/client");

class BookingRepository {
  static async create(booking) {
    const {
      user_id,
      booking_date,
      time_slot,
      guest_name,
      guest_phone,
      payment_status,
      payment_amount,
    } = booking;
    const [result] = await db.query(
      "INSERT INTO Bookings (user_id, booking_date, time_slot, guest_name, guest_phone, payment_status, payment_amount) VALUES (?, ?, ?, ?, ?, ?, ?)",
      [
        user_id,
        booking_date,
        time_slot,
        guest_name,
        guest_phone,
        payment_status,
        payment_amount,
      ]
    );
    return result.insertId;
  }

  static async fetchByUser(userId) {
    return db.query("SELECT * FROM Bookings WHERE user_id = ?", [userId]);
  }

  static async delete(bookingId) {
    const [result] = await db.query("DELETE FROM Bookings WHERE id = ?", [
      bookingId,
    ]);
    return result.affectedRows;
  }
}

module.exports = BookingRepository;
