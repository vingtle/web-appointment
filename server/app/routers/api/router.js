const express = require("express");
const router = express.Router();

const treatmentsRoutes = require("./treatments/router"); // Adjusted to relative path

const userRoutes = require("./user/router");

const photosRoutes = require("./gallery/router");

// Health check route (should be defined early for quick response)
router.get("/", (req, res) => {
  res.status(200).send("API is working!");
});

// Mount Treatments routes
router.use("/treatments", treatmentsRoutes);

router.use("/user", userRoutes);

router.use("/photo", photosRoutes);

// Catch-all route for undefined paths
router.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Error handling middleware
router.use((err, req, res, next) => {
  console.error("Internal server error:", err.message);
  res.status(500).json({ error: "Internal server error" });
});

module.exports = router;
