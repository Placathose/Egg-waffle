require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const path = require('path');
const bodyParser = require('body-parser');
const cors = require('cors');

// Import routes
// const indexRouter = require('./routes/index');

// Initialize app
const app = express();

// Database connection
require('./config/db')();

// View engine setup (Pug)
// app.set('views', path.join(__dirname, 'views'));
// app.set('view engine', 'pug');

// Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(express.static(path.join(__dirname, 'public')));
app.use(bodyParser.urlencoded({ extended: true }));
app.use(bodyParser.json());
app.use(cors({
  origin: 'http://localhost:5173', // Vite default port
  credentials: true
}));

// Routes
// app.use('/', indexRouter);
app.use('/summaries', require('./routes/summaries'));
app.use('/auth', require('./routes/auth'));
app.use('/calendar', require('./routes/calendar'));
app.use('/api/reward', require('./routes/reward'));
app.use('/api/quiz', require('./routes/quiz'));


// Error handling
app.use((err, req, res, next) => {
  res.status(err.status || 500);
  res.json({ error: err.message });
});

// Start server
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server running on  http://localhost:${PORT}`);
});

module.exports = app;