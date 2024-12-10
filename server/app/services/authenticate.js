const jwt = require("jsonwebtoken");

// Middleware to authenticate requests
const authenticate = (req, res, next) => {
  // Extract token from Authorization header
  const token = req.headers.authorization?.split(" ")[1];
  if (!token) {
    return res.status(401).json({ error: "Unauthorized." });
  }

  try {
    // Verify the token using the secret
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    req.user = decoded; // Attach decoded user info to request object
    next(); // Pass control to the next middleware
  } catch (error) {
    res.status(403).json({ error: "Invalid token." });
  }
};
console.log("APP_SECRET:", process.env.APP_SECRET);

module.exports = authenticate;
