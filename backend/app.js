// backend/app.js

const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
require('dotenv').config();
const headerValidation = require('./middleware/headerValidation');  // For header validation

const app = express();
const PORT = process.env.PORT || 5020;

// Middleware
app.use(cors());  // Allow all origins; for production, restrict origins.
app.use(express.json());  // Parse JSON requests
app.use(headerValidation); // Custom middleware for header validation

// Routes
const eventRoutes = require('./routes/events');  // Import event routes
app.use('/api/events', eventRoutes);  // All routes under '/api/events'

// Test route
app.get('/', (req, res) => {
  res.send('UniPlay API is running');
});

// DB connection
mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true
})
.then(() => {
  console.log('MongoDB connected');
  app.listen(PORT, () => {
    console.log(`Server running on port http://localhost:${PORT}`);
  });
})
.catch(err => console.log(err));

