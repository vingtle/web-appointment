const argon2 = require("argon2");
const jwt = require("jsonwebtoken");
const tables = require("../../database/tables");

// Function to hash passwords
const hashPassword = async (password) => {
  try {
    const hashedPassword = await argon2.hash(password);
    return hashedPassword;
  } catch (error) {
    throw new Error("Password hashing failed.");
  }
};

// Middleware to verify JWT token
const verifyToken = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1]; // Extract token from Bearer token header
  if (!token) {
    return res.status(401).json({ error: "Unauthorized. No token provided." });
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET); // Verify token
    req.user = decoded; // Attach decoded user data to request
    next();
  } catch (error) {
    return res.status(403).json({ error: "Invalid token." });
  }
};

// Login function
const login = async (req, res, next) => {
  try {
    const user = await tables.user.readByEmailWithPassword(req.body.email);

    if (!user) {
      return res.status(422).send("Invalid email or password.");
    }

    const verified = await argon2.verify(user.password_hash, req.body.password);

    if (verified) {
      delete user.password_hash;

      const accessToken = jwt.sign(
        { id: user.id, isAdmin: user.is_admin },
        process.env.APP_SECRET,
        { expiresIn: "1h" }
      );

      const refreshToken = jwt.sign(
        { id: user.id },
        process.env.APP_SECRET,
        { expiresIn: "7d" }
      );

      res
        .status(200)
        .cookie("refreshToken", refreshToken, {
          httpOnly: true,
          sameSite: "lax",
          expires: new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
        })
        .header("Authorization", `Bearer ${accessToken}`)
        .json(user);
    } else {
      return res.status(422).send("Invalid email or password.");
    }
  } catch (err) {
    next(err);
  }
};

// Refresh token function
const refresh = async (req, res, next) => {
  
  try {
    const { refreshToken } = req.cookies;

    if (!refreshToken) {
      return res.status(401).send("Access denied. No refresh token provided.");
    }

    const decoded = jwt.verify(refreshToken, process.env.APP_SECRET);
    const user = await tables.user.read(decoded.id);

    if (!user) {
      return res.status(404).send("User not found.");
    }

    delete user.password;

    const newAccessToken = jwt.sign(
      { id: user.id, isAdmin: user.is_admin },
      process.env.APP_SECRET,
      { expiresIn: "1h" }
    );

    res.header("Authorization", `Bearer ${newAccessToken}`).json(user);
  } catch (error) {
    next(error);
  }
};

// Logout function
const logout = async (req, res) => {
  res.clearCookie("refreshToken").sendStatus(200);
};

// Export all functions
module.exports = {
  login,
  refresh,
  logout,
  hashPassword,
  verifyToken,
};
