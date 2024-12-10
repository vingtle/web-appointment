const CalendarRepository = require("../../database/models/CalendarRepository");
const google = require("../services/google");
/**
 * Fetch all events from the database
 */
const getEvents = async (req, res) => {
  try {
    // Fetch all events from the CalendarRepository
    const events = await CalendarRepository.readAll();
    res.json(events); // Respond with the events as JSON
  } catch (error) {
    console.error("Error fetching available slots:", { date, error });
    res.status(500).json({ error: "Failed to fetch events" });
  }
};

// Fetch Available Slots for a Date
const getAvailableSlots = async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }

  try {
    const availableSlots = await CalendarRepository.fetchAvailableSlots(date);
    res.json(availableSlots);
  } catch (error) {
    console.error("Error fetching available slots:", { date, error });
    res.status(500).json({ error: "Failed to fetch available slots" });
  }
};

/**
 * Add a new event to the database
 */
const addEvent = async (req, res) => {
  const { summary, date, time_slot } = req.body;

  // Validate the incoming data
  if (!date || !time_slot) {
    return res.status(400).json({ error: "Date and time_slot are required" });
  }

  try {
    // Create the new event
    const createdEventId = await CalendarRepository.create({
      date,
      time_slot,
      summary,
      is_available: true, // Default availability
    });

    // Sync with Google Calendar
    await google.createEvent({
      summary,
      start: { dateTime: `${date}T${time_slot.start}:00Z` },
      end: { dateTime: `${date}T${time_slot.end}:00Z` },
    });

    // Respond with the newly created event's ID
    res.status(201).json({ id: createdEventId });
  } catch (error) {
    console.error("Error creating event:", error);
    res.status(500).json({ error: "Failed to create event" });
  }
};

/**
 * Delete an event by ID
 */
const deleteEvent = async (req, res) => {
  const { eventId } = req.params;

  // Validate the incoming event ID
  if (!eventId) {
    return res.status(400).json({ error: "Event ID is required" });
  }

  try {
    // Delete the event from the database
    const deletedRows = await CalendarRepository.delete(eventId);

    if (deletedRows === 0) {
      return res.status(404).json({ error: "Event not found" });
    }

    await google.deleteEvent(eventId);

    // Respond with a success status
    res.sendStatus(204);
  } catch (error) {
    console.error("Error deleting event:", error);
    res.status(500).json({ error: "Failed to delete event" });
  }
};

module.exports = {
  getEvents,
  getAvailableSlots,
  addEvent,
  deleteEvent,
};
