const express = require("express");
const googleAction = require("../../controllers/googleAction");

const router = express.Router();

// Endpoints
router.get("/sync", googleAction.syncGoogleCalendar); // Sync database with Google Calendar

module.exports = router;
