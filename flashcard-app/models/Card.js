// models/Card.js

const mongoose = require('mongoose');

const CardSchema = new mongoose.Schema({
  // The card must belong to a specific deck
  deck: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Deck', // References the 'Deck' model
    required: true,
  },
  front: {
    type: String,
    required: true,
    trim: true,
  },
  back: {
    type: String,
    required: true,
    trim: true,
  },
  // We can add a simple timestamp for when the card was created
  date: {
    type: Date,
    default: Date.now,
  },
});

module.exports = mongoose.model('Card', CardSchema);