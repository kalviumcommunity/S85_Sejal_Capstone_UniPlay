const express = require('express');
const router = express.Router();

// Mock sports events (in-memory)
const mockEvents = [
  {
    id: '1',
    name: "Football Match",
    date: "2025-05-05",
    location: "Main Ground",
    sport: "Football",
    organizerId: "user123"
  },
  {
    id: '2',
    name: "Cricket Tournament",
    date: "2025-05-10",
    location: "Field A",
    sport: "Cricket",
    organizerId: "user456"
  },
  {
    id: '3',
    name: "Basketball League",
    date: "2025-05-15",
    location: "Indoor Court",
    sport: "Basketball",
    organizerId: "user123"
  }
];

// 1. Get all sports events
router.get('/', (req, res) => {
  res.json(mockEvents);
});

// 2. Get a single event by ID
router.get('/:id', (req, res) => {
  const event = mockEvents.find(e => e.id === req.params.id);
  if (event) {
    res.json(event);
  } else {
    res.status(404).json({ message: 'Event not found' });
  }
});

// 3. Get events by sport type (e.g., Football, Cricket)
router.get('/sport/:sport', (req, res) => {
  const sport = req.params.sport.toLowerCase();
  const filteredEvents = mockEvents.filter(e => e.sport.toLowerCase() === sport);
  res.json(filteredEvents);
});

// 4. POST - Add a new sports event
router.post('/', (req, res) => {
  const { name, date, location, sport, organizerId } = req.body;

  // Validation
  if (!name || !date || !location || !sport || !organizerId) {
    return res.status(400).json({ message: 'All fields are required' });
  }

  const allowedSports = ['football', 'cricket', 'basketball', 'badminton', 'volleyball'];
  if (!allowedSports.includes(sport.toLowerCase())) {
    return res.status(400).json({ message: 'Only sports events are allowed in UniPlay' });
  }

  const newEvent = {
    id: (mockEvents.length + 1).toString(),
    name: name.trim(),
    date,
    location: location.trim(),
    sport: sport.trim(),
    organizerId: organizerId.trim()
  };

  mockEvents.push(newEvent);
  res.status(201).json(newEvent);
});

// 5. POST by organizer ID (alternative way to add an event for a specific organizer)
router.post('/organizer/:organizerId', (req, res) => {
  const { name, date, location, sport } = req.body;
  const organizerId = req.params.organizerId;

  if (!name || !date || !location || !sport) {
    return res.status(400).json({ message: 'All fields except organizerId in body are required' });
  }

  const allowedSports = ['football', 'cricket', 'basketball', 'badminton', 'volleyball'];
  if (!allowedSports.includes(sport.toLowerCase())) {
    return res.status(400).json({ message: 'Only sports events are allowed in UniPlay' });
  }

  const newEvent = {
    id: (mockEvents.length + 1).toString(),
    name: name.trim(),
    date,
    location: location.trim(),
    sport: sport.trim(),
    organizerId: organizerId.trim()
  };

  mockEvents.push(newEvent);
  res.status(201).json(newEvent);
});

module.exports = router;
