// models/Deck.js

const mongoose = require('mongoose');

const DeckSchema = new mongoose.Schema({
  // The deck must be owned by a user
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'User', // References the 'User' model
    required: true,
  },
  name: {
    type: String,
    required: true,
    trim: true,
    maxlength: 100
  },
  description: {
    type: String,
    trim: true,
    maxlength: 500,
    default: 'A new flashcard deck.'
  },
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Deck', DeckSchema);