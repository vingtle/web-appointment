const db = require("../database/client");

class BookslotRepository {
  static async create(booking) {
    const { user_id, date, time_slot, duration, guest_name, guest_phone } =
      booking;
    const [result] = await db.query(
      "INSERT INTO Bookings (user_id, booking_date, time_slot, guest_name, guest_phone, duration) VALUES (?, ?, ?, ?, ?, ?)",
      [user_id, date, time_slot, guest_name, guest_phone, duration]
    );
    return result.insertId;
  }

  static async delete(bookingId) {
    const [result] = await db.query("DELETE FROM Bookings WHERE id = ?", [
      bookingId,
    ]);
    return result.affectedRows;
  }
}

module.exports = BookslotRepository;
