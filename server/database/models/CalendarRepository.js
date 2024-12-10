const db = require("../database/client");

class CalendarRepository {
  static async readAll() {
    return db.query("SELECT * FROM CalendarSlots");
  }

  static async fetchAvailableSlots(date) {
    return db.query(
      "SELECT * FROM CalendarSlots WHERE date = ? AND is_available = 1",
      [date]
    );
  }

  static async create(slot) {
    const { date, time_slot, is_available } = slot;
    const [result] = await db.query(
      "INSERT INTO CalendarSlots (date, time_slot, is_available) VALUES (?, ?, ?)",
      [date, time_slot, is_available]
    );
    return result.insertId;
  }

  static async delete(slotId) {
    const [result] = await db.query("DELETE FROM CalendarSlots WHERE id = ?", [
      slotId,
    ]);
    return result.affectedRows;
  }
}

module.exports = CalendarRepository;
