const express = require("express");
const calendarAction = require("../../controllers/calendarAction");

const router = express.Router();

// Endpoints
router.get("/slots", calendarAction.getAvailableSlots); // Fetch available slots for a date
router.post("/slots", calendarAction.addEvent); // Add a new calendar slot
router.delete("/slots/:id", calendarAction.deleteEvent); // Delete a slot by ID
router.get("/events", calendarAction.getEvents); // Fetch all calendar events

module.exports = router;
