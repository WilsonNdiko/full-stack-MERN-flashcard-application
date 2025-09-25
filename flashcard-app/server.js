// server.js (Updated)

const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

// Middleware
app.use(cors());
app.use(express.json()); // Parse JSON bodies

// -------------------------------------------------------------------
// Routes
app.use('/api/auth', require('./routes/auth'));   // Auth routes
app.use('/api/decks', require('./routes/decks')); // Decks routes
app.use('/api/cards', require('./routes/cards')); // Cards routes

// -------------------------------------------------------------------

// Connect to MongoDB
const connectDB = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('✅ MongoDB connected successfully!');
  } catch (err) {
    console.error('❌ MongoDB connection error:', err.message);
    process.exit(1);
  }
};

// Root route
app.get('/', (req, res) => {
  res.send('Flashcard App API is running...');
});

// Start server after DB connects
connectDB().then(() => {
  app.listen(PORT, () =>
    console.log(`🚀 Server running on port ${PORT}`)
  );
});
