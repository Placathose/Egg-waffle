const express = require('express');
const router = express.Router();
const { google } = require('googleapis');

router.post('/create-event', async (req, res) => {
  const {token, event} = req.body;

  const oauth2Client = new google.auth.OAuth2();
  oauth2Client.setCredentials({ access_token: token });

  const calendar = google.calendar({version: 'v3', auth: oauth2Client });

  try {
    const response = await calendar.events.insert({
      calendarId: 'primary',
      resource: {
        summary: event.summary,
        description: event.description,
        start: { dateTime: event.start },
        end: { dateTime: event.end },
      },
    });

    res.status(200).json({ message: 'Event created', eventId: response.data.id });
  } catch (error) {
    console.error('Error creating event:', error);
    res.status(500).json({ error: 'Failed to create event' });
  }
});

module.exports = router;