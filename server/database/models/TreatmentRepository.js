const db = require("../client");

class TreatmentRepository {
  static async readAll() {
    const [rows] = await db.query("SELECT * FROM Treatments");
    return rows;
  }

  static async findByCategory(category) {
    const [rows] = await db.query(
      "SELECT * FROM Treatments WHERE category = ?",
      [category]
    );
    return rows;
  }

  static async create(treatment) {
    const { name, category, duration_minutes, price, description } = treatment;
    const [result] = await db.query(
      "INSERT INTO Treatments (name, category, duration_minutes, price, description) VALUES (?, ?, ?, ?, ?)",
      [name, category, duration_minutes, price, description]
    );
    return result.insertId;
  }

  static async update(treatmentId, updates) {
    const { name, category, duration_minutes, price, description } = updates;
    const [result] = await db.query(
      "UPDATE Treatments SET name = ?, category = ?, duration_minutes = ?, price = ?, description = ?, updated_at = CURRENT_TIMESTAMP WHERE id = ?",
      [name, category, duration_minutes, price, description, treatmentId]
    );
    return result.affectedRows;
  }

  static async delete(treatmentId) {
    const [result] = await db.query("DELETE FROM Treatments WHERE id = ?", [
      treatmentId,
    ]);
    return result.affectedRows;
  }
}

module.exports = TreatmentRepository;
