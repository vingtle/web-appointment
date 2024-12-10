class UserRepository {
  static async create(user) {
    const { email, password_hash, phone_number, name, role } = user;
    const [result] = await db.query(
      "INSERT INTO Users (email, password_hash, phone_number, name, role) VALUES (?, ?, ?, ?, ?)",
      [email, password_hash, phone_number, name, role]
    );
    return result.insertId;
  }

  static async readByEmail(email) {
    const [rows] = await db.query("SELECT * FROM Users WHERE email = ?", [
      email,
    ]);
    return rows[0];
  }
}

module.exports = UserRepository;
