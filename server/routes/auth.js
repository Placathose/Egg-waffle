// const express = require('express');
// const router = express.Router();
// const oauth2Client = require('../utils/googleClient');
// const { google } = require('googleapis');

// const SCOPES = [
//   'https://www.googleapis.com/auth/calendar.events',
//   'https://www.googleapis.com/auth/userinfo.email',
//   'https://www.googleapis.com/auth/userinfo.profile',
// ];

// router.get('/google', (req, res) => {
//   const url = oauth2Client.generateAuthUrl({
//     access_type: 'offline',
//     scope: SCOPES,
//     prompt: 'consent'
//   });
//   // redirect to google sign-in
//   res.redirect(url);
// });

// router.get('google/callback', async (req, res) => {
//   const code = req.query.code;

//   try {
//     const { tokens } = await oauth2Client.getToken(code);
//     oauth2Client.setCredentials(tokens);

//     // get user info
//     const oauth2 = google.oauth2({ version: 'v2', auth: oauth2Client });
//     const userInfo = await oauth2.userinfo.get();

//     // Send access_token and user info to frontend
//     res.redirect()
//   } catch (error) {
//     console.error('Error during Google callback:', error);
//     res.status(500).send('Authentication failed');
//   }


// });

// module.exports = router;

