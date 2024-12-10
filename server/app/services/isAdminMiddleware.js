const jwt = require("jsonwebtoken");

const isAdmin = (req, res, next) => {
  const token = req.headers.authorization?.split(" ")[1];

  if (!token) {
    return res.status(401).send("Access denied. No token provided.");
  }

  try {
    const decoded = jwt.verify(token, process.env.APP_SECRET);
    if (!decoded.roles.includes("admin")) {
      return res.status(403).send("Access denied. Admins only.");
    }

    req.user = decoded;
    next();
  } catch (error) {
    res.status(400).send("Invalid token.");
  }
};

module.exports = isAdmin;
