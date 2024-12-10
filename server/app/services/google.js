const { google } = require("googleapis");
const db = require("../database/client");

const { GOOGLE_CLIENT_ID, GOOGLE_CLIENT_SECRET } = process.env;
const credentials = require("../config/credentials.json");
const { client_id, client_secret, redirect_uris } = credentials.web;

const oAuth2Client = new google.auth.OAuth2(
  client_id,
  client_secret,
  redirect_uris[0]
);
const calendar = google.calendar({ version: "v3", auth: oAuth2Client });

async function syncGoogleCalendarWithDatabase() {
  const events = await calendar.events.list({
    calendarId: "primary",
    timeMin: new Date().toISOString(),
    maxResults: 100,
    singleEvents: true,
    orderBy: "startTime",
  });

  for (const event of events.data.items) {
    const { id, start, end, summary } = event;
    const date = new Date(start.dateTime).toISOString().split("T")[0];
    const time_slot = new Date(start.dateTime)
      .toISOString()
      .split("T")[1]
      .split("Z")[0];

    await db.query(
      "INSERT INTO CalendarSlots (id, date, time_slot, is_available) VALUES (?, ?, ?, ?) ON DUPLICATE KEY UPDATE is_available = is_available",
      [id, date, time_slot, 1]
    );
  }
}

module.exports = { syncGoogleCalendarWithDatabase };
