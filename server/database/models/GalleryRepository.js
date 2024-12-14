const db = require("../database/connection");

class GalleryRepository {
  static async getAll() {
    const [rows] = await db.query("SELECT * FROM Gallery");
    return rows;
  }

  static async deleteById(id) {
    const [result] = await db.query("DELETE FROM Gallery WHERE id = ?", [id]);
    return result.affectedRows > 0;
  }
}

module.exports = GalleryRepository;
