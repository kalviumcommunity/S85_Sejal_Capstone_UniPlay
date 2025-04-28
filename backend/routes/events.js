// backend/routes/events.js

const express = require('express');
const router = express.Router();
const Event = require('../models/Event');

// GET /api/events
router.get('/', async (req, res) => {
  try {
    const events = await Event.find();
    const sanitizedEvents = events.map(event => {
      // Sanitizing any spaces in name or date formatting
      if (event.name) {
        event.name = event.name.replace(/\s+/g, ' ').trim();
      }
      
      if (event.date && event.date instanceof Date) {
        event.date = event.date.toISOString();
      }

      return event;
    });

    res.status(200).json(sanitizedEvents);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
});

module.exports = router;

