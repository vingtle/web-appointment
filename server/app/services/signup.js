const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

const signup = async (req, res, next) => {
  try {
    const { email, password, phone_number, name, role } = req.body;

    // Validate required fields
    if (!email || !password || !name) {
      return res.status(400).send("Missing required fields.");
    }

    // Check if the user already exists
    const existingUser = await tables.user.readByEmail(email);
    if (existingUser) {
      return res.status(409).send("Email is already in use.");
    }

    // Hash the password
    const hashedPassword = await argon2.hash(password);

    // Create the new user
    const userId = await tables.user.create({
      email,
      password_hash: hashedPassword,
      phone_number,
      name,
      role: role || "user", // Default to "user" role if not provided
    });

    // Generate JWT token
    const accessToken = jwt.sign(
      { id: userId, role: role || "user" },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    // Respond with the user data and token
    res.status(201).json({
      id: userId,
      email,
      name,
      role: role || "user",
      token: accessToken,
    });
  } catch (error) {
    next(error);
  }
};

module.exports = {
  signup,
};
