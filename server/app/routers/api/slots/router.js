router.get("/api/slots", async (req, res) => {
  const { date } = req.query;

  if (!date) {
    return res.status(400).json({ error: "Date is required" });
  }

  try {
    const calendar = google.calendar({ version: "v3", auth: oauth2Client });

    const events = await calendar.events.list({
      calendarId,
      timeMin: new Date(`${date}T00:00:00Z`).toISOString(),
      timeMax: new Date(`${date}T23:59:59Z`).toISOString(),
      singleEvents: true,
      orderBy: "startTime",
    });

    const slots = events.data.items.map((event) => ({
      title: event.summary || "Available Slot",
      start: event.start.dateTime,
      end: event.end.dateTime,
    }));

    res.json(slots);
  } catch (error) {
    console.error("Error fetching slots:", error);
    res.status(500).json({ error: "Failed to fetch slots" });
  }
});
