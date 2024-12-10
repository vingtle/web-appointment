const SlotRepository = require("../models/SlotRepository");
const google = require("../services/google");

/**
 * Fetch available slots for a specific date.
 */
const getAvailableSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date is required." });
  }

  try {
    const slots = await SlotRepository.fetchAvailableSlots(date);
    res.json(slots);
  } catch (error) {
    console.error("Error fetching available slots:", error);
    res.status(500).json({ error: "Failed to fetch available slots." });
  }
};

/**
 * Add a new slot to the database and optionally sync with Google Calendar.
 */
const addSlot = async (req, res) => {
  const { date, time_slot, is_available } = req.body;

  if (!date || !time_slot) {
    return res.status(400).json({ error: "Date and time_slot are required." });
  }

  try {
    // Add slot to the database
    const slotId = await SlotRepository.create({
      date,
      time_slot,
      is_available,
    });

    // Sync with Google Calendar if needed
    await google.createEvent({
      summary: "Available Slot",
      start: { dateTime: `${date}T${time_slot}:00Z` },
      end: {
        dateTime: `${date}T${parseInt(time_slot.split(":")[0]) + 1}:00:00Z`,
      }, // Assuming 1-hour slots
    });

    res.status(201).json({ id: slotId });
  } catch (error) {
    console.error("Error adding slot:", error);
    res.status(500).json({ error: "Failed to add slot." });
  }
};

/**
 * Delete a slot by ID and optionally remove from Google Calendar.
 */
const deleteSlot = async (req, res) => {
  const { slotId } = req.params;

  if (!slotId) {
    return res.status(400).json({ error: "Slot ID is required." });
  }

  try {
    const deletedRows = await SlotRepository.delete(slotId);

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Slot not found." });
    }

    // Optional: Remove the slot from Google Calendar
    await google.deleteEvent(slotId);

    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting slot:", error);
    res.status(500).json({ error: "Failed to delete slot." });
  }
};

module.exports = {
  getAvailableSlots,
  addSlot,
  deleteSlot,
};
