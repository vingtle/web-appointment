const express = require("express");

const router = express.Router();

router.post("/api/book-slot", async (req, res) => {
  const { start, duration, summary, paymentMethod } = req.body;

  if (!start || !duration || !paymentMethod) {
    return res
      .status(400)
      .json({ error: "Start time, duration, and payment method are required" });
  }

  const end = new Date(
    new Date(start).getTime() + duration * 60000
  ).toISOString();

  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const event = {
      summary: summary || "Booked Slot",
      start: { dateTime: start },
      end: { dateTime: end },
    };

    await calendar.events.insert({
      calendarId,
      resource: event,
    });

    // Simulate payment processing
    const paymentStatus = "Paid"; // Replace with actual payment gateway integration

    res.json({ message: "Slot booked successfully!", paymentStatus });
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send("Failed to book slot.");
  }
});
