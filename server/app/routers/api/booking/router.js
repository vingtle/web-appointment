const { google } = require("googleapis");
const express = require("express");
const router = express.Router();
const { bookslot } = require("../../../controllers/");
const credentials = require("./credentials.json");
const calendarId = "primary";

const oauth2Client = new google.auth.OAuth2(
  credentials.client_id,
  credentials.client_secret,
  credentials.redirect_uris[0]
);

router.get("/google", (req, res) => {
  const authUrl = oauth2Client.generateAuthUrl({
    access_type: "offline",
    scope: ["https://www.googleapis.com/auth/calendar.readonly"],
  });
  res.redirect(authUrl);
});

router.get("/google/callback", async (req, res) => {
  const { code } = req.query;
  const { tokens } = await oauth2Client.getToken(code);
  oauth2Client.setCredentials(tokens);
  console.log("Token acquired:", tokens);
  res.send("Google Calendar API connected successfully!");
});

router.get("/api/slots", async (req, res) => {
  try {
    const predefinedSlots = [
      {
        title: "Slot 1",
        start: "2024-11-27T09:00:00",
        end: "2024-11-27T10:00:00",
        allDay: false,
      },
      {
        title: "Slot 2",
        start: "2024-11-27T14:00:00",
        end: "2024-11-27T15:00:00",
        allDay: false,
      },
    ];

    const slots = predefinedSlots; // Fallback for now
    res.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});

router.post("/api/book-slot", async (req, res) => {
  const { start, end, summary } = req.body;
  console.log("Booking slot with data:", req.body);
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

    res.send("Slot booked successfully!");
  } catch (error) {
    console.error("Error booking slot:", error);
    res.status(500).send("Failed to book slot.");
  }
});

module.exports = router;
